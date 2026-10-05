import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/admin/comments`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      setActionLoading(id);
      await axios.delete(`${BASE_URL}/api/admin/comment/${id}`, {
        withCredentials: true,
      });

      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">💬 Comments Moderation</h1>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500">No comments found</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* COMMENT TEXT */}
              <p className="text-gray-800 text-lg mb-3">"{c.desc}"</p>

              {/* USER INFO */}
              <div className="text-sm text-gray-600 mb-2">
                👤 <span className="font-semibold">
                  {c.userId?.username || "Unknown User"}
                </span>
                {" "}({c.userId?.email || "No Email"})
              </div>

              {/* POST INFO */}
              <div className="text-sm text-gray-600 mb-2">
                📝 Post:{" "}
                <span className="font-semibold">
                  {c.postId?.title || "Deleted Post"}
                </span>
              </div>

              {/* DATE */}
              <div className="text-xs text-gray-400 mb-3">
                📅 {new Date(c.createdAt).toLocaleString()}
              </div>

              {/* ACTION */}
              <button
                onClick={() => deleteComment(c._id)}
                disabled={actionLoading === c._id}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm disabled:opacity-50"
              >
                {actionLoading === c._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;