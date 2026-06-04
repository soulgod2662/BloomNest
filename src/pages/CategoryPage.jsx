import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import products from "../data/products"
import { Link } from "react-router-dom"
import { db } from "../firebase/firebase"

import {
  collection,
  getDocs
} from "firebase/firestore"

function CategoryPage() {
  const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)

  const { categoryName } = useParams()
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
const categoryMap = {

  rugs: "Rugs & Carpets",

  "kitchen-decor":
    "Kitchen Decor",

  "wall-decor":
    "Wall Decor",

  lighting:
    "Lighting",

  furniture:
    "Furniture",

  "green-living":
    "Planters & Gardening"

}

  const filteredProducts =
  products.filter(
    product =>
      product.category ===
      categoryMap[
        categoryName
      ]
  )
  if (loading) {

  return (

    <div className="pt-40 text-center text-2xl">

      Loading Products...

    </div>

  )
}
  return (
    <section className="min-h-screen pt-44 pb-20 px-6 bg-gray-100">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 capitalize text-gray-800">
          {categoryMap[categoryName]}
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

  <Link
    key={product.id}
    to={`/product/${product.id}`}
  >

    <div
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
    >

      <div className="overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover hover:scale-110 transition duration-700"
        />

      </div>

      <div className="p-6">

        <h3 className="text-2xl font-semibold text-gray-800 mb-3 select-none">
          {product.name}
        </h3>

        <p className="text-xl font-bold text-gray-900 select-none">
          ₹{product.price}
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

export default CategoryPage