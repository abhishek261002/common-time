import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import HeroSection from "../components/editorial/HeroSection";
import SplitSection from "../components/editorial/SplitSection";
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
        .eq("is_active", true)
        .limit(6);
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  const featuredCoffee = products.filter((p) => p.category === "coffee").slice(0, 3);
  const featuredObjects = products.filter((p) => p.category === "merchandise").slice(0, 3);

  return (
    <div className="bg-white">
      <HeroSection
        headline="designed for the moments between"
        subtext="A meticulous approach to every bean, roast, and pour. We find beauty in the precision of the process."
        ctaText="Discover"
        ctaHref="/shop"
      />

      <SplitSection
        label="The Philosophy"
        headline="We believe in the beauty of the pause."
        body="Common Time is made for the moments between – intentionally serving only bakes and coffee to create that gentle pause between your meals, and to quietly become part of your daily ritual. We imagine coffee for both purists and tourists. While we spend time perfecting the details, we don't believe in overwhelming you. The best coffee, after all, is the one you enjoy most."
        image="/newshero.jpg"
        imagePosition="right"
        linkText="Learn about our sourcing"
        linkHref="/about"
      />

      <section className="py-16 md:py-24 bg-[#fafaf8]">
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Curated Selection</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-10">Coffee Highlights</h2>
          <ProductGrid products={featuredCoffee} columns={3} />
        </Container>
      </section>

      <section className="py-16 md:py-24 relative">
        <img
          src="/herobg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 py-24 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/90 mb-4">Objects for Living</p>
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">Curated Wear & Ware</h2>
          <p className="text-white/90 max-w-xl mx-auto mb-8">
            Timeless pieces for your daily ritual. From ceramic mugs to soft hoodies.
          </p>
          <Link
            to="/shop?category=merchandise"
            className="inline-block text-white text-sm uppercase tracking-wider border-b border-white/80 hover:border-white"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Curated Selection</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-10">Objects & Equipment</h2>
          <ProductGrid products={featuredObjects} columns={3} />
        </Container>
      </section>

      <CitySection cities={["Kanpur", "Colombo", "Kathmandu"]} />

      <section className="py-12 text-center text-gray-500 text-sm">
        <p>a concept by bhatia hospitality group</p>
      </section>
    </div>
  );
}
