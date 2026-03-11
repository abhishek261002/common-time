import { Link } from "react-router-dom";

export default function CitySection({ cities }) {
  return (
    <section className="py-20 md:py-28 bg-[#fafaf8] font-[Bai_Jamjuree]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-8 font-[Garet_Book]">
          Find us
        </p>
        <div className="flex flex-col gap-4">
          {cities.map((city) => (
            <Link
              key={city}
              to="/locations"
              className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-300 hover:text-gray-400 transition-colors tracking-tight"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
