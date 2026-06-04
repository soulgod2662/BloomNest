function Contact() {
  return (
    <section 
    id="contact"
    className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-5xl font-bold mb-6 text-gray-800">
          Let’s Transform Your Space
        </h2>

        <p className="text-gray-600 text-lg mb-12">
          Connect with us for premium home decor solutions,
          personalized styling, and elegant interior inspiration.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl shadow-lg bg-amber-50">
            <h3 className="text-2xl font-semibold mb-4">
              Call Us
            </h3>

            <p className="text-gray-600">
              +91 99211 59036
            </p>
          </div>

          <div className="p-8 rounded-3xl shadow-lg bg-amber-50">
            <h3 className="text-2xl font-semibold mb-4">
              Email
            </h3>

            <p className="text-gray-600">
              hello@bloomnest.com
            </p>
          </div>

          <div className="p-8 rounded-3xl shadow-lg bg-amber-50">
            <h3 className="text-2xl font-semibold mb-4">
              Visit Us
            </h3>

            <p className="text-gray-600">
              Pune, Maharashtra
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="inline-block mt-12 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-2xl text-lg transition duration-300"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}

export default Contact