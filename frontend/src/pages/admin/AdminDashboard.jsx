import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/stats`, {
          withCredentials: true
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
    return <div className="text-center mt-10">Loading dashboard...</div>;
  }

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          Users: {data.users}
        </div>
        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          Posts: {data.posts}
        </div>
        <div className="bg-pink-500 text-white p-6 rounded-xl shadow">
          Comments: {data.comments}
        </div>
      </div>

      {/* 🔥 RECENT USERS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">👥 Recent Users</h2>
        {data.latestUsers.map((u) => (
          <p key={u._id}>{u.username} ({u.email})</p>
        ))}
      </div>

      {/* 🔥 RECENT POSTS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">📝 Recent Posts</h2>
        {data.latestPosts.map((p) => (
          <p key={p._id}>{p.title}</p>
        ))}
      </div>

      {/* 🔥 RECENT COMMENTS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">💬 Recent Comments</h2>
        {data.latestComments.map((c) => (
          <p key={c._id}>{c.desc}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;