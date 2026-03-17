import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LuxuryLocationCard = ({ name, area, address, hours, imageUrl, locationLink, id }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      // Triggers variant when card is in view on mobile
      whileInView={isMobile ? "hover" : "rest"}
      viewport={{ 
        once: false,
        // Using 0.5 means when the vertical center of the card 
        // hits the vertical center of your margin-zone, it triggers.
        amount: 0.5, 
        // We use a smaller negative margin so the card has room to "exist"
        // inside the detection area on smaller phone screens.
        margin: "-20% 0px -20% 0px" 
      }}
      className="relative w-full h-[550px] rounded-xl flex flex-col bg-[#1a1a1a] group cursor-pointer overflow-hidden border border-black/5"
    >
      {/* 1. IMAGE SECTION */}
      <motion.div
        variants={{
          rest: { height: "80%" },
          hover: { height: "55%" }
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
      >
        <motion.img
          src={imageUrl}
          alt={name}
          variants={{
            rest: { filter: "grayscale(0%)", scale: 1.05 },
            hover: { filter: "grayscale(0%)", scale: 1, transition: { duration: 1.2 } }
          }}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-6 right-6 z-20">
          <p className="text-[9px] font-[Garet_Book] text-white/40 tracking-[0.3em] font-bold">
            {id}
          </p>
        </div>
      </motion.div>

      {/* 2. INFO SECTION */}
      <motion.div
        variants={{
          rest: { height: "20%" },
          hover: { height: "45%" }
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full bg-[#1a1a1a] px-8 pt-8 pb-10 flex flex-col border-t border-white/5"
      >
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5D1B8] mb-2 block font-[Garet_Book] font-bold">
            {area}
          </span>
          <h3 className="text-3xl md:text-4xl font-light text-white tracking-tighter font-[Bai_Jamjuree] leading-none">
            {name}
          </h3>
        </div>

        <motion.div
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }
          }}
          className="flex flex-col flex-grow justify-between"
        >
          <div className="space-y-6">
            <p className="text-[11px] text-white/50 font-[Garet_Book] uppercase tracking-[0.2em] leading-relaxed max-w-[280px]">
              {address}
            </p>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8b7355] font-bold">Availability</span>
              <p className="text-[11px] text-white/80 font-[Garet_Book]">{hours}</p>
            </div>
          </div>

          <a 
            href={locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group/link w-fit mt-4"
            // Prevents the "Get Directions" click from triggering 
            // parent motion events if necessary
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold italic">
              Get Directions
            </span>
            <motion.div 
              variants={{
                rest: { width: "15px" },
                hover: { width: "40px" }
              }}
              className="h-[1px] bg-[#8b7355]" 
            />
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};