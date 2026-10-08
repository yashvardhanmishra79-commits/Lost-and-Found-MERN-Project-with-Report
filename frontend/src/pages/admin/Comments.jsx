import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { FiTrash2, FiUser, FiFileText, FiClock, FiAlertCircle, FiInbox } from "react-icons/fi";

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
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

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
            Comments Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review community interactions, coordinate inquiries, and remove inappropriate notes.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
          {comments.length} Comments
        </span>
      </div>

      {comments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <FiInbox className="text-3xl text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No comments found</p>
          <p className="text-xs text-slate-400 mt-1">There are no comments currently in the database.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                {/* COMMENT TEXT */}
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                  &ldquo;{c.desc}&rdquo;
                </p>

                {/* META ROW */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  {/* USER INFO */}
                  <div className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                    <FiUser className="text-slate-400" />
                    <span>{c.userId?.username || "Unknown Member"}</span>
                    {c.userId?.email && (
                      <span className="text-slate-400 font-mono text-[11px]">({c.userId.email})</span>
                    )}
                  </div>

                  {/* POST INFO */}
                  <div className="inline-flex items-center gap-1.5 text-slate-600">
                    <FiFileText className="text-slate-400" />
                    <span>Post:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-xs">
                      {c.postId?.title || "Deleted Post"}
                    </span>
                  </div>

                  {/* DATE */}
                  <div className="inline-flex items-center gap-1 text-slate-400">
                    <FiClock />
                    <span>{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="self-end sm:self-center shrink-0">
                <button
                  onClick={() => deleteComment(c._id)}
                  disabled={actionLoading === c._id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition disabled:opacity-50"
                >
                  <FiTrash2 />
                  <span>{actionLoading === c._id ? "Deleting..." : "Delete Note"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;