import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext)

  // 🔥 WAIT until user loads
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
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