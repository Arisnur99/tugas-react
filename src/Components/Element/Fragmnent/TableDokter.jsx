import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
const TabelDokter = () => {
  const [dokterList, setDokterList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchDokter = async () => {
    const res = await fetch("http://localhost:3001/doctors");
    const data = await res.json();
    setDokterList(data);
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus dokter ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3001/doctors/${id}`, { method: "DELETE" });
      fetchDokter();
      Swal.fire("Terhapus!", "Data dokter telah dihapus.", "success");
    }
  };

  const filteredDokter = dokterList.filter((dokter) =>
    dokter.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-5 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
        <ul>
        <li className="mb-4">
            <a href="dashboard" className="block hover:bg-green-600 p-2 rounded">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="patients" className="block hover:bg-green-600 p-2 rounded">
              Pasien
            </a>
          </li>
          <li className="mb-4">
            <a href="tabledokter" className="block hover:bg-green-600 p-2 rounded">
              Janji Dokter
            </a>
          </li>
          <li className="mb-4">
            <a href="tablesjanji" className="block hover:bg-green-600 p-2 rounded">
              Table Janji
            </a>
          </li>
          <li className="mb-4">
            <a href="tableobat" className="block hover:bg-green-600 p-2 rounded">
              Obat
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-700">Daftar Dokter</h2>
            <button
              onClick={() => navigate("/adddokter")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Tambah Dokter
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari nama dokter..."
              className="border px-3 py-2 rounded w-full md:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nama</th>
                  <th className="px-4 py-2 text-left">Spesialis</th>
                  <th className="px-4 py-2 text-left">Jadwal</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDokter.map((dokter) => (
                  <tr key={dokter.id} className="hover:bg-green-50">
                    <td className="px-4 py-2">{dokter.id}</td>
                    <td className="px-4 py-2">{dokter.nama}</td>
                    <td className="px-4 py-2">{dokter.spesialis}</td>
                    <td className="px-4 py-2">{dokter.jadwal}</td>
                    <td className="px-4 py-2 text-center space-x-2">
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
