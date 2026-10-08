import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiPlusCircle, FiList, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";

const Menu = () => {
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
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 transition-all duration-150">
      {user && (
        <div className="px-4 py-2 border-b border-slate-100">
          <p className="text-xs font-medium text-slate-400">Signed in as</p>
          <p className="text-sm font-semibold text-slate-800 truncate">{user.username}</p>
        </div>
      )}

      <div className="py-1">
        {!user && (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <FiLogIn className="text-base text-slate-400" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <FiUserPlus className="text-base text-slate-400" />
              <span>Register</span>
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to={"/profile/" + user._id}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <FiUser className="text-base text-slate-400" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/write"
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <FiPlusCircle className="text-base text-slate-400" />
              <span>Report Item</span>
            </Link>
            <Link
              to={"/myposts/" + user._id}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <FiList className="text-base text-slate-400" />
              <span>My Posts</span>
            </Link>

            <div className="my-1 border-t border-slate-100"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
            >
              <FiLogOut className="text-base text-rose-500" />
              <span>Sign out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
