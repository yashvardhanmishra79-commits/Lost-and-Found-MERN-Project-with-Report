import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const initial = c.author ? c.author.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 my-3 hover:bg-slate-50/90 transition">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center shrink-0">
            {initial}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-semibold text-xs sm:text-sm text-slate-800">@{c.author}</span>
            <span className="text-[11px] text-slate-400">
              {new Date(c.updatedAt).toLocaleDateString()} at {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {user?._id === c?.userId && (
          <button
            onClick={() => deleteComment(c._id)}
            title="Delete comment"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <MdDelete className="text-base" />
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-700 leading-relaxed sm:pl-9">
        {c.comment}
      </p>
    </div>
  );
};

export default Comment;