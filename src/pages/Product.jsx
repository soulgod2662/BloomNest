import { useParams } from "react-router-dom"
import {
  useContext,
  useState,
  useEffect
} from "react"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs
} from "firebase/firestore"
import products from "../data/products"
import { CartContext } from "../context/CartContext"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

function ProductPage() {
  const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)

  const { id } = useParams()
  useEffect(() => {

  const fetchProducts = async () => {

    const snapshot = await getDocs(
      collection(
        db,
        "products"
      )
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

  const product = products.find(
  (item) => item.id === id
)
  const relatedProducts =
  product
    ? products
        .filter(
          (item) =>
            item.category ===
              product.category &&
            item.id !== product.id
        )
        .slice(0, 4)
    : []

  const { addToCart } = useContext(CartContext)

  const [quantity, setQuantity] = useState(1)
  if (loading) {

  return (

    <div className="pt-40 text-center text-2xl">

      Loading Product...

    </div>

  )
}
  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        Product not found
      </section>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success("Added to Cart!")
  }

  return (
    <section className="min-h-screen pt-44 pb-20 px-6 bg-gray-100">

      {product.badge && (
  <span className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
    {product.badge}
  </span>
)}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Product Image */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-2xl"
          />

        </div>

        {/* Product Info */}
        <div>

          <p className="text-amber-700 text-lg mb-3 capitalize select-none">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold text-gray-800 mb-6 select-none">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-gray-900 mb-8 select-none">
            ₹{product.price}
          </p>

          <p className="text-gray-600 text-lg leading-8 mb-10">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-5 mb-10">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              className="bg-white shadow px-5 py-3 rounded-xl text-xl"
            >
              -
            </button>

            <span className="text-2xl font-semibold select-none">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="bg-white shadow px-5 py-3 rounded-xl text-xl"
            >
              +
            </button>

          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-2xl text-lg transition shadow-lg"
          >
            Add To Cart
          </button>

        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24">

  <h2 className="text-4xl font-bold mb-10">
    You May Also Like
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {relatedProducts.map((item) => (

      <Link
        key={item.id}
        to={`/product/${item.id}`}
      >

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">

          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 object-cover"
          />

          <div className="p-6">

            <h3 className="text-xl font-semibold mb-3">
              {item.name}
            </h3>

            <p className="font-bold">
              ₹{item.price}
            </p>

          </div>

        </div>

      </Link>

    ))}

  </div>

</div>
    </section>
  )
}

export default ProductPage