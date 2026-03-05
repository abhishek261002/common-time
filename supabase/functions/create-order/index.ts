/**
 * create-order Edge Function
 * Accepts cart items, validates products, creates Razorpay order, inserts order + order_items
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createUserClient, supabaseAdmin } from "../_shared/supabase.ts";

interface CartItem {
  product_id: string;
  quantity: number;
}

interface CreateOrderBody {
  items: CartItem[];
  shipping_address?: {
    name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }


const authHeader = req.headers.get("Authorization");

if (!authHeader) {
  return new Response(
    JSON.stringify({ error: "Missing Authorization header" }),
    { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

const token = authHeader.replace("Bearer ", "");

const {
  data: { user },
  error: authError,
} = await supabaseAdmin.auth.getUser(token);

if (authError || !user) {
  return new Response(
    JSON.stringify({ error: "Invalid token" }),
    { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

const userId = user.id;

if (authError || !user) {
  return new Response(
    JSON.stringify({ error: "Unauthorized" }),
    { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

const userId = user.id;
    const body: CreateOrderBody = await req.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shipping = body.shipping_address;
    if (!shipping?.name || !shipping?.phone || !shipping?.address_line1 || !shipping?.city || !shipping?.state || !shipping?.pincode) {
      return new Response(
        JSON.stringify({ error: "Shipping address is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const productIds = body.items.map((i) => i.product_id);
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, name, price, stock_quantity, is_active")
      .in("id", productIds);

    if (productsError || !products || products.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid products" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    let totalAmount = 0;
    const orderItems: { product_id: string; quantity: number; price_at_purchase: number }[] = [];

    for (const item of body.items) {
      const product = productMap.get(item.product_id);
      if (!product) {
        return new Response(
          JSON.stringify({ error: `Product ${item.product_id} not found` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!product.is_active) {
        return new Response(
          JSON.stringify({ error: `Product ${product.name} is not available` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const qty = Math.max(1, Math.floor(Number(item.quantity)) || 1);
      if (product.stock_quantity < qty) {
        return new Response(
          JSON.stringify({ error: `Insufficient stock for ${product.name}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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

    if (totalAmount < 100) {
      return new Response(
        JSON.stringify({ error: "Minimum order amount is Rs 1" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const devMode = Deno.env.get("DEV_MODE") === "true";
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    const razorpayConfigured = !!(razorpayKeyId && razorpayKeySecret);

    // Dev mode: skip Razorpay, mark order as paid, decrement stock
    if (devMode || !razorpayConfigured) {

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
          status: "paid",
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
        console.error("Order insert error:", orderError);
        return new Response(
          JSON.stringify({ error: "Failed to create order" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
        console.error("Order items insert error:", itemsError);
        return new Response(
          JSON.stringify({ error: "Failed to create order items" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Decrement stock (same logic as verify-payment)
      for (const oi of orderItems) {
        const { data: prod } = await supabaseAdmin
          .from("products")
          .select("stock_quantity")
          .eq("id", oi.product_id)
          .single();
        if (prod) {
          const newStock = Math.max(0, prod.stock_quantity - oi.quantity);
          await supabaseAdmin
            .from("products")
            .update({ stock_quantity: newStock })
            .eq("id", oi.product_id);
        }
      }

      return new Response(
        JSON.stringify({ order_id: order.id, dev_mode: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const receipt = `ct_${Date.now()}_${userId.slice(0, 8)}`;
    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "INR",
        receipt,
        notes: { user_id: userId },
      }),
    });

    if (!razorpayRes.ok) {
      const errBody = await razorpayRes.text();
      console.error("Razorpay error:", errBody);
      return new Response(
        JSON.stringify({ error: "Failed to create payment order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpayOrder = await razorpayRes.json();
    const razorpayOrderId = razorpayOrder.id;

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
        status: "pending",
        total_amount: totalAmount,
        razorpay_order_id: razorpayOrderId,
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
      console.error("Order insert error:", orderError);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
      console.error("Order items insert error:", itemsError);
      return new Response(
        JSON.stringify({ error: "Failed to create order items" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        razorpay_order_id: razorpayOrderId,
        amount: totalAmount,
        order_id: order.id,
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
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
