import { useEffect, useState, useContext } from "react"

import { AuthContext } from "../context/AuthContext"

import { db } from "../firebase/firebase"

import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore"

function Orders() {

  const { user } = useContext(AuthContext)

  const [orders, setOrders] = useState([])

  useEffect(() => {

    const fetchOrders = async () => {

      if (!user) return

      console.log(
        "Current User UID:",
        user.uid
      )

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      )

      const querySnapshot =
        await getDocs(q)

      const ordersData =
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

      setOrders(ordersData)
    }

    fetchOrders()

  }, [user])

  return (

    <section className="min-h-screen pt-40 pb-20 px-6 bg-gray-100">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <h2 className="text-2xl font-semibold">
              No Orders Yet
            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-xl font-bold">
                      Order #{order.id.slice(0, 8)}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {
                        order.createdAt
                          ?.toDate()
                          .toLocaleDateString()
                      }
                    </p>

                    <p className="text-gray-500 mt-2">
                      ₹{order.total}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Payment:
                      {" "}
                      {order.payment}
                    </p>

                  </div>

                  <div>

                    {order.status ===
                      "Processing" && (
                      <span className="text-yellow-600 font-semibold">
                        🟡 Processing
                      </span>
                    )}

                    {order.status ===
                      "Shipped" && (
                      <span className="text-blue-600 font-semibold">
                        🚚 Shipped
                      </span>
                    )}

                    {order.status ===
                      "Delivered" && (
                      <span className="text-green-600 font-semibold">
                        ✅ Delivered
                      </span>
                    )}

                    {order.status ===
                      "Cancelled" && (
                      <span className="text-red-600 font-semibold">
                        ❌ Cancelled
                      </span>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  )
}

export default Orders