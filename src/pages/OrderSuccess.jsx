import { Link } from "react-router-dom"

function OrderSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="bg-white shadow-xl rounded-3xl p-12 text-center max-w-xl w-full">

        <div className="text-6xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you for shopping with BloomNest.
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-100 rounded-2xl p-4 mb-8">

          <p className="text-gray-700">
            Order ID
          </p>

          <p className="font-bold text-xl">
            BN-{Math.floor(Math.random() * 100000)}
          </p>

        </div>

        <Link
          to="/"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-2xl transition"
        >
          Continue Shopping
        </Link>

      </div>

    </section>
  )
}

export default OrderSuccess