import { useState } from "react"
import { auth } from "../firebase/firebase"
import { db } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth"

import {
  doc,
  setDoc
} from "firebase/firestore"

import { toast } from "react-toastify"
import { Link } from "react-router-dom"


function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {

    e.preventDefault()
    setLoading(true)
    try {
      setLoading(false)
      const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
  await sendEmailVerification(
  userCredential.user
)
  alert(
  "Verification email sent. Please verify your email before logging in."
)

      await setDoc(
  doc(
    db,
    "users",
    userCredential.user.uid
  ),
  {
    email,
    name: "",
    phone: "",
    address: "",
    createdAt: new Date()
  }
)

      alert("Account Created!")
      toast.success(
  "Account Created Successfully!"
)

navigate("/")

    } catch (error) {

      alert(error.message)

    }

  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-8">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 border rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 border rounded-xl mb-6"
        />
        <p className="text-gray-500 text-sm mb-6">
  Password must be at least 6 characters.
</p>

        <button
  disabled={loading}
>
  {loading ? "Creating Account..." : "Sign Up"}
</button>
<div className="mt-6 text-center">

  <p className="text-gray-600">

    Already have an account?

    <Link
      to="/login"
      className="text-amber-600 ml-2 font-semibold"
    >
      Login
    </Link>

  </p>

</div>

      </form>

    </section>
  )
}

export default SignUp