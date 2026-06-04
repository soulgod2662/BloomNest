import { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import { db } from "../firebase/firebase"

import {
  doc,
  getDoc
} from "firebase/firestore"



import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore"

function Checkout() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { cartItems, clearCart } = useContext(CartContext)
  const handleSubmit = async (e) => {

  e.preventDefault()

  try {

    const orderData = {

      userId: user.uid,

      customerName: formData.name,

      email: formData.email,

      phone: formData.phone,

      address: formData.address,

      city: formData.city,

      state: formData.state,

      pincode: formData.pincode,

      paymentMethod: formData.payment,

      items: cartItems,

      total: totalPrice,

      status: "Processing",
      

      createdAt: serverTimestamp(),

    }

    await addDoc(
      collection(
        db,
        "orders"
      ),
      orderData
    )

    clearCart()

    navigate(
      "/order-success"
    )

  } catch (error) {

    console.error(error)

  }
}

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  })
  useEffect(() => {

  const fetchProfile = async () => {

    if (!user) return

    const docRef = doc(
      db,
      "users",
      user.uid
    )

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {

      const data = docSnap.data()

      setFormData((prev) => ({
        ...prev,
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
      }))
    }
  }

  fetchProfile()

}, [user])

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="min-h-screen pt-44 pb-20 px-6 bg-gray-100">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-lg">

          <h1 className="text-4xl font-bold mb-8">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phone}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />

            <textarea
  name="address"
  placeholder="Delivery Address"
  onChange={handleChange}
  value={formData.address}
  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
  rows="4"
  required
/>

            <div className="grid md:grid-cols-3 gap-4">

              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="PIN Code"
                onChange={handleChange}
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />

            </div>

            <div>

              <label className="block mb-3 font-semibold">
                Payment Method
              </label>

              <select
                name="payment"
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              >
                <option value="COD">
                  Cash on Delivery
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="CARD">
                  Credit / Debit Card
                </option>
              </select>

            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-2xl text-lg transition"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-3xl shadow-lg h-fit">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

          </div>

          <hr className="my-6" />

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>₹{totalPrice}</span>

          </div>
        </div>

      </div>

    </section>
  )
}

export default Checkout