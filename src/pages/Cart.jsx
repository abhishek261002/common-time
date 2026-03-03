import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { formatPrice } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";

export default function Cart() {
  const { cart, updateQuantity, removeItem, getCartItems } = useCart();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const items = getCartItems();

  useEffect(() => {
    if (items.length === 0) {
      setProducts({});
      setLoading(false);
      return;
    }
    async function fetchProducts() {
      const ids = items.map((i) => i.product_id);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image_url, stock_quantity")
        .in("id", ids);

      if (!error && data) {
        const map = {};
        data.forEach((p) => (map[p.id] = p));
        setProducts(map);
      }
      setLoading(false);
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const cartRows = items
    .map((item) => ({
      ...item,
      product: products[item.product_id],
    }))
    .filter((row) => row.product);

  const total = cartRows.reduce(
    (s, row) => s + row.product.price * row.quantity,
    0
  );

  if (items.length === 0 && !loading) {
    return (
      <main className="min-h-screen py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          to="/shop"
          className="text-black underline hover:no-underline uppercase"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 uppercase">Cart</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {cartRows.map((row) => (
            <div
              key={row.product_id}
              className="flex gap-4 md:gap-6 items-center border-b border-gray-200 pb-6"
            >
              <img
                src={row.product.image_url || "/newshero.jpg"}
                alt={row.product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{row.product.name}</h3>
                <p className="text-gray-600">{formatPrice(row.product.price)}</p>
              </div>
              <QuantitySelector
                value={row.quantity}
                onChange={(q) => updateQuantity(row.product_id, q)}
                min={1}
                max={row.product.stock_quantity || 99}
              />
              <p className="font-semibold w-20 text-right">
                {formatPrice(row.product.price * row.quantity)}
              </p>
              <button
                onClick={() => removeItem(row.product_id)}
                className="text-gray-500 hover:text-red-600 text-sm uppercase"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartRows.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-lg font-bold">
            Total: {formatPrice(total)}
          </p>
          <Link
            to="/checkout"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition uppercase"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </main>
  );
}
