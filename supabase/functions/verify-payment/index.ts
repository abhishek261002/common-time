/**
 * verify-payment Edge Function
 * Verifies Razorpay signature, updates order status, reduces stock
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseAdmin } from "../_shared/supabase.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface VerifyPaymentBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

async function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const payload = `${orderId}|${paymentId}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const sigArray = new Uint8Array(sigBuffer);
  const expectedHex = Array.from(sigArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expectedHex === signature;
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

    const body: VerifyPaymentBody = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ error: "Missing payment verification fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeySecret) {
      return new Response(
        JSON.stringify({ error: "Payment gateway not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify signature: order_id|payment_id
    const isValid = await verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      razorpayKeySecret
    );

    // Find order by razorpay_order_id
    const { data: order, error: orderFetchError } = await supabaseAdmin
      .from("orders")
      .select("id, status")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (orderFetchError || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (order.status === "paid") {
      // Idempotent: already verified
      return new Response(
        JSON.stringify({ success: true, order_id: order.id, message: "Already verified" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isValid) {
      // Update order status
      const { error: updateOrderError } = await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          razorpay_payment_id: razorpay_payment_id,
        })
        .eq("id", order.id);

      if (updateOrderError) {
        console.error("Order update error:", updateOrderError);
        return new Response(
          JSON.stringify({ error: "Failed to update order" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Fetch order items and reduce stock
      const { data: orderItems, error: itemsError } = await supabaseAdmin
        .from("order_items")
        .select("product_id, quantity")
        .eq("order_id", order.id);

      if (!itemsError && orderItems) {
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
      }

      return new Response(
        JSON.stringify({ success: true, order_id: order.id }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Invalid signature - mark as failed
      await supabaseAdmin
        .from("orders")
        .update({ status: "failed" })
        .eq("id", order.id);

      return new Response(
        JSON.stringify({ error: "Payment verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("verify-payment error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
