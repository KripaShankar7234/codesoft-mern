import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Singin = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", userDetails);
      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed ❌");
    }
  };

  const strength = getStrength(userDetails.password);

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-green-900 to-emerald-900">

      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-center px-16 text-white">
        <h1 className="text-4xl font-bold mb-4">Join Us 🚀</h1>
        <p className="text-lg opacity-90">
          Create your account and start shopping smarter.
        </p>
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Register</h2>
          <p className="text-center text-gray-500 mb-6">
            Create a new account
          </p>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              name="name"
              required
              onChange={handleChange}
              placeholder="Your name"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

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
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="mb-2 relative">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={handleChange}
              placeholder="Create strong password"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none pr-10"
            />
            <span
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* PASSWORD STRENGTH */}
          <p className={`text-sm mb-4 ${
            strength === "Weak"
              ? "text-red-500"
              : strength === "Medium"
              ? "text-yellow-500"
              : "text-green-600"
          }`}>
            Password Strength: {strength}
          </p>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?
            <Link to="/login" className="text-green-600 font-semibold ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Singin;
