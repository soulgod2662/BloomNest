function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-8">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        
        <div>
          <h2 className="text-3xl font-bold text-amber-500 mb-6">
            BloomNest
          </h2>

          <p className="text-gray-400 leading-7">
            Elegant home decor crafted to bring warmth,
            beauty, and timeless luxury into your living spaces.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#products" className="hover:text-white">Products</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>+91 99211 59036</li>
            <li>bloomnest.support@gmail.com</li>
            <li>Pune, Maharashtra</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">
            Follow Us
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
  <a
    href="https://www.instagram.com/bloomnest.shop/"
    target="_blank"
    rel="noreferrer"
    className="hover:text-white"
  >
    Instagram
  </a>
</li>
            <li>
  <a
    href="https://Facebook.com"
    target="_blank"
    rel="noreferrer"
    className="hover:text-white"
  >
    FaceBook
  </a>
</li>
            <li>
  <a
    href="https://pinterest.com"
    target="_blank"
    rel="noreferrer"
    className="hover:text-white"
  >
    Pinterest
  </a>
</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
        © 2026 BloomNest. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer