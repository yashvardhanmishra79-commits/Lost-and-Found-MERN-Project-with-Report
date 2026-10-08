import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { FiTrash2, FiUser, FiPhone, FiAlertCircle, FiInbox } from "react-icons/fi";
import { BsImage } from "react-icons/bs";

const BASE_URL = "http://localhost:5000";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/admin/posts`, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setActionLoading(id);
      await axios.delete(`${BASE_URL}/api/admin/post/${id}`, {
        withCredentials: true,
      });

      // instant UI update
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-xl flex items-center gap-3">
        <FiAlertCircle className="text-xl" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Posts Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Moderate, review, and delete reported lost or found listings across the platform.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
          {posts.length} Posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <FiInbox className="text-3xl text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No posts found</p>
          <p className="text-xs text-slate-400 mt-1">There are currently no item reports in the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => {
            const isFound = post.type && post.type.toLowerCase() === "found";
            return (
              <div
                key={post._id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* IMAGE */}
                  {post.photo ? (
                    <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                      <img
                        src={`${BASE_URL}/images/${post.photo}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-28 w-full bg-slate-100 flex items-center justify-center text-slate-400 gap-1.5 text-xs">
                      <BsImage className="text-base text-slate-300" />
                      <span>No image provided</span>
                    </div>
                  )}

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                          isFound
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {post.type || "Lost"}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 line-clamp-1">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {post.desc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        <FiUser className="text-slate-400" />
                        {post.username}
                      </span>
                      {post.contactNo && (
                        <span className="inline-flex items-center gap-1 text-slate-600">
                          <FiPhone className="text-slate-400" />
                          {post.contactNo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1 flex justify-end">
                  <button
                    onClick={() => deletePost(post._id)}
                    disabled={actionLoading === post._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition disabled:opacity-50"
                  >
                    <FiTrash2 />
                    <span>{actionLoading === post._id ? "Deleting..." : "Delete Post"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;