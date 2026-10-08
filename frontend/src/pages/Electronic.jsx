import axios from "axios";
import Footer from "../components/Footer";
import HomePostElectronic from "../components/HomePostElectronic";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { FiInbox, FiPlus, FiX, FiFilter } from "react-icons/fi";

const Electronic = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  // Parse query params: search and type (lost/found)
  const params = new URLSearchParams(search);
  const searchQuery = params.get("search") || "";
  const typeFilter = params.get("type") || ""; // 'lost', 'found', or ''

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const query = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const res = await axios.get(`${URL}/api/posts/${query}`);
      setPosts(res.data.reverse());
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  // Fetch posts whenever search changes
  useEffect(() => {
    fetchPosts();
  }, [searchQuery]);

  // Filter posts on frontend by `type`
  useEffect(() => {
    if (typeFilter) {
      const filtered = posts.filter((post) => {
        post.type = !post.type ? "Lost" : post.type;
        return post.type && post.type.toLowerCase() === typeFilter.toLowerCase();
      });
      setFilteredPosts(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setFilteredPosts(posts);
      setNoResults(posts.length === 0);
    }
  }, [posts, typeFilter]);

  const handleTypeSelect = (type) => {
    const newParams = new URLSearchParams(search);
    if (type) {
      newParams.set("type", type);
    } else {
      newParams.delete("type");
    }
    navigate(`/Electronic?${newParams.toString()}`);
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(search);
    newParams.delete("search");
    navigate(`/Electronic?${newParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Lost & Found Feed
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse recently lost and found items submitted by students and campus staff.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/write"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition active:scale-95"
            >
              <FiPlus className="text-base" />
              <span>Report an Item</span>
            </Link>
          </div>
        </div>

        {/* FEED CONTROLS & ACTIVE FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
          {/* Quick Segment Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-slate-400 mr-1 hidden sm:inline-flex items-center gap-1">
              <FiFilter className="text-xs" /> Filter:
            </span>
            <button
              type="button"
              onClick={() => handleTypeSelect("")}
              className={`px-3 py-1.5 rounded-lg transition ${
                !typeFilter
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Items
            </button>
            <button
              type="button"
              onClick={() => handleTypeSelect("lost")}
              className={`px-3 py-1.5 rounded-lg transition ${
                typeFilter.toLowerCase() === "lost"
                  ? "bg-rose-600 text-white"
                  : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60"
              }`}
            >
              Lost Only
            </button>
            <button
              type="button"
              onClick={() => handleTypeSelect("found")}
              className={`px-3 py-1.5 rounded-lg transition ${
                typeFilter.toLowerCase() === "found"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60"
              }`}
            >
              Found Only
            </button>
          </div>

          {/* Search Query Chip (if any) */}
          {searchQuery && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-blue-50 text-blue-700 border border-blue-200">
              <span>Keyword: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={clearSearch}
                className="hover:text-blue-900"
                title="Clear search"
              >
                <FiX className="text-xs" />
              </button>
            </div>
          )}
        </div>

        {/* POSTS LISTING */}
        <div className="min-h-[50vh]">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : !noResults ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Link
                  key={post._id}
                  to={user ? `/posts/post/${post._id}` : "/login"}
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                >
                  <HomePostElectronic post={post} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center my-8 shadow-xs">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 text-2xl mb-3">
                <FiInbox />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                No items found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
                We couldn&apos;t find any items matching your current filters or search query.
              </p>
              <div className="flex items-center justify-center gap-3">
                {(searchQuery || typeFilter) && (
                  <button
                    type="button"
                    onClick={() => navigate("/Electronic")}
                    className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                  >
                    Clear All Filters
                  </button>
                )}
                <Link
                  to="/write"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Post a New Item
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Electronic;
