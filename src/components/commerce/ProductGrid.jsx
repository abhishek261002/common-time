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

  // Updated logic to handle 4 columns
  const gridCols = 
    columns === 4 ? "lg:grid-cols-4" : 
    columns === 2 ? "lg:grid-cols-2" : 
    "lg:grid-cols-3";

  return (
    <>
      {/* Embedded 3D Flip Styles */}
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
              /* Height adjusted to 380px for better 4-column proportions */
              className="group perspective-1000 h-[380px] w-full"
            >
              <div className="flip-card-inner">
                
                {/* FRONT SIDE: Minimalist Image View */}
                <div className="flip-card-front bg-gray-100 overflow-hidden">
                  <img
                    src={product.image_url || "/newshero.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white bg-black/20 backdrop-blur-sm px-2 py-0.5 font-[Bai_Jamjuree]">
                      {product.name}
                    </p>
                  </div>
                </div>

                {/* BACK SIDE: Interactive Details */}
                <div className="flip-card-back bg-[#F9F7F2] p-6 flex flex-col justify-center items-start border border-gray-100 shadow-2xl">
                  {/* <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2 font-[Garet_Book]">
                    Curated Essential
                  </span> */}
                  
                  <h3 className="text-xl font-light text-gray-900 mb-1.5 uppercase tracking-tight leading-tight font-[Bai_Jamjuree]">
                    {product.name}
                  </h3>
                  
                  <p className="text-[11px] text-gray-600 mb-3 leading-relaxed font-light font-[Garet_Book]">
                    {product.description?.slice(0, 90)}
                    {product.description?.length > 90 ? "…" : ""}
                  </p>

                  <p className="text-lg font-medium text-gray-900 mb-6 font-[Bai_Jamjuree]">
                    {formatPrice(product.price)}
                  </p>

                  <div className="flex flex-col gap-3 w-full mt-auto">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product.id, 1);
                        toast.success(`${product.name} added to cart`);
                      }}
                      className="w-full py-2.5 bg-[#493627] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors duration-300 font-[Garet_Book]"
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/shop/${slug}`}
                      className="text-center text-[9px] font-bold uppercase tracking-widest text-gray-500 border-b border-transparent hover:border-gray-400 pb-0.5 transition-all font-[Garet_Book]"
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