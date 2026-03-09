import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/**
 * RevealWord handles the individual word "filling" effect.
 * It calculates its own progress based on the overall section progress.
 */
const RevealWord = ({ children, progress, index, totalWords }) => {
  // We offset each word's start/end so they reveal in a sequence (first line, then second)
  const start = index / totalWords;
  const end = (index + 1) / totalWords;
  
  // Local progress for this specific word
  const wordProgress = Math.min(Math.max((progress - start) / (end - start), 0), 1);

  return (
    <span className="relative inline-block mr-[0.25em] whitespace-nowrap">
      {/* Background layer: The 'Grey' state */}
      <span className="text-gray-300 transition-colors duration-300">
        {children}
      </span>
      {/* Foreground layer: The 'Black' state that reveals horizontally */}
      <span 
        className="absolute top-0 left-0 text-black overflow-hidden"
        style={{ width: `${wordProgress * 100}%`, transition: 'width 0.1s linear' }}
      >
        {children}
      </span>
    </span>
  );
};

export default function SplitSection({
  label,
  headline,
  body,
  image,
  imagePosition = "right",
  linkText,
  linkHref,
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Start animation when element center reaches lower-middle of screen
    const triggerPoint = viewportHeight * 1;

    const elementCenter = rect.top + rect.height / 2;

    const distanceFromTrigger = triggerPoint - elementCenter;

    // How long the animation lasts
    const animationDistance = viewportHeight * 0.8;

    const progress = Math.min(
      Math.max(distanceFromTrigger / animationDistance, 0),
      1
    );

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Split text into words for the sequential reveal
  const headlineWords = headline ? headline.split(" ") : [];
  const bodyWords = body ? body.split(" ") : [];

  const textBlock = (
    <div className="flex flex-col gap-8">
      {label && (
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#493627]/60">
          {label}
        </span>
      )}

      {/* Headline Reveal */}
      <h2 className="text-4xl font-bold leading-tight md:text-5xl tracking-tight">
        {headlineWords.map((word, i) => (
          <RevealWord 
            key={`h-${i}`} 
            index={i} 
            totalWords={headlineWords.length} 
            progress={scrollProgress}
          >
            {word}
          </RevealWord>
        ))}
      </h2>

      {/* Body Text Reveal (Starts after headline is mostly done) */}
      <div className="text-base md:text-xl leading-relaxed">
        {bodyWords.map((word, i) => (
          <RevealWord 
            key={`b-${i}`} 
            index={i + headlineWords.length} // Offset so body starts after headline
            totalWords={headlineWords.length + bodyWords.length} 
            progress={scrollProgress}
          >
            {word}
          </RevealWord>
        ))}
      </div>

      <div className="h-px w-24 bg-[#493627]/30"></div>

      {linkText && linkHref && (
        <Link
          to={linkHref}
          className="inline-block w-fit text-sm font-bold uppercase tracking-widest text-[#493627] border-b-2 border-[#493627] pb-1 transition-all hover:opacity-70"
        >
          {linkText}
        </Link>
      )}
    </div>
  );

  const imageBlock = image && (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-2xl">
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover  hover:grayscale-0 transition-all duration-700"
      />
    </div>
  );

  return (
    <section ref={containerRef} className="mx-auto max-w-7xl px-6 py-24 md:py-32 bg-white">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
        {imagePosition === "left" ? (
          <>
            <div className="order-1">{imageBlock}</div>
            <div className="order-2">{textBlock}</div>
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">{textBlock}</div>
            <div className="order-1 md:order-2">{imageBlock}</div>
          </>
        )}
      </div>
    </section>
  );
}