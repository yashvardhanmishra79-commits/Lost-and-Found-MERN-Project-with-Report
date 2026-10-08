import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt, FaComments, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut, FiArrowLeft, FiShield } from "react-icons/fi";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { URL } from "../../url";

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaChartBar /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Posts", path: "/admin/posts", icon: <FaFileAlt /> },
    { name: "Comments", path: "/admin/comments", icon: <FaComments /> },
  ];

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* BRAND */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <FiShield className="text-base" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight block">Admin Console</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                Campus Portal
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/Electronic"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <FiArrowLeft />
            <span>Back to Portal Feed</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <FaBars className="text-base" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              Campus Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Admin: {user?.username || "Authenticated"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;