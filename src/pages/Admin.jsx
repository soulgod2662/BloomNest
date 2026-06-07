import { useEffect, useState } from "react"

import { db } from "../firebase/firebase"

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  deleteDoc
} from "firebase/firestore"

function Admin() {
    
    const handleDeleteProduct =
  async (productId) => {

    try {

      await deleteDoc(
        doc(
          db,
          "products",
          productId
        )
      )

      setProducts(
        products.filter(
          product =>
            product.id !==
            productId
        )
      )

    } catch (error) {

      console.log(error)

    }
}
    const handleAddProduct = async (e) => {
        if (editingProduct) {

  await updateDoc(
    doc(
      db,
      "products",
      editingProduct.id
    ),
    {
      ...productData,
      price: Number(
        productData.price
      )
    }
  )

  setProducts(
    products.map(product =>
      product.id ===
      editingProduct.id
        ? {
            ...product,
            ...productData,
            price: Number(
              productData.price
            )
          }
        : product
    )
  )

  setEditingProduct(null)

  setProductData({
    name: "",
    price: "",
    category: "",
    description: ""
  })

  alert("Product Updated!")

  return
}

  e.preventDefault()

  try {

    const formData = new FormData()

    formData.append(
      "file",
      imageFile
    )

    formData.append(
      "upload_preset",
      "bloomnest_products"
    )

    const cloudinaryResponse =
      await fetch(
        "https://api.cloudinary.com/v1_1/dwttgdnvg/image/upload",
        {
          method: "POST",
          body: formData
        }
      )

    const cloudinaryData =
      await cloudinaryResponse.json()

    await addDoc(
      collection(
        db,
        "products"
      ),
      {
        ...productData,

        price: Number(
          productData.price
        ),

        image:
          cloudinaryData.secure_url,

        createdAt:
          serverTimestamp()
      }
    )

    alert(
      "Product Added!"
    )

    setProductData({
      name: "",
      price: "",
      category: "",
      description: "",
    })

    setImageFile(null)

  } catch (error) {

    console.log(error)

  }

}
  const [productData, setProductData] = useState({
  name: "",
  price: "",
  category: "",
  description: "",
})

const [imageFile, setImageFile] = useState(null)
const [products, setProducts] = useState([])
const [editingProduct, setEditingProduct] = useState(null)
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
}
  const [orders, setOrders] = useState([])
  const updateOrderStatus = async (
  orderId,
  newStatus
) => {

  try {

    await updateDoc(
      doc(
        db,
        "orders",
        orderId
      ),
      {
        status: newStatus
      }
    )

    setOrders(
      orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus
            }
          : order
      )
    )

  } catch (error) {

    console.log(error)

  }

}

  useEffect(() => {
    fetchProducts()
    const fetchOrders = async () => {

      const snapshot = await getDocs(
        collection(db, "orders")
      )

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setOrders(data)
    }

    fetchOrders()

  }, [])

  return (

    <section className="min-h-screen pt-40 pb-20 px-6 bg-gray-100">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-lg text-gray-500">
              Total Orders
            </h2>

            <p className="text-4xl font-bold mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-lg text-gray-500">
              Revenue
            </h2>

            <p className="text-4xl font-bold mt-2">
              ₹{
                orders.reduce(
                  (total, order) =>
                    total + order.total,
                  0
                )
              }
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-lg text-gray-500">
              Customers
            </h2>

            <p className="text-4xl font-bold mt-2">
              {
                new Set(
                  orders.map(
                    order => order.userId
                  )
                ).size
              }
            </p>
          </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-10">

  {/* Product Form */}

  <div className="bg-white p-8 rounded-3xl shadow-lg">

    <h2 className="text-3xl font-bold mb-6">
      {editingProduct ? "Edit Product" : "Add Product"}
    </h2>

    <form
      onSubmit={handleAddProduct}
      className="space-y-4"
    >

      <input
        type="text"
        placeholder="Product Name"
        value={productData.name}
        onChange={(e) =>
          setProductData({
            ...productData,
            name: e.target.value
          })
        }
        className="w-full border p-4 rounded-xl"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) =>
          setProductData({
            ...productData,
            price: e.target.value
          })
        }
        className="w-full border p-4 rounded-xl"
        required
      />

      <select
  value={productData.category}
  onChange={(e) =>
    setProductData({
      ...productData,
      category: e.target.value
    })
  }
  className="w-full border p-4 rounded-xl"
>
  <option value="">Select Category</option>
  <option value="rugs">Rugs & Carpets</option>
  <option value="kitchen-decor">Kitchen Decor</option>
  <option value="wall-decor">Wall Decor</option>
  <option value="lighting">Lighting</option>
  <option value="green-living">Green Living</option>
  <option value="furniture">Furniture</option>
</select>

      <textarea
        placeholder="Description"
        value={productData.description}
        onChange={(e) =>
          setProductData({
            ...productData,
            description: e.target.value
          })
        }
        className="w-full border p-4 rounded-xl"
        rows="4"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImageFile(
            e.target.files[0]
          )
        }
      />

      <button
        type="submit"
        className="bg-amber-600 text-white px-6 py-3 rounded-xl"
      >
        {editingProduct
          ? "Update Product"
          : "Add Product"}
      </button>

    </form>

  </div>

  {/* Product List */}

  <div className="bg-white p-8 rounded-3xl shadow-lg">

    <h2 className="text-3xl font-bold mb-6">
      All Products
    </h2>

    <div className="space-y-4">

      {products.map((product) => (

        <div
          key={product.id}
          className="flex justify-between items-center border rounded-2xl p-4"
        >

          <img
  src={product.image}
  alt={product.name}
  className="w-16 h-16 object-cover rounded-xl"
/>

          <div className="flex gap-2">

            <button
              onClick={() => {

                setEditingProduct(product)

                setProductData({
                  name: product.name,
                  price: product.price,
                  category: product.category,
                  description: product.description
                })

              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDeleteProduct(product.id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
          
    <div className="bg-white rounded-3xl shadow-lg p-8">
  <h2 className="text-3xl font-bold mb-6">
    Recent Orders
  </h2>

  <div className="space-y-4">

    {orders.map((order) => (

      <div
        key={order.id}
        className="border rounded-2xl p-5"
      >
        {order.createdAt?.toDate().toLocaleDateString()}

        <p>
          <strong>Order ID:</strong> {order.id}
        </p>

        <p>
          <strong>Customer:</strong> {order.name}
        </p>

        <p>
          <strong>Email:</strong> {order.email}
        </p>

        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>

        <p>
          <strong>Payment:</strong> {order.payment}
        </p>

        <div className="mt-3">

  <label className="font-semibold">
    Status
  </label>

  <select
    value={
      order.status ||
      "Processing"
    }
    onChange={(e) =>
      updateOrderStatus(
        order.id,
        e.target.value
      )
    }
    className="
      block
      mt-2
      border
      rounded-xl
      px-4
      py-2
    "
  >

    <option value="Processing">
      Processing
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Delivered">
      Delivered
    </option>

    <option value="Cancelled">
      Cancelled
    </option>

  </select>

</div>

      </div>

    ))}

  </div>

</div>

        </div>

    </section>
  )
}

export default Admin