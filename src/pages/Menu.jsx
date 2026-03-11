import { menuData } from "../data/menuData";

export default function Menu() {
  // Helper to format category IDs into readable titles (e.g., 'black_coffee' -> 'Black Coffee')
  const formatTitle = (id) => id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="min-h-screen py-20 md:py-28 bg-white font-[Bai_Jamjuree]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-6xl font-[Bai_Jamjuree] text-black mb-8 tracking-tighter uppercase">
            Menu
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "The best coffee, after all, is the one you enjoy most."
          </p>
        </div>

        {/* Dynamic Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
          {Object.keys(menuData).map((category) => (
            <div key={category} className="flex flex-col">
              <h2 className="text-[18px] font-bold uppercase tracking-[0.2em] text-black mb-8 pb-2 border-b-2 border-black/10">
                {formatTitle(category)}
              </h2>
              <ul className="space-y-6">
                {menuData[category].map((item) => (
                  <li
                    key={item.name}
                    className="group"
                  >
                    <div className="flex justify-between items-baseline gap-4 mb-1">
                      <span className="text-[18px] font-medium text-black group-hover:text-gray-500 transition-colors uppercase tracking-tight">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-black shrink-0">
                        {item.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Notes from Document */}
        <div className="mt-24 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">Note</p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-[40ch]">
              We intentionally serve only bakes and coffee to create that gentle pause between your meals. [cite: 8] 
              Our bakes are rotational and small-batch—please check the display. [cite: 15]
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">Dietary & Service</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Govt taxes as applicable. We do not apply service charge. [cite: 131] 
              Please let your server know of any allergies. [cite: 133]
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}