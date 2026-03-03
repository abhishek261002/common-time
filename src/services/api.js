/**
 * API service for Edge Functions and Supabase
 */
import axios from "axios";
import { supabase } from "./supabase";

const getSupabaseUrl = () => import.meta.env.VITE_SUPABASE_URL;

function getFunctionsUrl() {
  const url = getSupabaseUrl();
  if (!url) return "";
  return url.replace(".supabase.co", ".supabase.co/functions/v1");
}

export async function createOrder(items, shippingAddress) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error("Not authenticated");
  }
  const url = `${getFunctionsUrl()}/create-order`;
  const res = await axios.post(
    url,
    { items, shipping_address: shippingAddress },
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}

export async function verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
  const url = `${getFunctionsUrl()}/verify-payment`;
  const res = await axios.post(
    url,
    {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
}
