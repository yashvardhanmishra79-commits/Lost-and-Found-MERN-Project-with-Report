import axios from "axios";
import Footer from "../components/Footer";
import HomePostElectronic from "../components/HomePostElectronic";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Electronic = () => {
  const { search } = useLocation();

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
      // Assuming your backend API accepts query string with search keyword only
      // e.g., GET /api/posts/?search=phone
      // Remove leading '?' from `search`
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
  }, [searchQuery]); // only refetch if search query changes

  // Filter posts on frontend by `type`
  useEffect(() => {
    if (typeFilter) {
      const filtered = posts.filter((post) =>{
        post.type=!post.type?"Lost":post.type
        return post.type && post.type.toLowerCase() === typeFilter.toLowerCase()}
      );
      setFilteredPosts(filtered);
      setNoResults(filtered.length === 0);
    } else {
      // No filter, show all posts
      setFilteredPosts(posts);
      setNoResults(posts.length === 0);
    }
  }, [posts, typeFilter]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          filteredPosts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePostElectronic post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Electronic;
