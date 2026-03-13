import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "./admin/UserContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log("Attempting login...");
      const loggedInUser = await login({ email, password });
      console.log("Login successful, user:", loggedInUser);
      navigate(loggedInUser?.role === 'ADMIN' || loggedInUser?.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      console.error("Login failed:", err);
      // More detailed error alert
      alert(`Login failed: ${err.response?.data?.message || err.message}`);
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
