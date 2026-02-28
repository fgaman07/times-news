import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  // Save logged-in user
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Redirect based on role
  if (user.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
          लॉगिन
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            लॉगिन करें
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          अकाउंट नहीं है?
          <Link to="/signup" className="text-red-600 font-semibold ml-1">
            साइन अप करें
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
