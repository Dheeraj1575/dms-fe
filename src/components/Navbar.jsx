import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-8 py-4 shadow-md flex justify-between items-center">
      {/* Brand / Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        Disaster Management System
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link
          to="/login"
          className="px-4 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
