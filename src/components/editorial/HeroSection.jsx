import { Link } from "react-router-dom";

export default function HeroSection({
  image,
  headline,
  subtext,
  ctaText,
  ctaHref = "/shop",
}) {
  return (
    <section className="relative w-full min-h-screen min-h-[380px] overflow-hidden">
      <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/bg-video/2909914-uhd_3840_2024_24fps.mp4" type="video/mp4" />
  {/* Fallback image if video fails to load */}
  <img
    src="/herobg.jpg"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover"
  />
</video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Bai_Jamjuree] text-white tracking-[0.02em] leading-tight mb-4">
          {headline || "designed for the moments between"}
        </h1>
        {subtext && (
          <p className="text-white/90  text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
            {subtext}
          </p>
        )}
        {ctaText && (
          <Link
            to={ctaHref}
            className="inline-block px-8 py-3 font-[Garet_Book] bg-[#8B7355]/90 text-white text-sm uppercase tracking-wider hover:bg-[#8B7355] transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
