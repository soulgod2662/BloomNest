import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

function ProtectedRoute({ children }) {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {

    if (!user) {

      toast.warning(
        "Please login to continue"
      )

      navigate("/login")

    }

  }, [user, navigate])

  return user ? children : null
}

export default ProtectedRoute