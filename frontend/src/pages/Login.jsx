import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [userDetail, setUser] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...userDetail,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        email: userDetail.email,
        password: userDetail.password
      });

      // remember me logic
      if (userDetail.remember) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      toast.success("Login successful ✅");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-blue-900 to-indigo-900">

      {/* LEFT BRAND */}
      <div className="hidden md:flex flex-col justify-center px-16 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-lg opacity-90">
          Login to manage your cart, orders and trending products.
        </p>
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-center text-gray-500 mb-6">
            Access your account
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4 relative">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex justify-between items-center mb-5 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                onChange={handleChange}
              />
              Remember me
            </label>

            <span className="text-blue-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?
            <Link to="/Singin" className="text-blue-600 font-semibold ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
