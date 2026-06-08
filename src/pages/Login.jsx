import { useState } from "react"
import { auth } from "../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Login() {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    if (!email || !password) {
      toast.error("Please enter email and password")
      return
    }

    setLoading(true)

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        )

      if (!userCredential.user.emailVerified) {

        await auth.signOut()

        toast.error(
          "Please verify your email before logging in."
        )

        setEmail("")
        setPassword("")

        return
      }

      toast.success(
        "Login Successful!"
      )

      navigate("/")

    } catch (error) {

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {

        toast.error(
          "Invalid email or password"
        )

      } else {

        toast.error(
          "Login failed. Please try again."
        )

      }

      setEmail("")
      setPassword("")

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  return (

    <section className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-8">
          Login
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>

    </section>

  )
}

export default Login