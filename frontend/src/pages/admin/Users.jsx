import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      setActionLoading(id);
      await axios.delete(`${BASE_URL}/api/admin/user/${id}`, {
        withCredentials: true,
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoading(null);
    }
  };

  const makeAdmin = async (id) => {
    try {
      setActionLoading(id);
      await axios.put(
        `${BASE_URL}/api/admin/make-admin/${id}`,
        {},
        { withCredentials: true }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: "admin" } : u
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">👥 Users Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">

          {/* HEADER */}
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="text-center border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-semibold">{u.username}</td>

                <td className="py-3 px-4 text-gray-600">{u.email}</td>

                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      u.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="py-3 px-4 space-x-2">

                  {u.role !== "admin" && (
                    <button
                      onClick={() => makeAdmin(u._id)}
                      disabled={actionLoading === u._id}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
                    >
                      {actionLoading === u._id ? "..." : "Make Admin"}
                    </button>
                  )}

                  <button
                    onClick={() => deleteUser(u._id)}
                    disabled={actionLoading === u._id}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
                  >
                    {actionLoading === u._id ? "..." : "Delete"}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default Users;