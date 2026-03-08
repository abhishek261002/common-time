import { Link } from "react-router-dom";
import SplitSection from "../components/editorial/SplitSection";

export default function About() {
  return (
    <main className="flex flex-col font-display text-slate-900 antialiased bg-[#F9F7F2]">
      {/* 1. HERO SECTION */}
      <section className="p-0 sm:p-4">
        <div 
          className="flex min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat sm:rounded-xl items-center justify-center p-6 text-center" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/herobg.jpg")`
          }}
        >
          <div className="flex flex-col gap-4 max-w-2xl text-white">
            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-7xl">
              Coffee, considered.
            </h1>
            <p className="text-lg font-normal leading-relaxed sm:text-xl opacity-90">
              A meticulous approach to every bean, roast, and pour.
            </p>
          </div>
          <button className="mt-4 flex min-w-[180px] items-center justify-center rounded-full h-12 px-8 bg-[#493627] text-white text-base font-bold tracking-widest uppercase hover:opacity-90 transition-all">
            Explore our process
          </button>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <SplitSection
        label="Our Story"
        headline="We believe in the beauty of the pause."
        body="Common Time is made for the moments between. Everything you see, taste, and feel here has been thoughtfully created to offer an experience that feels universal – yet always remains rooted in great products. While we spend time perfecting the details – from the beans to the exact steaming temperature – we don't believe in overwhelming you. The best coffee, after all, is the one you enjoy most."
        image="/newshero.jpg"
        imagePosition="right"
        linkText="Visit our locations"
        linkHref="/locations"
      />

      {/* 3. CLAYMORPHISM FEATURE CARDS GRID */}
      <section className="bg-[#F9F7F2] py-24 px-6 sm:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Card 1: Sourcing */}
            <div className="flex flex-col gap-6 p-10 rounded-[3rem] bg-[#F9F7F2] 
                            shadow-[20px_20px_60px_#e1dfda,-20px_-20px_60px_#ffffff,inset_-10px_-10px_20px_rgba(73,54,39,0.03),inset_10px_10px_20px_rgba(255,255,255,0.8)] 
                            transition-all duration-500 hover:translate-y-[-8px]">
              <div className="w-16 h-16 rounded-2xl bg-[#493627]/5 flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <span className="material-symbols-outlined text-[#493627] text-4xl">eco</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#493627]">Sourcing</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Partnering directly with farmers to ensure quality and equity in every single harvest.
              </p>
            </div>

            {/* Card 2: Space (Shorted from Design Forward) */}
            <div className="flex flex-col gap-6 p-10 rounded-[3rem] bg-[#F9F7F2] 
                            shadow-[20px_20px_60px_#e1dfda,-20px_-20px_60px_#ffffff,inset_-10px_-10px_20px_rgba(73,54,39,0.03),inset_10px_10px_20px_rgba(255,255,255,0.8)] 
                            transition-all duration-500 hover:translate-y-[-8px]">
              <div className="w-16 h-16 rounded-2xl bg-[#493627]/5 flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <span className="material-symbols-outlined text-[#493627] text-4xl">architecture</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#493627]">Space</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Our locations are designed to inspire focus and tranquility through minimal aesthetics.
              </p>
            </div>

            {/* Card 3: Community */}
            <div className="flex flex-col gap-6 p-10 rounded-[3rem] bg-[#F9F7F2] 
                            shadow-[20px_20px_60px_#e1dfda,-20px_-20px_60px_#ffffff,inset_-10px_-10px_20px_rgba(73,54,39,0.03),inset_10px_10px_20px_rgba(255,255,255,0.8)] 
                            transition-all duration-500 hover:translate-y-[-8px]">
              <div className="w-16 h-16 rounded-2xl bg-[#493627]/5 flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <span className="material-symbols-outlined text-[#493627] text-4xl">group</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#493627]">Community</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Building meaningful connections over every cup, fostering a space for shared rituals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY QUOTE */}
      <section className="w-full py-20">
        <div className="flex flex-col items-center gap-12">
          <div className="w-full h-[500px] bg-center bg-cover" style={{ backgroundImage: `url("/commontimehero.png")` }} />
          <div className="max-w-3xl px-6 text-center">
            <h2 className="text-slate-900 tracking-tight text-3xl sm:text-4xl font-bold leading-tight italic">
              "Design is not just what it looks like and feels like. Design is how it works."
            </h2>
            <p className="mt-4 text-[#493627] font-bold tracking-[0.2em] uppercase text-sm">
              — Our Philosophy
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}