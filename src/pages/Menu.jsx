import { useState, useRef, useEffect } from "react";
import { menuData as originalData } from "../data/menuData";

// --- CUSTOM UI COMPONENTS (STRUCTURE UNTOUCHED) ---
const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-10 mt-16 first:mt-0 font-[Bai_Jamjuree]">
    <div className="w-[5px] h-8 bg-black"></div>
    <h2 className="text-3xl font-light tracking-tight lowercase">{title}</h2>
  </div>
);

const MenuItem = ({ name, price, desc }) => (
  <div className="flex flex-col mb-12 relative font-[Bai_Jamjuree]" >
    <div className="flex items-start gap-2">
      <h3 className={`text-[24px] font-normal leading-tight lowercase`}>
        {name}
      </h3>
    </div>
    {desc && (
      <p className="text-[12px] text-black font-light mt-1 leading-snug max-w-[240px]">
        {desc}
      </p>
    )}
    <span className="text-[18px] font-normal mt-4 block">{price}</span>
    <div className="mt-6 border-b border-dotted border-gray-300 w-2/3"></div>
  </div>
);

const PageHeader = () => (
  <div className="flex w-full justify-between lg:pr-8 items-center mb-12 font-[Bai_Jamjuree]">
    <div className="lg:w-20 md:w-18 sm:w-16 w-12 lg:h-20 md:h-18 sm:h-16 h-12">
        <img src="/logo.jpg" alt="Logo" />
    </div>
    <h1 className="font-[Bai_Jamjuree] font-medium text-gray-900 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[32px]">COMMON <span className="font-light ">TIME</span></h1>
  </div>
);

