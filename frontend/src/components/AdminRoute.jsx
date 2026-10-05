import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext)

  // 🔥 WAIT until user loads
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute