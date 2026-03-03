import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  { value: "all", label: "All Items" },
  { value: "coffee", label: "Coffee" },
  { value: "merchandise", label: "Objects" },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from("products").select("*").eq("is_active", true);

      if (category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  return (
    <main className="bg-white min-h-screen py-16 px-4 md:px-8 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase tracking-tight">
          Shop
        </h1>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
          Designed for the moments between — coffee, apparel, and merchandise.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`pb-1 border-b-2 transition-colors ${
                category === cat.value
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-16">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
