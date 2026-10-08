import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiTrash2, FiSave, FiInbox, FiPlus, FiArrowLeft } from "react-icons/fi";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    setSaving(true);
    try {
      await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
      setTimeout(() => setUpdated(false), 4000);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    } finally {
      setSaving(false);
    }
  };

  const handleUserDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    try {
      await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [param, user]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BREADCRUMB */}
        <div className="mb-6">
          <Link
            to="/Electronic"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Campus Feed</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: POSTS LISTING */}
          <div className="w-full lg:w-[65%] order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">Your Reports</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {posts?.length || 0}
                </span>
              </div>
              <Link
                to="/write"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition"
              >
                <FiPlus />
                <span>New Report</span>
              </Link>
            </div>

            {posts && posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((p) => (
                  <ProfilePosts key={p._id} p={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center shadow-xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 text-xl mb-3">
                  <FiInbox />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">No reports yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                  You haven't reported any lost or found items.
                </p>
                <Link
                  to="/write"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FiPlus />
                  <span>Report an Item</span>
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT: ACCOUNT SETTINGS CARD */}
          <div className="w-full lg:w-[35%] order-1 lg:order-2 lg:sticky lg:top-20">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-xs">
                  {username ? username.charAt(0).toUpperCase() : <FiUser />}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {username || "User Profile"}
                  </h2>
                  <p className="text-xs text-slate-400 truncate max-w-[200px]">{email}</p>
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiUser className="text-sm" />
                  </div>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    placeholder="Your Username"
                    type="text"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiMail className="text-sm" />
                  </div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    placeholder="Your Email"
                    type="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiLock className="text-sm" />
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    placeholder="New password (leave to keep)"
                    type="password"
                  />
                </div>
              </div>

              {updated && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                  <FiCheckCircle className="text-emerald-600 shrink-0" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleUserUpdate}
                  disabled={saving}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-semibold shadow-xs transition active:scale-95"
                >
                  <FiSave />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleUserDelete}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition"
                >
                  <FiTrash2 />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
