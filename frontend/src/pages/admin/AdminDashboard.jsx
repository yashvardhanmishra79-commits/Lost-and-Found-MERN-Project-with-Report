import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaFileAlt, FaComments } from "react-icons/fa";
import Loader from "../../components/Loader";

const BASE_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/stats`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor campus lost &amp; found activities, newly registered members, and reported belongings.
        </p>
      </div>

      {/* STATS CARDS (Using strictly existing data values) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* USERS STAT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Users</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{data?.users || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <FaUsers />
          </div>
        </div>

        {/* POSTS STAT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Items Reported</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{data?.posts || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <FaFileAlt />
          </div>
        </div>

        {/* COMMENTS STAT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Community Comments</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{data?.comments || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
            <FaComments />
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT USERS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <FaUsers className="text-blue-600 text-sm" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Users</h2>
          </div>

          <div className="space-y-3 flex-1">
            {data?.latestUsers && data.latestUsers.length > 0 ? (
              data.latestUsers.map((u) => (
                <div key={u._id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {u.username ? u.username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 truncate">{u.username}</p>
                    <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No recent users</p>
            )}
          </div>
        </div>

        {/* RECENT POSTS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <FaFileAlt className="text-emerald-600 text-sm" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Posts</h2>
          </div>

          <div className="space-y-3 flex-1">
            {data?.latestPosts && data.latestPosts.length > 0 ? (
              data.latestPosts.map((p) => (
                <div key={p._id} className="p-2.5 rounded-lg hover:bg-slate-50 transition">
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">{p.title}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No recent posts</p>
            )}
          </div>
        </div>

        {/* RECENT COMMENTS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <FaComments className="text-indigo-600 text-sm" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Comments</h2>
          </div>

          <div className="space-y-3 flex-1">
            {data?.latestComments && data.latestComments.length > 0 ? (
              data.latestComments.map((c) => (
                <div key={c._id} className="p-2.5 rounded-lg hover:bg-slate-50 transition">
                  <p className="text-xs text-slate-700 italic line-clamp-2">
                    &ldquo;{c.desc}&rdquo;
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No recent comments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;