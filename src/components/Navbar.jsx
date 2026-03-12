import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { Home, Video, Search, User, BookOpen, Layers } from "lucide-react"
import { useUser } from './admin/UserContext.jsx';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setSearchOpen(false);
    setQuery("");
  };
  const handleLogout = () => {
    logout();
  navigate("/");
};


  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">

        {/* 🔴 LEFT: Logo (aligned with category section) */}
        <div className="w-64">
          <NavLink
            to="/"
            className={({ isActive }) =>
    `flex items-center gap-2 text-3xl text-red-500 font-extrabold hover:text-orange-500 ${
      isActive ? " border-orange-500" : ""
    }`
  }
          >
            Times News
          </NavLink>
        </div>

        {/* 🔵 CENTER: Main navigation (properly centered) */}
        <div className="hidden md:flex flex-1 justify-center font-bold">
          <div className="flex items-center gap-8">

            <NavLink to="/" className={({ isActive }) =>
    `flex items-center gap-2 hover:text-orange-500 ${
      isActive ? "text-orange-500 border-b-2 border-orange-500" : ""
    }`
  }>
              <Home size={22} />
              <span>होम</span>
            </NavLink>

            <NavLink to="/videos" className={({ isActive }) =>
    `flex items-center gap-2 hover:text-orange-500 ${
      isActive ? "text-orange-500 border-b-2 border-orange-500" : ""
    }`
  }>
                <Video size={25} />
                <span>वीडियो</span>
            </NavLink>

            {/* 🔍 Search (same-place input) */}
            {!searchOpen ? (
              <div
  onClick={() => searchOpen ? handleSearch({ preventDefault: () => {} }) : setSearchOpen(true)}
  className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
>
                <Search size={22} />
                <span>खोजें</span>
              </div>
            ) : (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="समाचार खोजें..."
                  className="border rounded px-2 py-1 outline-none w-48"
                  autoFocus
                  onBlur={(e) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    setSearchOpen(false);
  }
}}
                />
              </form>
            )}
          </div>
        </div>

        {/* 🟢 RIGHT: Secondary actions */}
        <div className="w-64 flex justify-end gap-4 font-bold">
            <NavLink to="/epaper" className={({ isActive }) =>
    `flex items-center gap-2 hover:text-orange-500 ${
      isActive ? "text-orange-500 border-b-2 border-orange-500" : ""
    }`
  }>
                <BookOpen size={25} />
                <span>ई-पेपर</span>
            </NavLink>

            <NavLink to="/webstory" className={({ isActive }) =>
    `flex items-center gap-2 hover:text-orange-500 ${
      isActive ? "text-orange-500 border-b-2 border-orange-500" : ""
    }`
  }>
                <Layers size={25} />
                <span>वेब स्टोरी</span>
            </NavLink>

            {!currentUser ? (
  <button
    onClick={() => navigate("/login")}
    className="flex items-center gap-2 hover:text-orange-500"
  >
    <User size={25} />
  </button>
) : (
  <div className="flex items-center gap-4">
    {currentUser.role === "admin" && (
      <button
        onClick={() => navigate("/admin")}
        className="hover:text-orange-500"
      >
        Admin
      </button>
    )}

    <button
      onClick={handleLogout}
      className="hover:text-orange-500"
    >
      Logout
    </button>
  </div>
)}
        </div>

      </div>
    </div>
  )
}

export default Navbar
