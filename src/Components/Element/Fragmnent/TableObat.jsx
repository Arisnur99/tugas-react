import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TableObatPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Ambil data obat dari server
  const fetchMedicines = async () => {
    try {
      const res = await fetch("http://localhost:3001/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch (error) {
      console.error("Gagal mengambil data obat:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((obat) =>
    obat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Delete dengan konfirmasi Swal
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3001/medicines/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Terhapus!", "Data obat berhasil dihapus.", "success");
        fetchMedicines(); // refresh data
      } catch (error) {
        Swal.fire("Gagal!", "Gagal menghapus data obat.", "error");
      }
    }
  };

  // Handle Edit - arahkan ke halaman /obat dengan membawa data obat
  const handleEdit = (obat) => {
    navigate("/obat", { state: { editObat: obat } });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
        <ul>
          <li className="mb-4">
            <a href="/datapasien" className="hover:text-green-300">
              Home
            </a>
          </li>
          <li className="mb-4">
            <a href="/jadwaldokter" className="hover:text-green-300">
              Data Pasien
            </a>
          </li>
          <li className="mb-4">
            <a href="/janjitemu" className="hover:text-green-300">
              Laporan
            </a>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-xl font-bold text-green-700 mb-0">
          Manajemen Obat
        </h1>

        {/* Tombol Tambah */}
        <div className="flex justify-end mb-4">
          <Link
            to="/obat"
            className="bg-green-600 text-white px-7 py-2 rounded hover:bg-green-700"
          >
            + Tambah Obat
          </Link>
        </div>

        {/* Pencarian */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari obat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* Tabel Obat */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full min-w-max text-sm border text-left">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="px-4 py-4 border-b">Nama</th>
                <th className="px-4 py-4 border-b">Jenis</th>
                <th className="px-4 py-4 border-b">Deskripsi</th>
                <th className="px-4 py-4 border-b">Stok</th>
                <th className="px-4 py-4 border-b">Harga</th>
                <th className="px-4 py-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((obat) => (
                  <tr key={obat.id} className="hover:bg-green-50">
                    <td className="px-4 py-4 border-b">{obat.name}</td>
                    <td className="px-4 py-4 border-b">{obat.type}</td>
                    <td className="px-4 py-4 border-b">{obat.description}</td>
                    <td className="px-4 py-4 border-b">{obat.stock}</td>
                    <td className="px-4 py-4 border-b">
                      Rp {obat.price?.toLocaleString() || 0}
                    </td>
                    <td className="px-4 py-4 border-b space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(obat)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(obat.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Tidak ada data obat.
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

export default TableObatPage;
