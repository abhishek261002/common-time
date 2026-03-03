export default function Locations() {
  const locations = [
    {
      city: "Kanpur",
      description: "Our Kanpur space blends design-led coffee with local craftsmanship. A sanctuary for those who appreciate the ritual of a well-made cup.",
      address: "123 MG Road, Kanpur, Uttar Pradesh",
      hours: "Mon–Fri: 9:00 AM – 6:00 PM",
    },
    {
      city: "Colombo",
      description: "Where tropical light meets precision roasting. A design-led coffee sanctuary overlooking the harbor, rooted in Sri Lankan coffee heritage.",
      address: "45 Galle Road, Colombo 3, Sri Lanka",
      hours: "Mon–Sun: 8:00 AM – 8:00 PM",
    },
    {
      city: "Kathmandu",
      description: "High-altitude origins meet minimalist design. Our Kathmandu space celebrates the intersection of Himalayan coffee and thoughtful ritual.",
      address: "Thamel, Kathmandu 44600, Nepal",
      hours: "Mon–Sat: 9:00 AM – 7:00 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {locations.map((loc) => (
        <section key={loc.city} className="border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              {loc.city}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="text-gray-600 leading-relaxed max-w-[60ch]">
                {loc.description}
              </p>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Address
                </p>
                <p className="text-gray-900 mb-6">{loc.address}</p>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Hours
                </p>
                <p className="text-gray-900">{loc.hours}</p>
                <div className="mt-8 w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  Map placeholder
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
