import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt, FaComments, FaChartBar } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { URL } from "../../url";
const AdminLayout = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaChartBar /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Posts", path: "/admin/posts", icon: <FaFileAlt /> },
    { name: "Comments", path: "/admin/comments", icon: <FaComments /> },
  ];

  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
      // console.log(res)
      setUser(null)
      navigate("/login")

    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white p-5 shadow-xl">

        <h2 className="text-2xl font-bold mb-8 text-center">
          🚀 Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${location.pathname === item.path
                  ? "bg-white text-indigo-700 font-semibold"
                  : "hover:bg-white/20"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <span className="text-gray-600">👤 Admin</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;