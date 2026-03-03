import SplitSection from "../components/editorial/SplitSection";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <SplitSection
        label="Our Story"
        headline="We believe in the beauty of the pause."
        body="Common Time is made for the moments between. We've always dreamt of building a brand that imagines coffee as a lifestyle. Everything you see, taste, and feel here has been thoughtfully created to offer an experience that feels universal – yet always remains rooted in great products. We imagine coffee for both purists and tourists. While we spend time perfecting the details – from the beans to the milk to the exact steaming temperature – we don't believe in overwhelming you. The best coffee, after all, is the one you enjoy most. Our bakes will keep evolving – always well done, balanced, and never too sweet. This is just the beginning."
        image="/newshero.jpg"
        imagePosition="right"
        linkText="Visit our locations"
        linkHref="/locations"
      />

      <section className="py-20 md:py-28 bg-[#fafaf8]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-wider text-gray-500">
            Our Philosophy
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-8">
          <h2 className="text-xl font-medium text-gray-900">
            Ethically Sourced
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Partnering directly with farmers to ensure quality and equity in every single harvest.
          </p>
          <h2 className="text-xl font-medium text-gray-900">
            Design Forward
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our locations are designed to inspire focus and tranquility through minimal aesthetics.
          </p>
          <h2 className="text-xl font-medium text-gray-900">
            Community First
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Building meaningful connections over every cup, fostering a space for collaboration.
          </p>
        </div>
      </section>
    </main>
  );
}
