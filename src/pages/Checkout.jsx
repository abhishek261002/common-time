import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { formatPrice } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder, verifyPayment } from "../services/api";
import OrderSummary from "../components/commerce/OrderSummary";
import toast from "react-hot-toast";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.onload = () => resolve(window.Razorpay);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { getCartItems, clearCart } = useCart();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const items = getCartItems();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true, state: { from: "/checkout" } });
      return;
    }
    if (items.length === 0 && user) {
      navigate("/cart", { replace: true });
      return;
    }
    if (items.length === 0) return;

    async function fetchProducts() {
      const ids = items.map((i) => i.product_id);
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .in("id", ids);
      const map = {};
      (data || []).forEach((p) => (map[p.id] = p));
      setProducts(map);
      setLoading(false);
    }
    fetchProducts();
  }, [user, authLoading, items, navigate]);

  const cartRows = items
    .map((item) => ({ ...item, product: products[item.product_id] }))
    .filter((row) => row.product);

  const total = cartRows.reduce(
    (s, row) => s + row.product.price * row.quantity,
    0
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = async () => {
    const required = ["name", "phone", "address_line1", "city", "state", "pincode"];
    for (const k of required) {
      if (!form[k]?.trim()) {
        toast.error(`Please fill ${k.replace("_", " ")}`);
        return;
      }
    }

    setPayLoading(true);
    try {
      const response = await createOrder(items, form);

      if (response.dev_mode) {
        clearCart();
        toast.success("Order placed successfully (dev mode)!");
        navigate("/orders", { replace: true });
        setPayLoading(false);
        return;
      }

      const { razorpay_order_id, amount } = response;
      const Razorpay = await loadRazorpay();
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!keyId) {
        toast.error("Payment not configured. Set VITE_RAZORPAY_KEY_ID for production checkout.");
        setPayLoading(false);
        return;
      }

      const options = {
        key: keyId,
        amount,
        currency: "INR",
        order_id: razorpay_order_id,
        name: "Common Time",
        description: "Order payment",
        handler: async (res) => {
          try {
            await verifyPayment(
              res.razorpay_order_id,
              res.razorpay_payment_id,
              res.razorpay_signature
            );
            clearCart();
            toast.success("Payment successful!");
            navigate("/orders", { replace: true });
          } catch (err) {
            toast.error(err?.response?.data?.error || "Payment verification failed");
          } finally {
            setPayLoading(false);
          }
        },
        modal: {
          ondismiss: () => setPayLoading(false),
        },
      };

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed");
        setPayLoading(false);
      });
      rzp.open();
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "Something went wrong";
      if (typeof msg === "string" && msg.toLowerCase().includes("payment gateway not configured")) {
        toast.error("Payment not configured. Set up Razorpay or enable dev mode to test checkout.");
      } else {
        toast.error(msg);
      }
      setPayLoading(false);
    }
  };

  if (authLoading || (user && loading)) {
    return (
      <main className="min-h-screen py-24 flex justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full" />
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h1 className="text-2xl font-medium mb-10">Checkout</h1>
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-wider text-gray-500">Shipping Address</h2>
            <div className="grid gap-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-900 placeholder:text-gray-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded"
          />
          <input
            type="text"
            name="address_line1"
            placeholder="Address Line 1 *"
            value={form.address_line1}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded"
          />
          <input
            type="text"
            name="address_line2"
            placeholder="Address Line 2 (optional)"
            value={form.address_line2}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={form.state}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded"
            />
          </div>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode *"
            value={form.pincode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded text-gray-900 placeholder:text-gray-400"
          />
            </div>
          </div>
          <button
            onClick={handlePay}
            disabled={payLoading}
            className="w-full mt-8 py-4 bg-[#6B5344] text-white text-sm uppercase tracking-wider font-medium hover:bg-[#5a4538] disabled:opacity-70 transition-colors"
          >
            {payLoading ? "Processing..." : "Continue to Payment"}
          </button>
        </div>
        <div>
          <OrderSummary items={cartRows} total={total} />
        </div>
      </div>
    </main>
  );
}
