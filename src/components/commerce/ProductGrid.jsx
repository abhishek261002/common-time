import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

/** * Helper to generate URL slugs from product names 
 */
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
    <>
      {/* Embedded 3D Flip Styles 
        Tailwind doesn't support preserve-3d natively without plugins, 
        so we include it here for a "single-file" solution.
      */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .group:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0.25rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6 md:gap-8`}>
        {products.map((product) => {
          const slug = product.slug || slugify(product.name) || product.id;

          return (
            <div 
              key={product.id} 
              /* Reduced height to approx 0.75x (550px -> 412px) */
              className="group perspective-1000 h-[412px] w-full"
            >
              <div className="flip-card-inner">
                
                {/* FRONT SIDE: Minimalist Image View */}
                {/* REMOVED: grayscale group-hover:grayscale-0 */}
                <div className="flip-card-front bg-gray-100 overflow-hidden">
                  <img
                    src={product.image_url || "/newshero.jpg"}
                    alt={product.name}
                    /* Image is now full color by default */
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle label on front (optional) */}
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white bg-black/20 backdrop-blur-sm px-2 py-0.5">
                      {product.name}
                    </p>
                  </div>
                </div>

                {/* BACK SIDE: Interactive Details */}
                {/* Reduced padding (p-10 -> p-7) */}
                <div className="flip-card-back bg-[#F9F7F2] p-7 flex flex-col justify-center items-start border border-gray-100 shadow-2xl">
                  {/* Scaled down typography and margins */}
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">
                    Curated Essential
                  </span>
                  
                  {/* Reduced font size (text-3xl -> text-2xl) */}
                  <h3 className="text-2xl font-light text-gray-900 mb-1.5 uppercase tracking-tight leading-tight">
                    {product.name}
                  </h3>
                  
                  {/* Reduced font size and description limit */}
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed font-light">
                    {product.description?.slice(0, 110)}
                    {product.description?.length > 110 ? "…" : ""}
                  </p>

                  {/* Reduced font size (text-2xl -> text-xl) and margin */}
                  <p className="text-xl font-medium text-gray-900 mb-7">
                    {formatPrice(product.price)}
                  </p>

                  {/* Reduced gap and margin */}
                  <div className="flex flex-col gap-4 w-full mt-auto">
                    {/* Primary Action: Add to Cart */}
                    {/* Reduced padding (py-4 -> py-3) */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product.id, 1);
                        toast.success(`${product.name} added to cart`);
                      }}
                      className="w-full py-3 bg-[#493627] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors duration-300"
                    >
                      Add to Cart
                    </button>

                    {/* Secondary Action: View Product Page */}
                    <Link
                      to={`/shop/${slug}`}
                      className="text-center text-[9px] font-bold uppercase tracking-widest text-gray-500 border-b border-transparent hover:border-gray-400 pb-0.5 transition-all"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}