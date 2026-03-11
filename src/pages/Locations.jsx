export default function Locations() {
  const locations = [
    {
      city: "Lodhi Colony, Delhi",
      description: "Our minimalist flagship blending Amsterdam’s bakery culture with Japanese precision in Meherchand Market.",
      address: "Shop 2–3, Meherchand Market, Lodhi Colony, New Delhi 110003",
      hours: "Mon–Sun: 8:00 AM – 10:00 PM",
      imageUrl: "/locations/IMG_4886.JPG", // Add your image paths here
    },
    {
      city: "Vasant Vihar, Delhi",
      description: "A sleek neighborhood retreat in Basant Lok, serving artisan brews and refined bakes to a creative community.",
      address: "Basant Lok Market, Vasant Vihar, New Delhi 110057",
      hours: "Mon–Sun: 8:00 AM – 10:00 PM",
      imageUrl: "/locations/IMG_4720.JPG",
    },
    {
      city: "Khan Market, Delhi",
      description: "A sleek neighborhood retreat in Basant Lok, serving artisan brews and refined bakes to a creative community.",
      address: "Coming Soon",
      hours: "Mon–Sun: 8:00 AM – 10:00 PM",
      imageUrl: "/locations/huma-kabakci-oRk4Ep65tRc-unsplash.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {locations.map((loc, index) => (
        <section key={index} className="flex flex-col mb-20 md:mb-32">
          
          {/* 1. Full-Width Image: 65% of screen height */}
          <div className="w-full lg:h-[95vh] h-65 overflow-hidden bg-gray-100">
            <img 
              src={loc.imageUrl} 
              alt={loc.city} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2. Arranged Content Container */}
          <div className="max-w-[1200px] mx-auto w-full px-4 md:px-6 mt-12 md:mt-16">
            
            {/* Title stays on top as requested by the visual flow */}
            <h2 className="text-4xl md:text-6xl font-[Bai_Jamjuree] text-gray-900 mb-10 tracking-tight">
              {loc.city}
            </h2>

            <div className="grid grid-cols-1 font-[Garet_Book] lg:grid-cols-2 gap-12">
              
              {/* Left Column: Description */}
              <div className="flex flex-col">
                <p className="text-gray-600 leading-relaxed max-w-[60ch]">
                  {loc.description}
                </p>
              </div>

              {/* Right Column: Address, Hours, and Map */}
              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Address
                    </p>
                    <p className="text-gray-900 mb-6">{loc.address}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Hours
                    </p>
                    <p className="text-gray-900">{loc.hours}</p>
                  </div>
                </div>

                {/* Map placeholder rearranged to fit the side column
                <div className="mt-8 w-full h-64 bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  Map placeholder
                </div> */}
              </div>

            </div>
          </div>
        </section>
      ))}
    </main>
  );
}