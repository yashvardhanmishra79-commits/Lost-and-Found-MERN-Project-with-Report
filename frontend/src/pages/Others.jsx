import HomePostOthers from "../components/HomePostOthers.jsx";
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Others = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <IoArrowBackSharp className="text-base" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Miscellaneous Reports</h1>
        </div>

        <HomePostOthers />
      </main>
      <Footer />
    </div>
  );
};

export default Others;
