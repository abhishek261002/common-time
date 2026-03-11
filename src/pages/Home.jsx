import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import HeroSection from "../components/editorial/HeroSection";
import CenteredRevealSection from "../components/editorial/SplitSection";
import CitySection from "../components/editorial/CitySection";
import ProductGrid from "../components/commerce/ProductGrid";
import Container from "../components/layout/Container";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true);
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  const featuredCoffee = products.filter((p) => p.category === "coffee").slice(0, 4);
  const featuredObjects = products.filter((p) => p.category === "merchandise").slice(0, 4);

  return (
    <div className="bg-white">
      <HeroSection
        headline="Designed for the moments between"
        subtext=""
        ctaText="Discover"
        ctaHref="/shop"
      />

     <CenteredRevealSection
  // Combine your previous headline and body into one string for a seamless reveal
  headline="Pourers of the world’s best coffees and providers of the tools and techniques that make it yours.
"
  linkText="Visit Us"
  linkHref="/locations"
/>

      <section className="py-16 md:py-24 bg-[#fafaf8]">
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-[Garet_Book]">Curated Selection</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-10 font-[Bai_Jamjuree] ">Coffee Highlights</h2>
          <ProductGrid products={featuredCoffee} columns={4} />
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-[Garet_Book]">Curated Selection</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-10 font-[Bai_Jamjuree] ">Objects & Equipment</h2>
          <ProductGrid products={featuredObjects} columns={4} />
        </Container>
      </section>

      {/* Partner Logos Marquee */}
      <PartnerLogos />

      <CitySection cities={["Vasant-Vihar", "Lodhi-Colony", "Khan-Market"]} />

     <section className="py-20 flex flex-col items-center justify-center font-[Garet_Book]">
  {/* A very thin, short divider */}
  <div className="w-12 h-px bg-gray-200 mb-8" />
  
  <p className="text-sm text-gray-400 uppercase tracking-[0.3em] font-medium">
    A concept by <span className="text-gray-900">Bhatia Hospitality Group</span>
  </p>
</section>
    </div>
  );
}

/* ---------- Partner Logos (Fixed Marquee) ---------- */
function PartnerLogos() {
  const brands = [
    {
      name: "LBB",
      file: "/logos/lbb.jpg",
      url: "https://www.instagram.com/p/DQeUg5qEgLo/?img_index=4&igsh=cHdjaDY1c2ZybDZx",
    },
    {
      name: "Food Talk India",
      file: "/logos/foodtalkindia.jpg",
      url: "https://www.instagram.com/p/DQcDapsElc2/?img_index=4&igsh=MXcxN3M5aDIxMDB2bA==",
    },
    {
      name: "ET Hospitality",
      file: "/logos/ethospitality.svg",
      url: "https://hospitality.economictimes.indiatimes.com/news/restaurants/common-time-debuts-in-lodhi-colony-new-delhi/125049847",
    },
    {
      name: "Restaurant India",
      file: "/logos/restaurantindia.png",
      url: "https://www.restaurantindia.in/news/restaurant-india-news-common-time-debuts-in-lodhi-colony-at-new-delhi.n14295",
    },
    {
      name: "StyleWire",
      file: "/logos/thestylewire.png",
      url: "https://thestylewire.in/2025/11/04/where-to-eat-stay-and-indulge-fresh-openings-across-india/",
    },
    {
      name: "Restaurant India",
      file: "/logos/restaurantindia.png",
      url: "https://www.instagram.com/p/DQlgM5xjpAQ/",
    },
  ];

  return (
    <section className="bg-white" aria-label="Partner logos">
      <div className="max-w-[1200px] mx-auto py-10 px-4 md:px-6 overflow-hidden">
        <p className="mb-4 text-xs uppercase tracking-widest text-gray-400 text-center md:text-left font-[Bai_Jamjuree]">
          Listen in to what others are saying
        </p>

        {/* Marquee container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...brands, ...brands].map((brand, i) => (
              <a
                key={i}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-36 sm:w-44 md:w-52 flex justify-center items-center px-6"
              >
                <img
                  src={brand.file}
                  alt={brand.name}
                  className="max-h-10 sm:max-h-12 md:max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Scoped animation styles */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: 200%;
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}