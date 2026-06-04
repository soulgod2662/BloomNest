import { motion } from "framer-motion"

import { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs
} from "firebase/firestore"

function Products() {
    const [products, setProducts] = useState([])
    useEffect(() => {

  const fetchProducts = async () => {

  setLoading(true)

  const snapshot = await getDocs(
    collection(db, "products")
  )

  const productsData =
    snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

  setProducts(productsData)

  setLoading(false)
}

  fetchProducts()

}, [])
    const { addToCart } = useContext(CartContext)
    const [loading, setLoading] =
  useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
)
if (loading) {

  return (

    <div className="pt-40 text-center text-2xl">

      Loading Products...

    </div>

  )
}
  return (
    <section
      id="products"
      className="py-20 px-6 md:px-10 bg-gray-100"
    >
      <div className="text-center mb-16">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Shop Our Collection
        </h2>

        <p className="text-gray-600 text-lg">
          Premium decor pieces curated for elegant living.
        </p>
      </div>
      <div className="max-w-xl mx-auto mb-12">

  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-4 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
</div>
{filteredProducts.length === 0 && (

  <div className="text-center mb-12">

    <h3 className="text-2xl font-semibold text-gray-700">
      No products found
    </h3>

    <p className="text-gray-500 mt-2">
      Try another search term.
    </p>

  </div>

)}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (
  <Link
    key={product.id}
    to={`/product/${product.id}`}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
    >

      <div className="overflow-hidden relative">
        <img
          
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover hover:scale-110 transition duration-700"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-amber-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-6">

        <p className="text-sm text-amber-700 mb-2">
          {product.category}
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-3 select-none">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">

          <p className="text-xl font-bold text-gray-900 select-none">
            ₹{product.price}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)

toast.success("Added to Cart!")
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-xl transition"
          >
            Add to Cart
          </button>

        </div>
      </div>

    </motion.div>
  </Link>
))}
      </div>
    </section>
  )
}

export default Products