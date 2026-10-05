import { useEffect, useState } from "react";
import axios from "axios";

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
    if (!window.confirm("Delete this post?")) return;

    try {
      setActionLoading(id);
      await axios.delete(`${BASE_URL}/api/admin/post/${id}`, {
        withCredentials: true,
      });

      // 🔥 instant UI update (no refetch)
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
    return <div className="text-center mt-10 text-lg">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">📝 Posts Management</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* IMAGE (if exists) */}
              {post.photo && (
                <img
                  src={`${BASE_URL}/images/${post.photo}`}
                  alt="post"
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-3 line-clamp-3">
                  {post.desc}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>👤 {post.username}</span>
                  <span>📞 {post.contactNo}</span>
                </div>

                <div className="flex justify-between items-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.type === "lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {post.type}
                  </span>

                  <button
                    onClick={() => deletePost(post._id)}
                    disabled={actionLoading === post._id}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
                  >
                    {actionLoading === post._id ? "..." : "Delete"}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;