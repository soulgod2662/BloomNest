function About() {
  return (
    <section 
    id="about"
    className="py-20 px-8 bg-amber-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-5xl font-bold mb-8 text-gray-800">
            Crafted For Beautiful Living
          </h2>

          <p className="text-gray-600 text-lg leading-8 mb-6">
            At BloomNest, we believe every home deserves warmth,
            elegance, and personality. Our carefully curated decor
            collection is designed to transform ordinary spaces into
            timeless interiors.
          </p>

          <p className="text-gray-600 text-lg leading-8">
            From modern accents to luxury-inspired pieces, we bring
            aesthetics and comfort together to help you create a home
            you truly love.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            alt="Luxury Interior"
            className="rounded-3xl shadow-2xl h-[450px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default About