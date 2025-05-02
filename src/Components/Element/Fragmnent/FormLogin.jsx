import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

export default function FormLogin({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 👈 untuk redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${formData.username}&password=${formData.password}`
      );
      const data = await res.json();

      console.log("Data hasil login:", data);

      if (data.length > 0) {
        // alert("Login berhasil!");
        await Swal.fire({
          title: "Login Berhasil!",
          text: "Selamat datang!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        onLogin?.(data[0]);
        navigate("/dashboard"); // 🚀 redirect ke halaman dashboard
      } else {
        Swal.fire({
          title: "Login Gagal",
          text: "Username atau Password salah!",
          icon: "error",
          confirmButtonText: "Coba Lagi",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan!",
        footer: '<a href="#">Kenapa saya mengalami masalah ini?</a>',
      });
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
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password..."
              required
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-3 text-gray-600"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>

        <div className="text-right mb-4">
          <button
            type="button"
            className="text-xs sm:text-sm text-green-600 hover:underline"
            onClick={() =>
              Swal.fire({
                title: "Fitur Belum Tersedia",
                text: "Fitur lupa password belum tersedia.",
                icon: "info",
                confirmButtonText: "Oke",
                confirmButtonColor: "#3085d6",
              })
            }
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
