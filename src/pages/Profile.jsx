import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

import { db } from "../firebase/firebase"

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

import { toast } from "react-toastify"

function Profile() {

  const { user } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const handleSave = async () => {

  try {

    await setDoc(
      doc(
        db,
        "users",
        user.uid
      ),
      {
        email: user.email,
        name,
        phone,
        address
      },
      {
        merge: true
      }
    )

    toast.success(
      "Profile Updated!"
    )

  } catch (error) {

    toast.error(
      error.message
    )

  }
}

  useEffect(() => {

  const fetchUserData = async () => {

    if (!user) return

    const docRef = doc(
      db,
      "users",
      user.uid
    )

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {

      const data = docSnap.data()

      setName(data.name || "")
      setPhone(data.phone || "")
      setAddress(data.address || "")

    }
  }

  fetchUserData()

}, [user])
return (

  <section className="min-h-screen bg-gray-100 pt-40 px-6">

    <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full p-4 border rounded-xl mb-4"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full p-4 border rounded-xl mb-4"
      />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
        className="w-full p-4 border rounded-xl mb-6 resize-none"
        rows="4"
      />

      <button
        onClick={handleSave}
        className="
          w-full
          bg-amber-600
          hover:bg-amber-700
          text-white
          py-4
          rounded-xl
        "
      >
        Save Changes
      </button>

    </div>

  </section>

)
}

export default Profile