import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Catergories = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Find Your Lost Items in Public Places Just a Click
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          Access the full campus lost and found catalogue to check recently submitted findings.
        </p>
        <Link to="/Electronic">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-xs transition active:scale-95"
          >
            <span>Click Here To Continue !</span>
            <FiArrowRight className="text-base" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Catergories;
