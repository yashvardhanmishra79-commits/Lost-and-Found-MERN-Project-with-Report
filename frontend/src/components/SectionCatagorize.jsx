import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FiSearch, FiPlusCircle, FiShield, FiCheckCircle } from "react-icons/fi";

const SectionCatagorize = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div className="relative w-full h-[480px] sm:h-[520px] lg:h-[560px] bg-slate-900 overflow-hidden">
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          interval={5500}
          transitionTime={700}
          stopOnHover
          className="h-full"
        >
          <div className="h-[480px] sm:h-[520px] lg:h-[560px]">
            <img
              src="/imges/mobile-2262928_1920.jpg"
              alt="Campus Electronics"
              className="object-cover h-full w-full opacity-40 brightness-75"
            />
          </div>
          <div className="h-[480px] sm:h-[520px] lg:h-[560px]">
            <img
              src="/imges/ios-1091302.jpg"
              alt="Personal Devices"
              className="object-cover h-full w-full opacity-40 brightness-75"
            />
          </div>
          <div className="h-[480px] sm:h-[520px] lg:h-[560px]">
            <img
              src="/imges/man-5932703.jpg"
              alt="Campus Life"
              className="object-cover h-full w-full opacity-40 brightness-75"
            />
          </div>
        </Carousel>

        {/* OVERLAY & CONTENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/50 flex items-center justify-center pointer-events-none">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Official Campus Network
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
              Lost Something? Found Something? <br className="hidden sm:inline" />
              <span className="text-blue-400">We Reconnect Both.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              The centralized campus registry for student & faculty belongings. Search found property or report items you've lost within seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/Electronic"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FiSearch className="text-base" />
                <span>Browse All Items</span>
              </Link>
              <Link
                to="/write"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-lg backdrop-blur-sm transition-all duration-200"
              >
                <FiPlusCircle className="text-base" />
                <span>Report an Item</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* THREE VALUE PILLARS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-3">
              <FiSearch />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">1. Quick Search</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Instantly filter by lost or found status, category, or title keywords across campus facilities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-3">
              <FiPlusCircle />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">2. Direct Reporting</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Post an item in under 2 minutes with photos, description, and direct contact details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-3">
              <FiShield />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">3. Campus Trust</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Authenticated community communication to safely coordinate recovery and claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCatagorize;
