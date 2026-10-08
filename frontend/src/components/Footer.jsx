import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs">
                <BsSearch />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Campus <span className="text-blue-400">Lost & Found</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A trusted campus portal to report, find, and return lost items across college facilities, classrooms, and grounds.
            </p>
          </div>

          {/* FEATURED */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Featured</h3>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Most viewed</span>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Readers' choice</span>
          </div>

          {/* SUPPORT */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Support</h3>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Forum</span>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Recent posts</span>
          </div>

          {/* ABOUT */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">About</h3>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Privacy Policy</span>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Terms & Conditions</span>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-default transition">Terms of Service</span>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Campus Lost & Found System. All rights reserved.</p>
          <p className="text-slate-400">Designed for university students and campus staff</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
