import { motion } from "framer-motion"
import heroImage from "../assets/hero.jpg"

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-white px-6 pt-40 max-w-4xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8">
          Elevate Your
          <br />
          Living Space
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-8 mb-10">
          Discover elegant home decor crafted to bring warmth,
          sophistication, and timeless beauty into your interiors.
        </p>

        <a
          href="#products"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-2xl text-lg transition duration-300 shadow-xl"
        >
          Explore Collection
        </a>
      </motion.div>
    </section>
  )
}

export default Hero