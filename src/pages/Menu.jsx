import { menuData } from "../data/menuData";

export default function Menu() {
  return (
    <main className="min-h-screen py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-16 tracking-tight">
          Menu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm uppercase tracking-wider text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Coffee
            </h2>
            <ul className="space-y-4">
              {menuData.coffee.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-baseline gap-4 border-b border-gray-100 pb-3"
                >
                  <span className="text-gray-900">{item.name}</span>
                  <span className="text-gray-600 text-sm">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-wider text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Bakes
            </h2>
            <ul className="space-y-4">
              {menuData.bakes.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-baseline gap-4 border-b border-gray-100 pb-3"
                >
                  <span className="text-gray-900">{item.name}</span>
                  <span className="text-gray-600 text-sm">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 text-sm text-gray-500 italic">
          * All items are prepared fresh daily. Please inform us of any allergies.
        </p>
      </div>
    </main>
  );
}
