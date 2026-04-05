import React from "react";
import { motion } from "framer-motion";

const Common = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-screen bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
      {/* BRAND SHIMMER & GRAIN STYLES */}
      {/* <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shiny {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .shiny-text {
          background: linear-gradient(120deg, rgba(255,255,255,1) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,1) 55%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny 6s linear infinite;
        }
        .grain-overlay {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.04;
          pointer-events: none;
        }
      `}} /> */}
      
      <div className="absolute inset-0 grain-overlay z-20" />

      {/* TRIPTYCH BACKGROUND */}
      <div className="absolute inset-0 flex w-full h-full">
        <div className="flex-1 h-full border-r border-white/5  hidden md:block">
          <img src="/gallery-marquee/IMG_4885.JPG" className="w-full h-full object-cover opacity-80 " alt="" />
        </div>

        {/* CENTER PANEL - The focus area for text */}
        <div className="relative flex-[1.4] md:flex-[1.2] h-full overflow-hidden">
          <div className="absolute inset-0  z-10" />
          <img 
            src="/gallery-marquee/CT-02.jpg" 
            className="w-full h-full object-cover opacity-80 scale-105"
            alt="Center Atmosphere"
          />
        </div>

        <div className="flex-1 h-full border-l border-white/5  hidden md:block">
          <img src="/gallery-marquee/IMG_4545.JPG" className="w-full h-full object-cover opacity-80 " alt="" />
        </div>
      </div>

      {/* MINIMAL TEXT CONTENT - Bound to middle panel */}
      <div className="relative z-30 w-full max-w-[320px] md:max-w-[450px] px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Top Label */}
          <p className="font-[Garet_Book] text-[16px] md:text-[16px]  mb-4 text-white">
            Our Global Journey
          </p>

          {/* Main Title */}
          <h2 className="text-2xl md:text-2xl font-light font-[Bai_Jamjuree] mb-6 tracking-tight">
            "<span className="">Common Time</span>"
          </h2>

          {/* Narrative Content - Tightened for center fit */}
          <div className="space-y-4">
            <p className="font-[Garet_Book] text-sm md:text-sm leading-relaxed tracking-wide text-white">
              A curated interval where slow brews meet quiet mornings.
Profound connections found in the deliberate space between.
            </p>

            {/* <p className="font-[Garet_Book] text-[10px] md:text-[10px]  text-white/90 leading-relaxed">
              Precision in ritual. Artifacts that demand you to linger.
            </p> */}
          </div>

          {/* Read Blog Action with 1:1 Line Styling */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-24 md:w-32 h-[1px] bg-white/20 mb-4" />
            {/* <button className="font-[Garet_Book] text-[10px] uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors">
              Read Blog
            </button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Common;