const LANGUAGES = [
  { n: 'English', c: 'en' },
  { n: 'हिन्दी', c: 'hi' },

  { n: 'Afrikaans', c: 'af' },
  { n: 'Albanian', c: 'sq' },
  { n: 'Amharic', c: 'am' },
  { n: 'Arabic', c: 'ar' },
  { n: 'Armenian', c: 'hy' },
  { n: 'Azerbaijani', c: 'az' },
  { n: 'Basque', c: 'eu' },
  { n: 'Belarusian', c: 'be' },
  { n: 'Bengali', c: 'bn' },
  { n: 'Bosnian', c: 'bs' },
  { n: 'Bulgarian', c: 'bg' },
  { n: 'Catalan', c: 'ca' },
  { n: 'Cebuano', c: 'ceb' },
  { n: 'Chinese (Simplified)', c: 'zh-CN' },
  { n: 'Chinese (Traditional)', c: 'zh-TW' },
  { n: 'Corsican', c: 'co' },
  { n: 'Croatian', c: 'hr' },
  { n: 'Czech', c: 'cs' },
  { n: 'Danish', c: 'da' },
  { n: 'Dutch', c: 'nl' },
  { n: 'Esperanto', c: 'eo' },
  { n: 'Estonian', c: 'et' },
  { n: 'Filipino', c: 'tl' },
  { n: 'Finnish', c: 'fi' },
  { n: 'French', c: 'fr' },
  { n: 'Frisian', c: 'fy' },
  { n: 'Galician', c: 'gl' },
  { n: 'Georgian', c: 'ka' },
  { n: 'German', c: 'de' },
  { n: 'Greek', c: 'el' },
  { n: 'Gujarati', c: 'gu' },
  { n: 'Haitian Creole', c: 'ht' },
  { n: 'Hausa', c: 'ha' },
  { n: 'Hawaiian', c: 'haw' },
  { n: 'Hebrew', c: 'he' },
  { n: 'Hungarian', c: 'hu' },
  { n: 'Icelandic', c: 'is' },
  { n: 'Igbo', c: 'ig' },
  { n: 'Indonesian', c: 'id' },
  { n: 'Irish', c: 'ga' },
  { n: 'Italian', c: 'it' },
  { n: 'Japanese', c: 'ja' },
  { n: 'Javanese', c: 'jw' },
  { n: 'Kannada', c: 'kn' },
  { n: 'Kazakh', c: 'kk' },
  { n: 'Khmer', c: 'km' },
  { n: 'Kinyarwanda', c: 'rw' },
  { n: 'Korean', c: 'ko' },
  { n: 'Kurdish', c: 'ku' },
  { n: 'Kyrgyz', c: 'ky' },
  { n: 'Lao', c: 'lo' },
  { n: 'Latin', c: 'la' },
  { n: 'Latvian', c: 'lv' },
  { n: 'Lithuanian', c: 'lt' },
  { n: 'Luxembourgish', c: 'lb' },
  { n: 'Macedonian', c: 'mk' },
  { n: 'Malagasy', c: 'mg' },
  { n: 'Malay', c: 'ms' },
  { n: 'Malayalam', c: 'ml' },
  { n: 'Maltese', c: 'mt' },
  { n: 'Maori', c: 'mi' },
  { n: 'Marathi', c: 'mr' },
  { n: 'Mongolian', c: 'mn' },
  { n: 'Myanmar (Burmese)', c: 'my' },
  { n: 'Nepali', c: 'ne' },
  { n: 'Norwegian', c: 'no' },
  { n: 'Nyanja', c: 'ny' },
  { n: 'Odia', c: 'or' },
  { n: 'Pashto', c: 'ps' },
  { n: 'Persian', c: 'fa' },
  { n: 'Polish', c: 'pl' },
  { n: 'Portuguese', c: 'pt' },
  { n: 'Punjabi', c: 'pa' },
  { n: 'Romanian', c: 'ro' },
  { n: 'Russian', c: 'ru' },
  { n: 'Samoan', c: 'sm' },
  { n: 'Scots Gaelic', c: 'gd' },
  { n: 'Serbian', c: 'sr' },
  { n: 'Sesotho', c: 'st' },
  { n: 'Shona', c: 'sn' },
  { n: 'Sindhi', c: 'sd' },
  { n: 'Sinhala', c: 'si' },
  { n: 'Slovak', c: 'sk' },
  { n: 'Slovenian', c: 'sl' },
  { n: 'Somali', c: 'so' },
  { n: 'Spanish', c: 'es' },
  { n: 'Sundanese', c: 'su' },
  { n: 'Swahili', c: 'sw' },
  { n: 'Swedish', c: 'sv' },
  { n: 'Tajik', c: 'tg' },
  { n: 'Tamil', c: 'ta' },
  { n: 'Tatar', c: 'tt' },
  { n: 'Telugu', c: 'te' },
  { n: 'Thai', c: 'th' },
  { n: 'Turkish', c: 'tr' },
  { n: 'Turkmen', c: 'tk' },
  { n: 'Ukrainian', c: 'uk' },
  { n: 'Urdu', c: 'ur' },
  { n: 'Uyghur', c: 'ug' },
  { n: 'Uzbek', c: 'uz' },
  { n: 'Vietnamese', c: 'vi' },
  { n: 'Welsh', c: 'cy' },
  { n: 'Xhosa', c: 'xh' },
  { n: 'Yiddish', c: 'yi' },
  { n: 'Yoruba', c: 'yo' },
  { n: 'Zulu', c: 'zu' }
];

