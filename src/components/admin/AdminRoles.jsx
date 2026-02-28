import { useState } from "react";

const AdminRoles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: "All Access" },
    { id: 2, name: "Editor", permissions: "Manage News & Videos" },
    { id: 3, name: "User", permissions: "View Only" },
  ]);

  const [newRole, setNewRole] = useState("");
  const [permissions, setPermissions] = useState("");

  const addRole = () => {
    if (!newRole) return;

    const role = {
      id: Date.now(),
      name: newRole,
      permissions,
    };

    setRoles([...roles, role]);
    setNewRole("");
    setPermissions("");
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Roles</h2>

      {/* Add Role */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Permissions"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={addRole}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Role
        </button>
      </div>

      {/* Roles Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Permissions</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b">
              <td className="p-3">{role.name}</td>
              <td className="p-3">{role.permissions}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteRole(role.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoles;
