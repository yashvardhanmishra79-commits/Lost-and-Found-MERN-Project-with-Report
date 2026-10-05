import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [contactNo, setContactNo] = useState("");
  const [postType, setPostType] = useState("Lost"); // New field
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/" + postId);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setFile(res.data.photo);
        setCats(res.data.categories);
        setContactNo(res.data.contactNo);
        setPostType(res.data.type || "Lost");
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      contactNo,
      type: postType,
    };

    if (file && typeof file !== "string") {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    } else if (typeof file === "string") {
      post.photo = file; // if existing photo string
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = (i) => {
    const updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat.trim() === "") return;
    setCats([...cats, cat]);
    setCat("");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-6 md:px-32 mt-8 w-full md:w-[80%] mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl mt-8">Update a Post</h1>
        <form
          className="w-full mt-6 space-y-6 bg-white p-6 rounded-xl shadow-lg"
          onSubmit={handleUpdate}
        >
          {/* Post Type */}
          <div>
            <label className="block mb-2 font-medium">Post Type</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              required
              className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>

          {/* Image */}
          <div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4 w-full md:w-2/3"
            />
            {typeof file === "string" && (
              <p className="text-sm mt-2 text-gray-600">Current file: {file}</p>
            )}
          </div>

          {/* Category Input */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Post Categories</label>
            <div className="flex items-center gap-4">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-600"
              >
                Add
              </div>
            </div>

            <div className="flex flex-wrap mt-3 gap-2">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <button
                    type="button"
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-red-500 rounded-full cursor-pointer p-1 hover:bg-red-600"
                  >
                    <ImCross size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={6}
              className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
            />
          </div>

          {/* Contact No */}
          <div>
            <input
              onChange={(e) => setContactNo(e.target.value)}
              value={contactNo}
              type="text"
              className="px-4 py-2 outline-none w-full md:w-2/3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact number"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-wrap">
            <button
              type="submit"
              className="bg-blue-500 w-full md:w-1/4 mx-auto text-white font-semibold px-4 py-2 rounded-lg md:text-xl text-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
