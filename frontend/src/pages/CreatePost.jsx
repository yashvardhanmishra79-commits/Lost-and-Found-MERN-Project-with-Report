import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from 'react-icons/im';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contactno, setContactNo] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [postType, setPostType] = useState("Lost"); // New field for Lost/Found
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat.trim() === "") return;
    setCats([...cats, cat]);
    setCat("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      contactNo: contactno,
      type: postType,
    };

    if (file) {
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
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-6 md:px-32 mt-8 w-full md:w-[80%] mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl mt-8">Create a Post</h1>
        <form className="w-full mt-6 space-y-6 bg-white p-6 rounded-xl shadow-lg" onSubmit={handleCreate}>
          
          {/* Lost/Found Selection */}
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
              <button
                type="button"
                onClick={addCategory}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {/* Display Categories */}
            <div className="flex flex-wrap gap-2 mt-3">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  <span>{c}</span>
                  <button
                    type="button"
                    onClick={() => deleteCategory(i)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={6}
              required
              className="px-4 py-2 w-full border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
            />
          </div>

          {/* Contact No */}
          <div>
            <input
              onChange={(e) => setContactNo(e.target.value)}
              type="text"
              required
              minLength={10}
              maxLength={10}
              pattern="^[6-9]\d{9}$"
              className="px-4 py-2 w-full md:w-2/3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact number"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-blue-600"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
