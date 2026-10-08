import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { FiUser, FiMail, FiLock, FiUserPlus, FiAlertCircle } from "react-icons/fi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      if (!email.includes("@")) {
        return alert("Enter a valid email");
      }
      if (password.length < 8) {
        return alert("Password must be 8 digit long");
      }
      setLoading(true);
      setError(false);
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
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
              <FiUserPlus />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join the campus community to report and claim lost belongings.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUser className="text-sm" />
                </div>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  type="text"
                  required
                  placeholder="e.g. john_doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Campus Email
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
                  placeholder="Minimum 8 characters"
                />
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs">
                <FiAlertCircle className="shrink-0 text-sm" />
                <span>Registration failed. Email or username might already be in use.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition active:scale-95"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