export default function Menu() {
  const [showSelector, setShowSelector] = useState(true);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(originalData);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const wheelRef = useRef(null);
  const [headers, setHeaders] = useState({
    hot: "hot coffee", iced: "iced coffee", pour: "pourover", matcha: "matcha",
    choc: "drinking chocolate", tea: "wellness loose leaf tea", refresh: "refreshers and sweet treats",
    bakes: "baked goods"
  });

  // --- FIX: Kill browser scroller (Far Right) and keep Header visible ---
  useEffect(() => {
    if (showSelector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showSelector]);

  // --- Initialize state on open to prevent blank scroller ---
  useEffect(() => {
    if (showSelector && wheelRef.current) {
      const timer = setTimeout(() => {
        const el = wheelRef.current;
        const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
        setScrollProgress(isNaN(progress) ? 0 : progress);
        setActiveIdx(Math.round(el.scrollTop / 80));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showSelector]);

  // --- Fast Response Scroll Tracking (requestAnimationFrame) ---
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const updateScroll = () => {
      window.requestAnimationFrame(() => {
        const idx = Math.round(el.scrollTop / 80);
        setActiveIdx(Math.max(0, Math.min(idx, LANGUAGES.length - 1)));
        const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
        setScrollProgress(progress);
      });
    };
    el.addEventListener("scroll", updateScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateScroll);
  }, [showSelector]);

  const translateMenu = async (targetLang) => {
    if (targetLang === "en") {
      setMenu(originalData);
      setHeaders({ hot: "hot coffee", iced: "iced coffee", pour: "pourover", matcha: "matcha", choc: "drinking chocolate", tea: "wellness loose leaf tea", refresh: "refreshers and sweet treats", bakes: "baked goods" });
      setShowSelector(false); return;
    }
    setLoading(true);
    const translatedData = JSON.parse(JSON.stringify(originalData));
    const categories = Object.keys(translatedData);
    let textBatch = ["hot coffee", "iced coffee", "pourover", "matcha", "drinking chocolate", "wellness loose leaf tea", "refreshers and sweet treats", "baked goods"];
    categories.forEach(cat => translatedData[cat].forEach(item => { textBatch.push(item.name); if (item.desc) textBatch.push(item.desc); }));
    
    try {
      const query = encodeURIComponent(textBatch.join(" [ ] "));
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${query}`;
      const response = await fetch(url);
      const result = await response.json();
      const translatedArray = result[0].map(x => x[0]).join("").split(" [ ] ");
      let index = 0;
      setHeaders({ hot: translatedArray[index++], iced: translatedArray[index++], pour: translatedArray[index++], matcha: translatedArray[index++], choc: translatedArray[index++], tea: translatedArray[index++], refresh: translatedArray[index++], bakes: translatedArray[index++] });
      categories.forEach(cat => translatedData[cat].forEach(item => { item.name = translatedArray[index++]?.trim(); if (item.desc) item.desc = translatedArray[index++]?.trim(); }));
      setMenu(translatedData);
      setShowSelector(false);
    } catch (e) { setShowSelector(false); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black font-sans pb-32 overflow-x-hidden">
      
      {/* 1. LUXURY SELECTOR OVERLAY (Fixed to respect Global Header) */}
      {showSelector && (
        <div className="fixed inset-0 top-[70px] md:top-[85px] bg-white z-[40] flex flex-col items-center justify-center overflow-hidden animate-fadeIn font-[Bai_Jamjuree]">
          
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gray-100 rounded-full blur-[120px] animate-pulse"></div>

          <div className="max-w-2xl w-full flex flex-col items-center px-6 relative z-10">
           
            
            <div className="flex items-center justify-center gap-12 mt-16 w-full h-[400px] relative">
              
              {/* --- HEAVY WEIGHTED INSTRUMENT SCROLLER --- */}
              <div className="flex flex-col items-center h-72 w-10 relative">
                {/* Thick Luxury Track */}
                <div className="w-[4px] h-full bg-black/10 rounded-full"></div>
                {/* Large Obsidian Indicator */}
                <div 
                    className="absolute w-4 h-4 bg-black rounded-full transition-all duration-150 ease-out left-1/2 -translate-x-1/2 shadow-2xl border-2 border-white"
                    style={{ top: `${scrollProgress * 100}%` }}
                ></div>
              </div>

              {/* Lens Wheel Picker */}
              <div className="relative w-80 h-full flex flex-col items-center">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-20 border-y border-black/[0.08] pointer-events-none bg-gray-50/30"></div>

                <div 
                  ref={wheelRef}
                  className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar mask-fade-edges py-40"
                >
                  {LANGUAGES.map((l, i) => {
                    const dist = Math.abs(i - activeIdx);
                    return (
                      <button
                        key={l.c}
                        onClick={() => translateMenu(l.c)}
                        disabled={loading}
                        className="w-full h-20 flex flex-col items-center justify-center snap-center transition-all duration-150 ease-out will-change-[transform,opacity,filter]"
                        style={{
                          opacity: dist === 0 ? 1 : Math.max(0.12, 1 - dist * 0.45),
                          transform: `scale(${dist === 0 ? 1.18 : 1 - dist * 0.15})`,
                          filter: dist === 0 ? 'none' : `blur(${dist * 1.2}px)`,
                          letterSpacing: dist === 0 ? '0.3em' : '0.05em'
                        }}
                      >
                        <span className="text-2xl font-light uppercase font-[Bai_Jamjuree]">
                          {l.n}
                        </span>
                        {dist === 0 && !loading && (
                          <div className="mt-4 flex gap-1 animate-fadeIn">
                             <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                             <div className="w-8 h-[1px] bg-black/30 self-center"></div>
                             <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          </div>
                        )}
                        {dist === 0 && loading && (
                          <div className="mt-4 w-5 h-5 border-[2px] border-black border-t-transparent rounded-full animate-spin"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-20 text-[10px] tracking-[1em] uppercase opacity-20 font-[Bai_Jamjuree]">
                International Menu
            </p>
          </div>
        </div>
      )}

      {/* --- MENU PAGES (STRUCTURE UNTOUCHED) --- */}
      <div className={`transition-all duration-1000 ease-in-out ${showSelector ? 'blur-3xl opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="max-w-[1400px] mx-auto px-12 pt-16">
          <PageHeader />
          <SectionHeader title={headers.hot} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8">
            {menu.hot_coffee.map((item, i) => <MenuItem key={i} {...item} />)}
          </div>

          <SectionHeader title={headers.iced} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8">
            {menu.iced_coffee.map((item, i) => <MenuItem key={i} {...item} />)}
            <div className="flex gap-8 mt-4 col-span-2 lg:col-span-2 notranslate font-[Bai_Jamjuree]">
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-[5px] h-8 bg-black"></div>
                    <span className="text-sm font-bold uppercase tracking-wider">Add:</span>
                 </div>
                 <ul className="text-[13px] space-y-1 text-gray-700">
                    <li>Milk lab oat/almond/coconut milk +80</li>
                    <li>Lactose free milk +0</li>
                    <li>Colombian decaf +100</li>
                 </ul>
              </div>
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-[5px] h-8 bg-black"></div>
                    <span className="text-sm font-bold uppercase tracking-wider">Make it:</span>
                 </div>
                 <ul className="text-[13px] space-y-1 text-gray-700">
                    <li>Extra hot</li>
                    <li>Half espresso shot</li>
                    <li>Extra espresso shot +30</li>
                 </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ... Rest of Page 2 & 3 Structures ... */}
        <div className="max-w-[1400px] mx-auto px-12 border-t border-gray-100 mt-10 pt-10 font-[Bai_Jamjuree]">
          <PageHeader />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
            <div>
              <SectionHeader title={headers.pour} />
              <div className="mb-16">
                <h3 className="text-[24px] font-normal mb-2">hot/iced</h3>
                <p className="text-[12px] text-black font-light mt-1 leading-snug max-w-[220px]">exceptional indian and international single origin coffee</p>
              </div>
              <SectionHeader title={headers.matcha} />
              <div className="grid grid-cols-2 gap-8 lg:gap-0">
                {menu.matcha.map((item, i) => <MenuItem key={i} {...item} />)}
              </div>
            </div>
            <div>
              <SectionHeader title={headers.tea} />
              <div className="grid grid-cols-2 gap-8 lg:gap-0">
                {menu.tea.map((item, i) => <MenuItem key={i} {...item} />)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-12 border-t border-gray-100 mt-10 pt-10 font-[Bai_Jamjuree]">
          <PageHeader />
          <SectionHeader title={headers.bakes} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8">
            {menu.baked_goods.map((item, i) => <MenuItem key={i} {...item} />)}
          </div>
          <div className="mt-24 flex justify-between items-end border-t pt-8">
            <div className="text-[11px] text-gray-400 tracking-widest uppercase font-[Bai_Jamjuree]">
              <p className="notranslate">@itscommontime | www.commontime.in</p>
              <p className="mt-2 notranslate">lodhi colony | vasant vihar | khan market</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM REFINED LANG BUTTON --- */}
      {!showSelector && (
        <button 
          onClick={() => setShowSelector(true)}
          className="fixed bottom-10 right-10 flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-black/10 px-8 py-4 rounded-full shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 group z-50"
        >
          <div className="w-2 h-2 bg-black rounded-full animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
          <span className="text-[11px] uppercase  font-bold text-black opacity-70 group-hover:opacity-100 font-[Bai_Jamjuree]">Change Language</span>
        </button>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-edges {
          mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>
    </main>
  );
}