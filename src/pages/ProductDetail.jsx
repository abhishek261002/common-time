import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { formatPrice } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .eq("is_active", true)
        .single();

      if (error) {
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product.id, quantity);
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <main className="min-h-screen py-16 flex items-center justify-center">
        <div className="h-96 w-full max-w-2xl bg-gray-100 animate-pulse rounded-2xl" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen py-16 text-center">
        <p className="text-gray-600">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-white text-black min-h-screen py-16 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        <section className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image_url || "/newshero.jpg"}
              alt={product.name}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stock_quantity || 99}
              />
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition uppercase tracking-wide"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
