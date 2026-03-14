import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import HeroSection from "../components/editorial/HeroSection";
import CenteredRevealSection from "../components/editorial/SplitSection";
import CitySection from "../components/editorial/CitySection";
import ProductGrid from "../components/commerce/ProductGrid";
import Container from "../components/layout/Container";
import GalleryMarquee from "../components/editorial/GalleryMarquee";
import InstagramSection from "../components/editorial/InstagramSection";

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
      {/* CSS for the Shimmer Effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shiny {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .shiny-text {
          color: #1a1a1a;
          background: linear-gradient(
            120deg, 
            rgba(26, 26, 26, 1) 45%, 
            rgba(139, 115, 85, 0.8) 50%, 
            rgba(26, 26, 26, 1) 55%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny 6s linear infinite;
          line-height: 1.2;
        }
      `}} />

      <HeroSection
        headline="Designed for the moments between"
        subtext=""
        ctaText="Discover"
        ctaHref="/shop"
      />

      <CenteredRevealSection
        headline="Coffee, conversation, and small moments that make the day better."
        linkText="Visit Us"
        linkHref="/locations"
      />

      <GalleryMarquee />

      {/* --- Objects & Equipment Section with Shimmer --- */}
      <section className="bg-[#fafaf8] py-24 md:py-32 border-b border-black/5">
        <Container>
          <div className="flex flex-col items-start mb-16 md:mb-24">
            {/* Sub-label with Shimmer */}
            <span className="shiny-text py-2 inline-block overflow-visible font-[Bai_Jamjuree] text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold italic mb-4">
              Curated Selection
            </span>
            
            {/* Main Heading with Shimmer - & remains unchanged */}
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-black/20 hidden md:block"></div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight font-[Bai_Jamjuree] flex items-baseline gap-3">
                <span className="shiny-text py-2 inline-block overflow-visible">Objects & Equipment</span> 
              </h2>
            </div>
          </div>

          <ProductGrid products={featuredObjects} columns={4} />
          
          <div className="mt-20 flex justify-end">
            <div className="h-[1px] w-24 bg-black/5"></div>
          </div>
        </Container>
      </section>

      <PartnerLogos />
      <InstagramSection />
      <CitySection cities={["Vasant-Vihar", "Lodhi-Colony", "Khan-Market"]} />

      <section className="py-20 flex flex-col items-center justify-center font-[Garet_Book]">
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