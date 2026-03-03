import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

function slugify(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductGrid({ products, columns = 3 }) {
  const { addItem } = useCart();

  if (!products?.length) return null;

  const gridCols = columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8 md:gap-10`}>
      {products.map((product) => {
        const slug = product.slug || slugify(product.name) || product.id;
        return (
          <Link
            key={product.id}
            to={`/shop/${slug}`}
            className="group block"
          >
            <div className="overflow-hidden mb-3">
              <img
                src={product.image_url || "/newshero.jpg"}
                alt={product.name}
                className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              {product.name}
            </p>
            <p className="text-sm text-gray-500 mb-2 opacity-80">
              {product.description?.slice(0, 60)}
              {product.description?.length > 60 ? "…" : ""}
            </p>
            <p className="text-sm font-normal text-gray-700">
              {formatPrice(product.price)}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product.id, 1);
                toast.success("Added to cart");
              }}
              className="mt-3 text-sm uppercase tracking-wider text-gray-900 border-b border-transparent hover:border-gray-900 transition-colors"
            >
              Add to Cart
            </button>
          </Link>
        );
      })}
    </div>
  );
}
