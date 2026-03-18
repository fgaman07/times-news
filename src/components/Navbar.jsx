import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { Home, Video, Search, User, BookOpen, Layers, LogOut, Settings, ChevronDown } from "lucide-react"
import { useUser } from './admin/UserContext.jsx';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // 🚀 NAYA STATE: Dropdown ke liye
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🚀 NAYA REF: Dropdown box ko pehchanne ke liye
  const dropdownRef = useRef(null);

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
    setDropdownOpen(false); // Logout hone par menu band kar do
    navigate("/");
  };

  // 🚀 THE MAGIC: Click Outside Logic
  // Agar user dropdown ke bahar click kare, toh dropdown close kar do
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-[60] bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">

        {/* Logo */}
        <div className="w-64 shrink-0 flex items-center">
          <NavLink
            to="/"
            className="inline-block group cursor-pointer"
          >
            <span
              className="text-3xl md:text-3xl font-black italic tracking-tighter transition-all duration-300 text-red-700 group-hover:text-orange-400"
              style={{
                display: 'inline-block',
                fontFamily: "'Arial Black', 'Impact', sans-serif",
                lineHeight: '0.9',
                paddingBottom: '2px',
                letterSpacing: '-0.02em'
              }}
            >
              Times News
            </span>
          </NavLink>
        </div>
        {/* 🔵 CENTER: Main navigation */}
        <div className="hidden md:flex flex-1 justify-center font-bold text-gray-700">
          <div className="flex items-center gap-8">

            <NavLink to="/" className={({ isActive }) =>
              `flex items-center gap-2 hover:text-red-600 transition-colors py-1 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
            }>
              <Home size={22} />
              <span>होम</span>
            </NavLink>

            <NavLink to="/videos" className={({ isActive }) =>
              `flex items-center gap-2 hover:text-red-600 transition-colors py-1 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
            }>
              <Video size={22} />
              <span>वीडियो</span>
            </NavLink>

            {/* 🔍 Search */}
            {!searchOpen ? (
              <div
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors py-1"
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
                  className="border border-gray-300 rounded-full px-4 py-1.5 outline-none w-56 text-sm font-normal focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
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

        {/* 🟢 RIGHT: Secondary actions & User Profile */}
        <div className="w-auto flex justify-end items-center gap-5 font-bold shrink-0 text-gray-700">
          <NavLink to="/epaper" className={({ isActive }) =>
            `flex items-center gap-2 hover:text-red-600 whitespace-nowrap py-1 transition-colors ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
          }>
            <BookOpen size={20} />
            <span>ई-पेपर</span>
          </NavLink>

          <NavLink to="/webstory" className={({ isActive }) =>
            `flex items-center gap-2 hover:text-red-600 whitespace-nowrap py-1 transition-colors ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
          }>
            <Layers size={20} />
            <span>वेब स्टोरी</span>
          </NavLink>

          {/* 👤 USER SECTION (LOGIN OR DROPDOWN) */}
          <div className="ml-2 pl-4 border-l border-gray-200">
            {!currentUser ? (
              // Login Button for Guests
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
              >
                <User size={18} />
                <span>लॉगिन</span>
              </button>
            ) : (
              // 🚀 DROPDOWN MENU FOR LOGGED IN USERS
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                >
                  {/* Agar user ka avatar hai toh wo dikhao, warna default icon */}
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                  )}
                  <span className="text-sm font-semibold max-w-[100px] truncate">
                    {currentUser.fullName || currentUser.username || "Account"}
                  </span>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Box */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">

                    {/* User Info Header */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      {/* Admin Button (Only if Role matches) */}
                      {(currentUser.role === "admin" || currentUser.role === "ADMIN") && (
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            navigate("/admin");
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors"
                        >
                          <Settings size={16} />
                          Admin Panel
                        </button>
                      )}

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} />
                        लॉगआउट (Logout)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar