import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePostElectronic";
import Loader from "../components/Loader";
import { FiInbox, FiPlus, FiArrowLeft } from "react-icons/fi";

const MyPosts = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    if (!user?._id) return;
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data.reverse());
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPosts();
    }
  }, [search, user]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BREADCRUMB */}
        <div className="mb-6">
          <Link
            to="/Electronic"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Campus Feed</span>
          </Link>
        </div>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Reported Items
              </h1>
              {!loader && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {posts.length}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage and track all items you have reported as lost or found across campus.
            </p>
          </div>

          <Link
            to="/write"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition active:scale-95 self-start sm:self-auto"
          >
            <FiPlus className="text-base" />
            <span>Report New Item</span>
          </Link>
        </div>

        {/* POSTS LIST */}
        <div className="min-h-[50vh]">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : !noResults ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={user ? `/posts/post/${post._id}` : "/login"}
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                >
                  <HomePosts post={post} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center my-8 shadow-xs">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 text-2xl mb-3">
                <FiInbox />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                You haven&apos;t reported any items yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
                When you report lost belongings or found items, they will show up here for you to manage.
              </p>
              <Link
                to="/write"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition"
              >
                <FiPlus className="text-base" />
                <span>Post Your First Item</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyPosts;