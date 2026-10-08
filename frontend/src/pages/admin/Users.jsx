import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { FiTrash2, FiShield, FiAlertCircle, FiUser } from "react-icons/fi";

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
    if (!window.confirm("Are you sure you want to delete this user?")) return;

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
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-xl flex items-center gap-3">
        <FiAlertCircle className="text-xl" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View registered students and staff, elevate admin privileges, and manage member accounts.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
          {users.length} Users
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            {/* HEADER */}
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Member</th>
                <th className="py-3.5 px-4 sm:px-6">Email Address</th>
                <th className="py-3.5 px-4 sm:px-6">Role</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {u.username ? u.username.charAt(0).toUpperCase() : <FiUser />}
                      </div>
                      <span>{u.username}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-mono text-xs">
                    {u.email}
                  </td>

                  <td className="py-3.5 px-4 sm:px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {u.role === "admin" && <FiShield className="text-[10px]" />}
                      <span className="capitalize">{u.role || "user"}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-right space-x-2">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(u._id)}
                        disabled={actionLoading === u._id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition disabled:opacity-50"
                      >
                        <FiShield className="text-xs" />
                        <span>{actionLoading === u._id ? "..." : "Make Admin"}</span>
                      </button>
                    )}

                    <button
                      onClick={() => deleteUser(u._id)}
                      disabled={actionLoading === u._id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition disabled:opacity-50"
                    >
                      <FiTrash2 className="text-xs" />
                      <span>{actionLoading === u._id ? "..." : "Delete"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            No users registered in the system.
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;