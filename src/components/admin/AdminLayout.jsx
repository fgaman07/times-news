import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/news">News</NavLink>
          <NavLink to="/admin/videos">Videos</NavLink>
          <NavLink to="/admin/webstory">Web Stories</NavLink>

          <NavLink to="/admin/categories">Categories</NavLink>
  <NavLink to="/admin/users">Users</NavLink>
  <NavLink to="/admin/roles">Roles</NavLink>
  <NavLink to="/admin/comments">Comments</NavLink>
  <NavLink to="/admin/media">Media</NavLink>
  <NavLink to="/admin/settings">Settings</NavLink>

        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
