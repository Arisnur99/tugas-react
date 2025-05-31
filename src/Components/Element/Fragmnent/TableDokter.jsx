import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

// ... semua import tetap sama
const TabelDokter = () => {
  const [dokterList, setDokterList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ... fetchDokter, useEffect, handleDelete tetap sama

  const filteredDokter = dokterList.filter((dokter) =>
    dokter.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-sm">
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-50 text-base">
        <h2 className="text-2xl font-bold mb-6 leading-tight">
          Puskesmas <br /> Bina Desa
        </h2>
        <ul className="space-y-4">
          <li>
            <a
              href="dashboard"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a href="patients" className="block hover:bg-green-600 p-2 rounded">
              Pasien
            </a>
          </li>
          <li>
            <a
              href="tabledokter"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Janji Dokter
            </a>
          </li>
          <li>
            <a
              href="tablesjanji"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Table Janji
            </a>
          </li>
          <li>
            <a
              href="tableobat"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Obat
            </a>
          </li>
        </ul>
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="dashboard"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="patients"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Pasien
              </a>
            </li>
            <li>
              <a
                href="tabledokter"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Janji Dokter
              </a>
            </li>
            <li>
              <a
                href="tablesjanji"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Table Janji
              </a>
            </li>
            <li>
              <a
                href="tableobat"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Obat
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        {/* Toggle Button Mobile */}
        <button
          className="text-2xl text-green-700 mb-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="bg-white p-4 sm:p-6 rounded shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-green-700">
              Daftar Dokter
            </h2>
            <button
              onClick={() => navigate("/addokter")}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
            >
              + Tambah Dokter
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari nama dokter..."
              className="max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm border">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 bordert">Nama</th>
                  <th className="p-3 border">Spesialis</th>
                  <th className="p-3 border">Jadwal</th>
                  <th className="p-3 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDokter.map((dokter) => (
                  <tr key={dokter.id} className="hover:bg-green-50">
                    <td className="px-2 py-2">{dokter.id}</td>
                    <td className="px-2 py-2">{dokter.nama}</td>
                    <td className="px-2 py-2">{dokter.spesialis}</td>
                    <td className="px-2 py-2">{dokter.jadwal}</td>
                    <td className="px-2 py-2 text-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          navigate("/adddokter", { state: dokter })
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(dokter.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDokter.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Tidak ada dokter ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelDokter;
