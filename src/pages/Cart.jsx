import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"

function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext)

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <section className="min-h-screen py-32 px-6 bg-gray-100">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-12 text-gray-800">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <p className="text-xl text-gray-600">
            Your cart is empty.
          </p>

        ) : (

          <div className="space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-5">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 px-4 py-2 rounded-xl text-xl"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 px-4 py-2 rounded-xl text-xl"
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
                >
                  Remove
                </button>

              </div>
            ))}

            {/* Total Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

              <h2 className="text-3xl font-bold mb-6">
                Total: ₹{totalPrice}
              </h2>

              <Link
  to="/checkout"
  className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-2xl text-lg transition"
>
  Proceed to Checkout
</Link>

            </div>

          </div>
        )}
      </div>
    </section>
  )
}

export default Cart