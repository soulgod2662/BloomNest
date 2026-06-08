import { useState, useContext } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { CartContext } from "../context/CartContext"
import { Link, useLocation } from "react-router-dom"
import { FaChevronDown } from "react-icons/fa"
import logo from "../assets/BloomNest_transparent.png"
import { AuthContext } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"


function Navbar() {
  const { user } = useContext(AuthContext)
  const { cartItems } = useContext(CartContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()

  const isHomePage = location.pathname === "/"
  const handleLogout = async () => {

  try {

    await signOut(auth)

  } catch (error) {

    console.log(error)

  }

}

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#faf7f2] shadow-lg z-50 border-b border-gray-100">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-3">

        <div className="select-none flex items-center">
  
  <img
    src={logo}
    alt="BloomNest Logo"
    className="h-24 md:h-28 object-contain"
    draggable="false"
  />

</div>

        {/* Desktop Menu */}
<ul className="hidden md:flex gap-8 text-lg font-medium text-gray-800 items-center select-none">

  {isHomePage && (
    <>
      <li>
        <a
          href="#home"
          className="hover:text-amber-700 transition"
        >
          Home
        </a>
      </li>

      <li>
        <a
          href="#gallery"
          className="hover:text-amber-700 transition"
        >
          Gallery
        </a>
      </li>

      <li>
        <a
          href="#about"
          className="hover:text-amber-700 transition"
        >
          About
        </a>
      </li>

      <li className="relative group">

        <div className="flex items-center gap-2 cursor-pointer hover:text-amber-700 transition">

          <a href="#products">
            Products
          </a>

          <FaChevronDown className="text-sm" />

        </div>

        <div className="absolute top-full left-0 pt-3 bg-[#faf7f2] shadow-xl rounded-2xl py-4 w-56 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">

          <Link
            to="/category/rugs"
            className="block px-6 py-3 hover:bg-gray-100"
          >
            Rugs & Carpets
          </Link>

          <Link
            to="/category/kitchen-decor"
            className="block px-6 py-3 hover:bg-gray-100"
          >
            Kitchen Decor
          </Link>

          <Link
            to="/category/wall-decor"
            className="block px-6 py-3 hover:bg-gray-100"
          >
            Wall Decor
          </Link>

          <Link
            to="/category/lighting"
            className="block px-6 py-3 hover:bg-gray-100"
          >
            Lighting
          </Link>

          <Link
            to="/category/green-living"
            className="block px-6 py-3 hover:bg-gray-100"
          >
            Green Living
          </Link>

          <Link
            to="/category/furniture"
            className="block px-6 py-3 hover:bg-gray-100"
          >
            Furniture
          </Link>

        </div>

      </li>

      <li>
        <a
          href="#contact"
          className="hover:text-amber-700 transition"
        >
          Contact
        </a>
      </li>
    </>
  )}

  {!isHomePage && (
    <li>
      <Link
        to="/"
        className="hover:text-amber-700 transition"
      >
        Back to Home
      </Link>
    </li>
  )}

  {!user ? (
    <>
      <li>
        <Link
          to="/login"
          className="hover:text-amber-700 transition"
        >
          Login
        </Link>
      </li>

      <li>
        <Link
          to="/signup"
          className="hover:text-amber-700 transition"
        >
          Sign Up
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="text-amber-700 font-semibold max-w-[180px] truncate">
        {user.email?.split("@")[0]}
      </li>

      <li>
        <Link
          to="/profile"
          className="hover:text-amber-700 transition"
        >
          Profile
        </Link>
      </li>

      <li>
        <Link
          to="/orders"
          className="hover:text-amber-700 transition"
        >
          My Orders
        </Link>
      </li>

      <li>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </li>
    </>
  )}

  <li>
    <Link
      to="/cart"
      className="bg-amber-600 text-white px-5 py-2 rounded-xl hover:bg-amber-700 transition"
    >
      Cart ({cartItems.length})
    </Link>
  </li>

</ul>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-6">

          <ul className="flex flex-col gap-6 text-lg font-medium text-gray-800">

            {isHomePage && (
              <>
                <li>
                  <a href="#home" onClick={() => setMenuOpen(false)}>
                    Home
                  </a>
                </li>

                <li>
                  <a href="#gallery" onClick={() => setMenuOpen(false)}>
                    Gallery
                  </a>
                </li>

                <li>
                  <a href="#about" onClick={() => setMenuOpen(false)}>
                    About
                  </a>
                </li>

                <li>
                  <a href="#products" onClick={() => setMenuOpen(false)}>
                    Products
                  </a>
                </li>

                <li>
                  <a href="#contact" onClick={() => setMenuOpen(false)}>
                    Contact
                  </a>
                </li>
              </>
            )}

            {!isHomePage && (
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                >
                  Back to Home
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="bg-amber-600 text-white px-5 py-3 rounded-xl text-center focus:outline-none"
              >
                Cart ({cartItems.length})
              </Link>
            </li>

          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar