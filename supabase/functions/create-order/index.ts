/**
 * create-order Edge Function
 * Accepts cart items, validates products, creates order and order_items
 */

/// <reference lib="deno.ns" />

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

    const rawAuthHeader =
      req.headers.get("Authorization") ?? req.headers.get("authorization") ?? "";
    const authHeader = rawAuthHeader.trim();

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

    const userClient = createUserClient(req);

    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();

    if (authError) {
      console.error("AUTH FAILED:", authError);

      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not authenticated" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = user.id;

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
          JSON.stringify({ error: `Insufficient stock for ${product.name}` }),
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

    /* ---------- DEV MODE ---------- */

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
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

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
      return new Response(
        JSON.stringify({ error: "Failed to create order items" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const razorpayOrderId = devMode
      ? `dev_order_${Date.now()}`
      : `${order.id}`;

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

    console.error("create-order error:", err);

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

});