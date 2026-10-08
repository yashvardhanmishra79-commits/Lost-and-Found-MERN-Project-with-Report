import { IF } from "../url";
import { FiClock, FiUser, FiPhone, FiTag } from "react-icons/fi";
import { BsImage } from "react-icons/bs";

const HomePostElectronic = ({ post }) => {
  const isFound = post.type && post.type.toLowerCase() === "found";
  const postType = post.type || "Lost";

  return (
    <article className="group w-full bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row my-4">
      {/* Media / Left Image */}
      <div className="relative sm:w-60 sm:min-w-[15rem] sm:max-w-[15rem] h-48 sm:h-auto bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
        {post.photo ? (
          <img
            src={IF + post.photo}
            alt={post.title}
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = "flex";
              }
            }}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : null}

        <div
          className={`w-full h-full items-center justify-center text-slate-400 flex-col gap-1.5 ${
            post.photo ? "hidden" : "flex"
          }`}
        >
          <BsImage className="text-2xl text-slate-300" />
          <span className="text-[11px] font-medium text-slate-400">No photo provided</span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase border shadow-xs backdrop-blur-xs ${
              isFound
                ? "bg-emerald-500/90 text-white border-emerald-600"
                : "bg-rose-500/90 text-white border-rose-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            {postType}
          </span>
        </div>
      </div>

      {/* Content / Right */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-3">
        <div>
          {/* Categories & Timestamp */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {post.categories && post.categories.length > 0 ? (
                post.categories.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                  >
                    <FiTag className="text-[10px] text-slate-400" />
                    {c}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                  General
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-400">
              <FiClock className="text-slate-400 text-xs" />
              <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mt-1.5">
            {post.desc}
          </p>
        </div>

        {/* Footer Meta Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 text-slate-600">
            <span className="inline-flex items-center gap-1 font-medium text-slate-700">
              <FiUser className="text-slate-400" />
              {post.username}
            </span>

            {post.contactNo && (
              <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                <FiPhone className="text-slate-400" />
                {post.contactNo}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
            View Details &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};

export default HomePostElectronic;
