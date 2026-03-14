import React from 'react';
import Container from '../components/layout/Container';

const Locations = () => {
  const locations = [
    {
      id: "01",
      city: "Lodhi Colony",
      area: "Meherchand Market",
      description: "Our minimalist flagship blending Amsterdam’s bakery culture with Japanese precision. A sanctuary of light and linear design in the heart of New Delhi.",
      address: "Shop 2–3, Meherchand Market, New Delhi 110003",
      hours: "08:00 AM — 10:00 PM",
      imageUrl: "/locations/IMG_4886.JPG",
      locationLink: "https://maps.google.com/?q=Common+Time+Meherchand+Market+Lodhi+Colony+New+Delhi",
    },
    {
      id: "02",
      city: "Vasant Vihar",
      area: "Basant Lok",
      description: "A sleek neighborhood retreat serving artisan brews and refined bakes. Designed as a creative hub where community meets curated specialty coffee.",
      address: "Basant Lok Market, Vasant Vihar, New Delhi 110057",
      hours: "08:00 AM — 10:00 PM",
      imageUrl: "/locations/IMG_4720.jpg",
      locationLink: "https://maps.app.goo.gl/P7CNpQL1mJG3xS2o9",
    },
    {
      id: "03",
      city: "Khan Market",
      area: "Coming Soon",
      description: "Our upcoming evolution. A new perspective on the Common Time experience, arriving soon in Delhi's most iconic lifestyle destination.",
      address: "Opening Winter 2025",
      hours: "Announcing Soon",
      imageUrl: "/locations/huma-kabakci-oRk4Ep65tRc-unsplash.jpg",
      locationLink: "https://maps.google.com/?q=Khan+Market+New+Delhi",
    },
  ];

  const ShinyText = ({ children, className = "" }) => (
    <span className={`shiny-text py-2 inline-block overflow-visible ${className}`}>
      {children}
    </span>
  );

  return (
    <main className="bg-[#fafaf8] min-h-screen">
      {/* Custom Keyframes for the Pulsating Obsidian Border */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shiny {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .shiny-text {
          color: #1a1a1a;
          background: linear-gradient(120deg, rgba(26,26,26,1) 45%, rgba(139,115,85,0.8) 50%, rgba(26,26,26,1) 55%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny 6s linear infinite;
        }

        @keyframes borderBreathe {
          0% { transform: scale(1); opacity: 0.15; border-width: 1px; }
          50% { transform: scale(1.04); opacity: 0.45; border-width: 1.5px; }
          100% { transform: scale(1); opacity: 0.15; border-width: 1px; }
        }
        .animate-breathe {
          animation: borderBreathe 4s ease-in-out infinite;
        }
      `}} />

      {/* Page Header */}
      <section className="py-20 md:py-22">
        <Container>
          <div className="max-w-3xl">
            <ShinyText className="font-[Garet_Book] text-[10px] md:text-xs uppercase tracking-[0.5em] font-semibold italic mb-6">
              Our Spaces
            </ShinyText>
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter font-[Bai_Jamjuree] leading-[0.9]">
              Designed for the <br />
              <span className="italic font-normal text-[#8b7355]">Moments Between.</span>
            </h1>
          </div>
        </Container>
      </section>

      {/* Locations Sections */}
      {locations.map((loc, index) => (
        <section key={loc.id} className="relative mb-32 md:mb-32">
          <Container>
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
              
              {/* Image Side with Single Black Pulsating Border */}
              <div className="relative w-full lg:w-7/12 group">
                
                {/* The Single Visible Pulsating Border */}
                <div className="absolute inset-0 z-0 border-black transition-all duration-1000 animate-breathe pointer-events-none"></div>

                <div className="relative z-10 overflow-hidden shadow-xl rounded-sm">
                  {/* Floating ID Tag */}
                  <div className="absolute top-8 left-8 z-30 font-[Bai_Jamjuree] text-white/80 text-3xl font-light tracking-tighter">
                    {loc.id}
                  </div>

                  <div className="w-full h-[50vh] lg:h-[65vh] overflow-hidden">
                    <img 
                      src={loc.imageUrl} 
                      alt={loc.city} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] ease-out group-hover:scale-105" 
                    />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-5/12 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-8 bg-[#8b7355]"></div>
                  <span className="font-[Garet_Book] text-[10px] uppercase tracking-[0.3em] text-[#8b7355] font-bold">
                    {loc.area}
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-light tracking-tight font-[Bai_Jamjuree] mb-8">
                  <ShinyText>{loc.city}</ShinyText>
                </h2>

                <p className="font-[Garet_Book] text-gray-500 leading-relaxed mb-12 text-lg lg:pr-12">
                  {loc.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 w-full border-t border-black/5 pt-10">
                  <div className="group">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 mb-2 transition-colors group-hover:text-[#8b7355]">Location</p>
                    <p className="text-sm font-[Garet_Book] text-gray-800 leading-snug">{loc.address}</p>
                  </div>
                  <div className="group">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 mb-2 transition-colors group-hover:text-[#8b7355]">Availability</p>
                    <p className="text-sm font-[Garet_Book] text-gray-800">{loc.hours}</p>
                  </div>
                </div>

                <a 
                  href={loc.locationLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-12 group flex items-center gap-4 font-[Bai_Jamjuree] text-[10px] uppercase tracking-[0.4em] text-black"
                >
                  Get Directions
                  <div className="h-[1px] w-6 bg-black group-hover:w-12 transition-all duration-500"></div>
                </a>
              </div>
            </div>
          </Container>
        </section>
      ))}
    </main>
  );
};

export default Locations;