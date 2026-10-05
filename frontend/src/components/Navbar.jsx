import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaUserCircle } from "react-icons/fa";
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

  const handleTabClick = (type) => {
    const params = new URLSearchParams();
    if (prompt.trim()) params.set("search", prompt.trim());
    params.set("type", type);
    navigate(`/Electronic?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">

        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          <Link to="/Electronic" className="hover:opacity-80 transition">
            🔍 Lost & Found
          </Link>
        </h1>

        {/* SEARCH + FILTER */}
        {path === "/Electronic" && (
          <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">

            {/* Tabs */}
            <button
              onClick={() => handleTabClick("lost")}
              className="px-3 py-1 bg-white/90 text-red-600 font-semibold rounded-full hover:bg-white"
            >
              Lost
            </button>

            <button
              onClick={() => handleTabClick("found")}
              className="px-3 py-1 bg-white/90 text-green-600 font-semibold rounded-full hover:bg-white"
            >
              Found
            </button>

            {/* Search Box */}
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-sm">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="px-4 py-2 outline-none text-gray-700 w-40 md:w-56"
                placeholder="Search posts..."
                type="text"
              />
              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
              >
                <BsSearch />
              </button>
            </div>
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* ADMIN BUTTON */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Admin
            </Link>
          )}

          {/* WRITE / LOGIN */}
          {user ? (
            <Link
              to="/write"
              className="text-white font-medium hover:underline"
            >
              Write
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white font-medium hover:underline"
            >
              Login
            </Link>
          )}

          {/* PROFILE / MENU */}
          {user ? (
            <div className="relative">
              <button
                onClick={showMenu}
                className="flex items-center gap-2 text-white hover:opacity-80"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden md:block">{user.username}</span>
              </button>

              {menu && <Menu />}
            </div>
          ) : (
            <Link
              to="/register"
              className="text-white font-medium hover:underline"
            >
              Register
            </Link>
          )}

          {/* MOBILE MENU */}
          <div
            onClick={showMenu}
            className="md:hidden text-white text-xl cursor-pointer"
          >
            <FaBars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;