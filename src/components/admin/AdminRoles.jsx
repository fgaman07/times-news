import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminRoles = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [permissions, setPermissions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await api.get("/roles");
        // Fallback to initial default roles if api data is not available or empty
        if (data && data.length > 0) {
          setRoles(data);
        } else {
          setRoles([
            { _id: 1, name: "Admin", permissions: "All Access" },
            { _id: 2, name: "Editor", permissions: "Manage News & Videos" },
            { _id: 3, name: "User", permissions: "View Only" },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch roles", err);
        setRoles([
          { _id: 1, name: "Admin", permissions: "All Access" },
          { _id: 2, name: "Editor", permissions: "Manage News & Videos" },
          { _id: 3, name: "User", permissions: "View Only" },
        ]);
      }
    };
    fetchRoles();
  }, []);

  const addRole = async (e) => {
    e.preventDefault();
    if (!newRole.trim() || !permissions.trim()) return;

    try {
      setLoading(true);
      const { data } = await api.post("/roles", {
        name: newRole,
        permissions: permissions
      });
      setRoles((prev) => [...prev, data]);
      setNewRole("");
      setPermissions("");
    } catch (err) {
      console.error(err);
      // Fallback behavior if endpoint isn't fully set up yet
      alert("Failed to add role to server. Mock adding locally.");
      const role = {
        _id: Date.now().toString(),
        name: newRole,
        permissions,
      };
      setRoles([...roles, role]);
      setNewRole("");
      setPermissions("");
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await api.delete(`/roles/${id}`);
      setRoles(roles.filter((role) => (role._id || role.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete role from server. Mock local deletion.");
      setRoles(roles.filter((role) => (role._id || role.id) !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Roles</h2>

      {/* Add Role */}
      <form onSubmit={addRole} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Role Name (e.g., Moderator)"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border p-2 rounded w-1/3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Permissions (e.g., Manage comments)"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          className="border p-2 rounded w-1/3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Adding..." : "Add Role"}
        </button>
      </form>

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left font-semibold rounded-tl-md rounded-bl-md">Role</th>
              <th className="p-3 text-left font-semibold">Permissions</th>
              <th className="p-3 text-right font-semibold rounded-tr-md rounded-br-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id || role.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 font-medium text-gray-800">{role.name}</td>
                <td className="p-3 text-gray-600">{role.permissions}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteRole(role._id || role.id)}
                    className="text-red-600 font-medium hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRoles;
