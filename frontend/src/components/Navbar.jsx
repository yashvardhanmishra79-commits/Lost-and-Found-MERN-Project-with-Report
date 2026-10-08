import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => setMenu(!menu);

  const handleSearch = () => {
    if (prompt.trim()) {
      navigate(`/Electronic?search=${encodeURIComponent(prompt.trim())}`);
    } else {
      navigate("/Electronic");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTabClick = (type) => {
    const params = new URLSearchParams();
    if (prompt.trim()) params.set("search", prompt.trim());
    params.set("type", type);
    navigate(`/Electronic?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">

        {/* LOGO */}
        <div className="flex items-center gap-6">
          <Link to="/Electronic" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-blue-700 transition">
              <BsSearch className="text-xs" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition">
                Campus <span className="text-blue-600">Lost & Found</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Community Portal
              </span>
            </div>
          </Link>
        </div>

        {/* SEARCH + FILTER (Only on /Electronic) */}
        {path === "/Electronic" && (
          <div className="flex-1 max-w-xl mx-2 hidden md:flex items-center justify-center gap-2">
            {/* Filter Quick Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleTabClick("lost")}
                className="px-2.5 py-1 text-rose-700 hover:bg-white rounded-md transition-all active:scale-95"
              >
                Lost
              </button>
              <div className="w-px h-3 bg-slate-300"></div>
              <button
                type="button"
                onClick={() => handleTabClick("found")}
                className="px-2.5 py-1 text-emerald-700 hover:bg-white rounded-md transition-all active:scale-95"
              >
                Found
              </button>
            </div>

            {/* Search Box */}
            <div className="flex-1 flex items-center bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white border border-slate-200 focus-within:border-blue-500 rounded-lg overflow-hidden transition focus-within:ring-2 focus-within:ring-blue-500/15">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-3 py-1.5 outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent w-full"
                placeholder="Search lost or found items..."
                type="text"
              />
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className="px-3 py-2 text-slate-400 hover:text-blue-600 transition"
              >
                <BsSearch className="text-xs" />
              </button>
            </div>
          </div>
        )}

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* ADMIN BADGE BUTTON */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
            >
              Admin Panel
            </Link>
          )}

          {/* POST / WRITE BUTTON */}
          {user ? (
            <Link
              to="/write"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition"
            >
              <FiPlus className="text-sm" />
              <span>Report Item</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-2 py-1 transition"
            >
              Login
            </Link>
          )}

          {/* USER PROFILE DROPDOWN */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={showMenu}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-slate-700 text-xs font-medium"
              >
                <FaUserCircle className="text-base text-slate-500" />
                <span className="hidden md:inline max-w-[100px] truncate">{user.username}</span>
                <FiChevronDown className="text-xs text-slate-400" />
              </button>

              {menu && <Menu />}
            </div>
          ) : (
            <Link
              to="/register"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
            >
              Register
            </Link>
          )}

          {/* MOBILE TOGGLE (When not logged in or on small screen) */}
          <button
            type="button"
            onClick={showMenu}
            aria-label="Toggle menu"
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            <FaBars className="text-base" />
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH & FILTER BAR (on /Electronic only) */}
      {path === "/Electronic" && (
        <div className="md:hidden px-4 pb-2.5 pt-1 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-3 py-1.5 outline-none text-xs text-slate-800 placeholder-slate-400 bg-transparent w-full"
                placeholder="Search items..."
                type="text"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="px-3 py-1.5 text-slate-500"
              >
                <BsSearch className="text-xs" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleTabClick("lost")}
                className="px-2.5 py-1.5 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg"
              >
                Lost
              </button>
              <button
                type="button"
                onClick={() => handleTabClick("found")}
                className="px-2.5 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg"
              >
                Found
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;