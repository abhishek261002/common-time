import { menuData } from "../data/menuData";

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-10 mt-16 first:mt-0 font-[Bai_Jamjuree]">
    <div className="w-[5px] h-8 bg-black"></div>
    <h2 className="text-3xl font-light tracking-tight lowercase">{title}</h2>
  </div>
);

const MenuItem = ({ name, price, desc, hasBullet }) => (
  <div className="flex flex-col mb-12 relative font-[Bai_Jamjuree]" >
    <div className="flex items-start gap-2">
      
      <h3 className={`text-[24px] font-normal leading-tight lowercase`}>
        {name}
      </h3>
    </div>
    {desc && (
      <p className="text-[12px] text-black font-light mt-1 leading-snug  max-w-[240px]">
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
       <img src="/logo.jpg" alt="" />
    </div>
    <h1 className="font-[Bai_Jamjuree] font-medium text-gray-900 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[32px]">COMMON <span className="font-light ">TIME</span></h1>
  </div>
);

export default function Menu() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-black selection:text-white pb-32">
      {/* PAGE 1: COFFEE */}
      <div className="max-w-[1400px] mx-auto px-12 pt-16">
        <PageHeader />
        <SectionHeader title="hot coffee" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {menuData.hot_coffee.map((item, i) => <MenuItem key={i} {...item} />)}
        </div>

        <SectionHeader title="iced coffee" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {menuData.iced_coffee.map((item, i) => <MenuItem key={i} {...item} />)}
          
          <div className="flex  gap-8 mt-4 col-span-2 lg:col-span-2">
            <div className="">
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

      {/* PAGE 2: TEA & SPECIALTIES */}
      <div className="max-w-[1400px] mx-auto px-12 border-t border-gray-100 mt-10 pt-10 font-[Bai_Jamjuree]">
        <PageHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
          <div>
            <SectionHeader title="pourover" />
            <div className="mb-16">
              <h3 className="text-[24px]  font-normal mb-2">hot/iced </h3>
              <p className="text-[12px] text-black font-light mt-1 leading-snug  max-w-[220px]">exceptional indian and international single origin seasonally rotating coffee, ask your server for current list</p>
            </div>
            <SectionHeader title="matcha" />
            <p className="text-[12px] text-black mb-8 font-light max-w-xs leading-snug tracking-tighter">Ceremonial grade matcha by our friends at yuzern. Our default matcha quantity is 4grams. We recommend that you try matcha with oatmilk.</p>
            <div className="grid grid-cols-2 gap-8 lg:gap-0">
              {menuData.matcha.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
            <SectionHeader title="drinking chocolate" />
            <div className="grid grid-cols-2 gap-8 lg:gap-0">
              {menuData.chocolate.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
          <div>
            <SectionHeader title="wellness loose leaf tea" />
            <div className="grid grid-cols-2 gap-8 lg:gap-0">
              {menuData.tea.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
            <SectionHeader title="refreshers and sweet treats" />
            <div className="grid grid-cols-2 gap-8 lg:gap-0">
              {menuData.refreshers.map((item, i) => <MenuItem key={i} {...item} />)}
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 3: BAKED GOODS */}
      <div className="max-w-[1400px] mx-auto px-12 border-t border-gray-100 mt-10 pt-10 font-[Bai_Jamjuree]">
        <PageHeader />
        <SectionHeader title="baked goods" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {menuData.baked_goods.map((item, i) => (
            <MenuItem key={i} {...item} />
          ))}
        </div>

        {/* Baked Goods Footer Notes */}
        <div className="mt-16 flex flex-col gap-4 text-[16px] text-gray-600 font-light">
          <p>*let your server know if you want the bakes heated up or served cold </p>
                    <div className="border-b border-dotted border-gray-300 w-24 my-2"></div>

          <p>*to know the available bakes at the moment, please have a look at the display counter </p>
          <div className="border-b border-dotted border-gray-300 w-24 my-2"></div>
          <p>*all baked goods are made fresh in our kitchen and arrive at 2 lots daily - 6am and 2pm </p>
        </div>

        {/* Bottom Contact Footer */}
        <div className="mt-24 flex justify-between items-end">
          <div className="text-[11px] text-gray-400 tracking-widest uppercase">
            <p>@itscommontime | www.commontime.in </p>
            <p className="mt-2">lodhi colony | vasant vihar | khan market </p>
          </div>
        </div>
      </div>
    </main>
  );
}