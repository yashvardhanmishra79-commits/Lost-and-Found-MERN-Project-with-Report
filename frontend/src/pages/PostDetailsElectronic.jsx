import { useNavigate, useParams, Link } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FiArrowLeft, FiClock, FiTag, FiUser, FiPhone, FiSend, FiMessageSquare } from "react-icons/fi";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetailsElectronic = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      navigate("/Electronic");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const getTypeBadge = (type) => {
    const safeType = !type ? "Lost" : type;
    const isFound = safeType.toLowerCase() === "found";

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider border shadow-xs ${
          isFound
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-rose-50 text-rose-700 border-rose-200"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isFound ? "bg-emerald-500" : "bg-rose-500 animate-pulse"
          }`}
        ></span>
        {safeType}
      </span>
    );
  };

  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(
        URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BREADCRUMB / BACK LINK */}
        <div className="mb-6">
          <Link
            to="/Electronic"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Campus Feed</span>
          </Link>
        </div>

        {loader ? (
          <div className="h-[60vh] flex justify-center items-center w-full">
            <Loader />
          </div>
        ) : (
          <div className="space-y-8">
            {/* MAIN POST DETAILS CARD */}
            <article className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden p-6 sm:p-8">
              
              {/* TOP HEADER: STATUS, DATE & ACTIONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {getTypeBadge(post.type)}

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FiClock className="text-slate-400" />
                    <span>
                      {post.updatedAt && new Date(post.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* EDIT & DELETE (Authorized user or admin) */}
                {(user?.role === "admin" || user?._id === post?.userId) && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate("/edit/" + postId)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                    >
                      <BiEdit className="text-sm" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePost}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                    >
                      <MdDelete className="text-sm" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {/* TITLE */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">
                {post.title}
              </h1>

              {/* CATEGORIES */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {post.categories.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                    >
                      <FiTag className="text-[11px] text-slate-400" />
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* PHOTO DISPLAY */}
              {post.photo && (
                <div className="my-6 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-900 flex justify-center items-center max-h-[460px]">
                  <img
                    src={IF + post.photo}
                    alt={post.title}
                    className="max-h-[460px] w-auto max-w-full object-contain"
                  />
                </div>
              )}

              {/* DESCRIPTION */}
              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Item Description
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {post.desc}
                </p>
              </div>

              {/* CONTACT & REPORTER BOX */}
              <div className="mt-8 bg-slate-50 border border-slate-200/90 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {post.username ? post.username.charAt(0).toUpperCase() : <FiUser />}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Reported By</p>
                    <p className="text-sm font-bold text-slate-800">{post.username}</p>
                  </div>
                </div>

                {post.contactNo && (
                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <FiPhone className="text-blue-600 text-base" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Contact Number</p>
                      <a
                        href={`tel:${post.contactNo}`}
                        className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition"
                      >
                        {post.contactNo}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* COMMENTS SECTION */}
            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FiMessageSquare className="text-blue-600 text-lg" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Community Notes &amp; Comments
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {comments?.length || 0}
                </span>
              </div>

              {/* COMMENTS LIST */}
              {comments?.length > 0 ? (
                <div className="space-y-3 mb-8">
                  {comments.map((c) => (
                    <Comment key={c._id} c={c} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
                  No comments yet. Have information regarding this item? Leave a comment below.
                </div>
              )}

              {/* WRITE A COMMENT */}
              <form onSubmit={postComment} className="mt-6 pt-6 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Leave a Note or Claim Message
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    type="text"
                    placeholder="Write a helpful update, location detail, or claim note..."
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition active:scale-95"
                  >
                    <FiSend className="text-xs" />
                    <span>Post Comment</span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PostDetailsElectronic;
