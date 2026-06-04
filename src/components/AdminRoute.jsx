import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

function AdminRoute({ children }) {

  const { user } = useContext(AuthContext)

  const adminEmail =
    "test5@gmail.com" // CHANGE THIS

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.email !== adminEmail) {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute