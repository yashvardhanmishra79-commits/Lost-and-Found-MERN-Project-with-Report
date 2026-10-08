/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { IF } from '../url';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import { BsImage } from 'react-icons/bs';

const ProfilePosts = ({ p }) => {
  const isFound = p.type && p.type.toLowerCase() === "found";
  const postType = p.type || "Lost";

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row mb-4">
      {/* Left Media */}
      <div className="relative sm:w-52 sm:min-w-[13rem] sm:max-w-[13rem] h-44 sm:h-auto bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
        {p.photo ? (
          <img
            src={IF + p.photo}
            alt={p.title}
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = "flex";
              }
            }}
            className="w-full h-full object-cover"
          />
        ) : null}

        <div
          className={`w-full h-full items-center justify-center text-slate-400 flex-col gap-1 ${
            p.photo ? "hidden" : "flex"
          }`}
        >
          <BsImage className="text-xl text-slate-300" />
          <span className="text-[10px] text-slate-400">No photo</span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              isFound
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            {postType}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between p-4 sm:p-5 flex-1">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="inline-flex items-center gap-1 font-medium text-slate-600">
              <FiUser className="text-slate-400" />
              @{p.username}
            </span>
            <span className="inline-flex items-center gap-1">
              <FiClock className="text-slate-400" />
              {new Date(p.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 line-clamp-1">
            {p.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {p.desc}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-3 flex justify-end">
          <Link
            to={`/posts/post/${p._id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>View Details</span>
            <FiArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
