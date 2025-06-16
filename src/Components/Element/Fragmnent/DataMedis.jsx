import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const TenagaMedis = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await fetch("http://localhost:3001/tenaga_medis");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    });
    if (result.isConfirmed) {
      await fetch(`http://localhost:3001/tenaga_medis/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      fetchData();
    }
  };

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-700 text-white p-4 transition-transform transform z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/patients"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Pasien
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/tabledokter"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Janji Dokter
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/tablesjanji"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Table Janji
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/tableobat"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Obat
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/datamedis"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Tenaga Medis
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/rekammedis"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Rekam Medis
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 z-0 w-full">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          {/* Tombol sidebar toggle untuk HP */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-green-700 text-xl md:hidden transition-transform duration-200 ease-in-out"
            >
              <FaBars />
            </button>
            <h2 className="text-xl font-bold text-green-700">Tenaga Medis</h2>
          </div>

          <button
            onClick={() => navigate("/masukmedis")}
            className="bg-green-600 text-white px-7 py-2 rounded hover:bg-green-700 text-sm md:text-base transition duration-200"
          >
            + Tambah Tenaga Medis
          </button>
        </div>

        {/* Pencarian */}
        <div>
          <input
            type="text"
            placeholder="Cari nama..."
            className="max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabel */}
        <div className="bg-white rounded shadow overflow-x-auto w-full mt-12">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="p-3 border text-center">Nama</th>
                <th className="p-3 border text-center">Jabatan</th>
                <th className="p-3 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border break-words">{item.nama}</td>
                  <td className="p-3 border break-words">{item.jabatan}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => navigate("/masukmedis", { state: item })}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    Tidak ada data tenaga medis yang cocok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TenagaMedis;
