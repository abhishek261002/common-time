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

// Helper to get auth headers
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${session.access_token}`,
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  };
}

export async function createOrder(items, shippingAddress) {
  const headers = await getAuthHeaders();

  const url = `${getFunctionsUrl()}/create-order`;

  const res = await axios.post(
    url,
    { items, shipping_address: shippingAddress },
    { headers }
  );

  return res.data;
}

export async function verifyPayment(
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) {
  const headers = await getAuthHeaders();

  const url = `${getFunctionsUrl()}/verify-payment`;

  const res = await axios.post(
    url,
    {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    },
    { headers }
  );

  return res.data;
}
