import { useState } from "react"
import { auth } from "../firebase/firebase"
import {
  signInWithEmailAndPassword
} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    

    e.preventDefault()
    setLoading(true)

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert("Logged In!")
      toast.success("Welcome Back!")
      navigate("/")
    } catch (error) {

      alert(error.message)

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
  disabled={loading}
  className="w-full bg-amber-600 text-white py-4 rounded-xl"
>
  {loading ? "Logging In..." : "Login"}
</button>


      </form>

    </section>
  )
}

export default Login