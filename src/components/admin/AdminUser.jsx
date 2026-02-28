import { useState, useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Editor",
  });

  // Load users
  useEffect(() => {
    const saved = localStorage.getItem("adminUsers");
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  // Save users
  useEffect(() => {
    localStorage.setItem("adminUsers", JSON.stringify(users));
  }, [users]);

  // Add User
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setUsers((prev) => [
      ...prev,
      { id: Date.now(), ...formData },
    ]);

    setFormData({ name: "", email: "", role: "Editor" });
  };

  // Delete User
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Update Role (Authority Control)
  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  // Filter Users by Email
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="border p-3 rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="border p-3 rounded-md"
        />

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
          className="border p-3 rounded-md"
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Author</option>
        </select>

        <button className="col-span-3 bg-blue-600 text-white py-2 rounded-md">
          Add User
        </button>
      </form>

      {/* 🔎 Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search by Email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-3 rounded-md w-full"
        />
      </div>

      {/* Users Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td>{user.email}</td>

              {/* Editable Role Dropdown */}
              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user.id, e.target.value)
                  }
                  className="border rounded-md px-2 py-1"
                >
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Author</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
