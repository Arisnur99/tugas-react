import { FaEdit, FaTrash, FaPlus, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PatienTable = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:3001/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin hapus pasien ini?",
      text: "Data pasien yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:3001/patients/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Terhapus!", "Data pasien berhasil dihapus.", "success");
      fetchPatients(); // refresh data
    }
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-green-700 text-white p-6 space-y-4 ${
          menuOpen ? "block" : "hidden"
        } md:block`}
      >
        <h1 className="text-2xl font-bold mb-8">
          Puskesmas <br /> Bina Desa
        </h1>
        <nav className="space-y-3">
          <ul>
            <li className="mb-4">
              <a href="dashboard" className="hover:text-green-300">
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a href="patients" className="hover:text-green-300">
                Pasien
              </a>
            </li>
            <li className="mb-4">
              <a href="tabledokter" className="hover:text-green-300">
                Janji Dokter
              </a>
            </li>
            <li className="mb-4">
              <a href="tablesjanji" className="hover:text-green-300">
                Table Janji
              </a>
            </li>
            <li className="mb-4">
              <a href="tableobat" className="hover:text-green-300">
                Obat
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100">
        {/* Tombol Toggle Sidebar (HP) */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-700">
            Daftar Pasien
          </h2>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-green-700 text-xl"
          >
            <FaBars />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="hidden md:block text-xl font-semibold text-green-700">
            Daftar Pasien
          </h2>
          <Link
            to="/manajemen"
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition text-sm"
          >
            <FaPlus />
            Tambah Pasien
          </Link>
        </div>

        <input
          type="text"
          placeholder="Cari pasien..."
          className="border p-2 rounded mb-4 w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border border-collapse text-xs sm:text-sm md:text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Umur</th>
                <th className="p-2 border">Alamat</th>
                <th className="p-2 border">Telepon</th>
                <th className="p-2 border">Diagnosis</th>
                <th className="p-2 border">Riwayat medis</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-100">
                    <td className="p-2 border">{patient.name}</td>
                    <td className="p-2 border">{patient.age}</td>
                    <td className="p-2 border">{patient.address}</td>
                    <td className="p-2 border">{patient.phone}</td>
                    <td className="p-2 border">{patient.diagnosis}</td>
                    <td className="p-2 border">{patient.medicalHistory}</td>
                    <td className="p-2 border">{patient.status}</td>
                    <td className="p-2 border text-center space-x-2">
                      {/* Tombol edit bisa diaktifkan kembali jika mau bawa ke manajemen */}
                      <Link
                        to={`/manajemen?id=${patient.id}`}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    Tidak ada data ditemukan.
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

export default PatienTable;
