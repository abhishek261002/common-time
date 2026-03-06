/**
 * create-order Edge Function
 * Accepts cart items, validates products, creates order and order_items
 */

/// <reference lib="deno.window" />

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin, createUserClient } from "../_shared/supabase.ts";

interface CartItem {
  product_id: string;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface CreateOrderBody {
  items: CartItem[];
  shipping_address?: ShippingAddress;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  is_active: boolean;
}

serve(async (req: Request) => {
  /* ---------- CORS PREFLIGHT ---------- */

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    /* ---------- AUTH ---------- */

    const authHeader = req.headers.get("Authorization") ?? "";

    console.log("[create-order] Auth header check:", {
      exists: !!authHeader,
      length: authHeader.length,
    });

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Malformed Authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extract the token
    const token = authHeader.replace("Bearer ", "").trim();

    // Verify token with admin client (most reliable method)
    console.log("[create-order] Verifying token...");

    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.admin.getUserById(
      // We need to decode the JWT to get user ID, OR
      // Use the userClient to get the current user
      ""
    );

    // Better approach: Use userClient which has the token in headers
    const userClient = createUserClient(req);

    // This will work with the Authorization header we set
    const {
      data: { user: currentUser },
      error: userError,
    } = await userClient.auth.getUser();

    console.log("[create-order] User auth result:", {
      hasUser: !!currentUser,
      error: userError?.message,
    });

    if (userError || !currentUser) {
      console.error("[create-order] Auth failed:", userError);

      return new Response(
        JSON.stringify({
          error: "Invalid or expired token",
          details: userError?.message,
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = currentUser.id;

    console.log("[create-order] User authenticated:", userId);

    /* ---------- BODY ---------- */

    const body: CreateOrderBody = await req.json();

    if (!body.items || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const shipping = body.shipping_address;

    if (
      !shipping?.name ||
      !shipping?.phone ||
      !shipping?.address_line1 ||
      !shipping?.city ||
      !shipping?.state ||
      !shipping?.pincode
    ) {
      return new Response(
        JSON.stringify({ error: "Shipping address is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    /* ---------- PRODUCTS ---------- */

    const productIds = body.items.map((i) => i.product_id);

    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, name, price, stock_quantity, is_active")
      .in("id", productIds);

    if (productsError || !products || products.length === 0) {
      console.error("[create-order] Products error:", productsError);

      return new Response(
        JSON.stringify({ error: "Invalid products" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const productMap = new Map<string, Product>(
      (products as Product[]).map((p: Product) => [p.id, p])
    );

    let totalAmount = 0;

    const orderItems: {
      product_id: string;
      quantity: number;
      price_at_purchase: number;
    }[] = [];

    for (const item of body.items) {
      const product = productMap.get(item.product_id);

      if (!product) {
        return new Response(
          JSON.stringify({ error: `Product ${item.product_id} not found` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (!product.is_active) {
        return new Response(
          JSON.stringify({ error: `${product.name} is not available` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const qty = Math.max(1, Math.floor(Number(item.quantity)) || 1);

      if (product.stock_quantity < qty) {
        return new Response(
          JSON.stringify({
            error: `Insufficient stock for ${product.name}`,
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const lineTotal = product.price * qty;
      totalAmount += lineTotal;

      orderItems.push({
        product_id: product.id,
        quantity: qty,
        price_at_purchase: product.price,
      });
    }

    /* ---------- CREATE ORDER ---------- */

    const devMode = Deno.env.get("DEV_MODE") === "true";

    const shippingAddress = [
      shipping.address_line1,
      shipping.address_line2,
      shipping.city,
      shipping.state,
      shipping.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    console.log("[create-order] Creating order for user:", userId);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        status: devMode ? "paid" : "pending",
        total_amount: totalAmount,
        shipping_name: shipping.name,
        shipping_phone: shipping.phone,
        shipping_address: shippingAddress,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_pincode: shipping.pincode,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("[create-order] Order creation failed:", orderError);

      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("[create-order] Order created:", order.id);

    /* ---------- CREATE ORDER ITEMS ---------- */

    const orderItemsRows = orderItems.map((oi) => ({
      order_id: order.id,
      product_id: oi.product_id,
      quantity: oi.quantity,
      price_at_purchase: oi.price_at_purchase,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItemsRows);

    if (itemsError) {
      console.error("[create-order] Items creation failed:", itemsError);

      return new Response(
        JSON.stringify({ error: "Failed to create order items" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("[create-order] Order items created");

    /* ---------- RESPONSE ---------- */

    const razorpayOrderId = devMode ? `dev_order_${Date.now()}` : `${order.id}`;

    return new Response(
      JSON.stringify({
        order_id: order.id,
        razorpay_order_id: razorpayOrderId,
        amount: totalAmount * 100,
        dev_mode: devMode,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("[create-order] Error:", err);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});