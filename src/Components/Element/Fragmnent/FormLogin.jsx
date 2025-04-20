import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FormLogin({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === "admin" && formData.password === "123456") {
      onLogin?.();
    } else {
      alert("Username atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-600 to-green-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-green-700">
          Login Puskesmas <br /> Bina Desa
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3">
              <FaUser className="text-gray-600" />
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3">
              <FaLock className="text-gray-600" />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="text-right mb-4">
          <button
            type="button"
            className="text-xs sm:text-sm text-green-600 hover:underline"
            onClick={() => alert("Fitur lupa password belum tersedia.")}
          >
            Lupa password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
        >
          Login
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-green-600">
            Daftar di sini
          </Link>
        </div>
      </form>
    </div>
  );
}
