import { Link } from "react-router-dom";
import { formatPrice, slugify } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const imageUrl = product.image_url || product.image || "/newshero.jpg";
  const slug = product.slug || slugify(product.name) || product.id;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product.id, 1);
    toast.success("Added to cart");
  };

  return (
    <div className="relative group overflow-hidden">
      <Link to={`/shop/${slug}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="mt-3">
        <p className="text-base font-medium text-gray-900">{product.name}</p>
        <p className="text-sm text-gray-500 opacity-80">{product.category}</p>
        <p className="text-sm font-normal text-gray-700 mt-1">{formatPrice(product.price)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 text-sm uppercase tracking-wider text-gray-900 border-b border-transparent hover:border-gray-900 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
