import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function FormRegister({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    alert("Pendaftaran berhasil!");
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-600 to-green-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-green-700">
          Daftar Akun <br />
          Puskesmas Bina Desa
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
              placeholder="Username..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3">
              <FaEnvelope className="text-gray-600" />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mb-4">
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
              placeholder="Password..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Konfirmasi Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="bg-gray-100 p-3">
              <FaLock className="text-gray-600" />
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
        >
          Daftar
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-green-600">
            Login di sini
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;
