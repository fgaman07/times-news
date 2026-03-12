import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../assets/api.js"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
  e.preventDefault();
  await api.post('/users', { name, email, password });
  navigate('/login');
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          साइन अप
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="नाम"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="email"
            placeholder="ईमेल"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="पासवर्ड"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button className="w-full bg-red-600 text-white py-2 rounded font-semibold">
            साइन अप करें
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          पहले से अकाउंट है?
          <Link to="/login" className="text-red-600 font-semibold ml-1">
            लॉगिन करें
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
