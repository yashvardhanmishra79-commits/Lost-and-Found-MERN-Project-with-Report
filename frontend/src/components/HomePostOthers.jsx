

import { FiClock, FiUser } from "react-icons/fi";

const HomePostOthers = () => {
  return (
    <article className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col sm:flex-row my-4">
      {/* Media / Left */}
      <div className="relative sm:w-60 sm:min-w-[15rem] sm:max-w-[15rem] h-48 sm:h-auto bg-slate-100 flex justify-center items-center overflow-hidden shrink-0">
        <img
          src="/imges/mob1.jpg"
          alt="Leather Bag"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase bg-rose-600 text-white shadow-xs">
            Lost
          </span>
        </div>
      </div>

      {/* Content / Right */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-2">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="text-slate-500 font-medium">Category: Accessories</span>
            <div className="flex items-center gap-1">
              <FiClock className="text-slate-400" />
              <span>16/04/2023 16:48</span>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            LEATHER BAG
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Lost my two side, Black colour, at Central Station, Badulla, on June 15, 2023.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
            <FiUser className="text-slate-400" />
            Posted by: Sayanara Ranasinha
          </span>
        </div>
      </div>
    </article>
  );
};

export default HomePostOthers;
