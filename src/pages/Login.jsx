import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const { login } = useAuth();

const handleLogin = async (e) => {
  e.preventDefault();
  seterror("");

  try {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    // ✅ If backend returns user info, update AuthContext immediately
    if (res?.data?.user) {
      login(res.data.user); // updates Navbar immediately
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ensure persistence
    }

    // ✅ Navigate *after* context update
    if (res?.data?.message === "user logedin successfully") {
      alert("🎉 Login successful!");
      navigate("/products", { replace: true });
    }
  } catch (err) {
    seterror(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Welcome Back 
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-500 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
