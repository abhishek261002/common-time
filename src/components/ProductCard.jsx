import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const imageUrl = product.image_url || product.image || "/newshero.jpg";

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product.id, 1);
    toast.success("Added to cart");
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg">
      <Link to={`/shop/${product.id}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center text-zinc-100 p-4">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-sm mb-2 capitalize">{product.category}</p>
          <p className="text-lg font-bold mb-3">{formatPrice(product.price)}</p>
          <span className="bg-zinc-200 text-zinc-900 font-semibold px-4 py-2 rounded-full">
            View Product
          </span>
        </div>
      </Link>
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={handleAddToCart}
          className="w-full bg-white text-black py-2 rounded-full text-sm font-medium hover:bg-gray-100"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
