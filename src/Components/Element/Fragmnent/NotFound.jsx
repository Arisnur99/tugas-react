import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Halaman Tidak Ditemukan
      </p>
      <p className="text-gray-600 mb-6">
        Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        to="/Dashboard"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;
