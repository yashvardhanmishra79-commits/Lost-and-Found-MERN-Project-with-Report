import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      if (!email.includes("@")) {
        return alert("Enter a valid email");
      }
      if (password.length < 8) {
        return alert("Password must be 8 character long");
      }
      setLoading(true);
      setError(false);
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
      setUser(res.data);
      navigate("/Electronic");
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mx-auto mb-3 shadow-xs">
              <FiLogIn />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign in to manage and report campus belongings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail className="text-sm" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  type="email"
                  required
                  placeholder="student@campus.edu"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock className="text-sm" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  type="password"
                  minLength={8}
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs">
                <FiAlertCircle className="shrink-0 text-sm" />
                <span>Invalid email or password. Please try again.</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition active:scale-95"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>New to campus Lost &amp; Found? </span>
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
