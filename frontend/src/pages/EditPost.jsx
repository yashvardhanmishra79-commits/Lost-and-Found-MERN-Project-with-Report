import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FiArrowLeft, FiSave, FiX, FiUploadCloud, FiPhone, FiTag, FiImage } from "react-icons/fi";
import axios from "axios";
import { URL, IF } from "../url";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  const [postType, setPostType] = useState("Lost");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/" + postId);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setFile(res.data.photo);
        setCats(res.data.categories || []);
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
    setSubmitting(true);
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
      post.photo = file;
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };

  const deleteCategory = (i) => {
    const updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat.trim() === "") return;
    if (!cats.includes(cat.trim())) {
      setCats([...cats, cat.trim()]);
    }
    setCat("");
  };

  const handleKeyDownCat = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BREADCRUMB */}
        <div className="mb-6">
          <Link
            to={`/posts/post/${postId}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Post Details</span>
          </Link>
        </div>

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Update Item Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Modify details, status, or contact info for this campus item report.
          </p>
        </div>

        {/* FORM CARD */}
        <form
          className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6"
          onSubmit={handleUpdate}
        >
          {/* POST TYPE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Report Category <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setPostType("Lost")}
                className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  postType === "Lost"
                    ? "bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-500/20 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Lost Item</span>
              </button>
              <button
                type="button"
                onClick={() => setPostType("Found")}
                className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  postType === "Found"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Found Item</span>
              </button>
            </div>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="sr-only"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Item Title <span className="text-rose-500">*</span>
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              required
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              placeholder="Enter post title"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Item Photo
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-slate-300 transition bg-slate-50/50">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="edit-file-upload"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="edit-file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                  <FiUploadCloud />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline">
                    Click to replace photo
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Leave unchanged to keep current image
                  </span>
                </div>
              </label>

              {typeof file === "string" && (
                <div className="mt-3 flex items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                    <img src={IF + file} alt="Current" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium truncate max-w-xs">
                    Current photo saved
                  </span>
                </div>
              )}

              {file && typeof file !== "string" && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                  <FiImage />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Categories &amp; Tags
            </label>
            <div className="flex items-center gap-2">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                onKeyDown={handleKeyDownCat}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                placeholder="Enter category and click Add"
                type="text"
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 transition"
              >
                Add
              </button>
            </div>

            {cats?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {cats.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-xs font-medium"
                  >
                    <FiTag className="text-[10px] text-blue-500" />
                    <span>{c}</span>
                    <button
                      type="button"
                      onClick={() => deleteCategory(i)}
                      className="text-blue-400 hover:text-rose-600 transition ml-0.5"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={5}
              required
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition leading-relaxed"
              placeholder="Enter post description"
            />
          </div>

          {/* CONTACT NUMBER */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Contact Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiPhone className="text-sm" />
              </div>
              <input
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
                type="text"
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                placeholder="Enter contact number"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              to={`/posts/post/${postId}`}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition active:scale-95"
            >
              <FiSave className="text-base" />
              <span>{submitting ? "Saving..." : "Update Report"}</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default EditPost;
