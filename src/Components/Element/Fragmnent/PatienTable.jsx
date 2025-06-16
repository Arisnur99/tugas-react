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
      fetchPatients();
    }
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 bg-green-700 text-white w-64 p-6 z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:block`}
        >
          <h1 className="text-2xl font-bold mb-8">
            Puskesmas <br /> Bina Desa
          </h1>
          <nav className="mb-4">
            <ul>
              <li className="mb-4">
                <a
                  href="dashboard"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="patients"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Pasien
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="tabledokter"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Janji Dokter
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="tablesjanji"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Table Janji
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="tableobat"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Obat
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="datamedis"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Tenaga Medis
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="rekammedis"
                  className="block hover:bg-green-600 p-2 rounded"
                >
                  Rekam Medis
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Konten */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 relative z-10">
          {/* Tombol Toggle Sidebar (HP) */}
          <div className="md:hidden flex items-center mb-4 space-x-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-700 text-xl"
              aria-label="Toggle sidebar menu"
            >
              <FaBars />
            </button>
            <h2 className="text-lg font-semibold text-green-700">
              Daftar Pasien
            </h2>
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
            className="max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Tabel untuk Laptop/Desktop */}
          <div className="hidden md:block w-full overflow-x-auto bg-white rounded-lg shadow mt-6">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="p-3 border">Nama</th>
                  <th className="p-3 border">Umur</th>
                  <th className="p-3 border">Tanggal Lahir</th>
                  <th className="p-3 border">Alamat</th>
                  <th className="p-3 border">No Telephone</th>
                  <th className="p-3 border">Gender</th>
                  <th className="p-3 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-gray-100 text-gray-700"
                    >
                      <td className="p-3 border">{patient.name}</td>
                      <td className="p-3 border">{patient.age}</td>
                      <td className="p-3 border">{patient.address}</td>
                      <td className="p-3 border">{patient.alamat}</td>
                      <td className="p-3 border">{patient.diagnosis}</td>
                      <td className="p-3 border">{patient.medicalHistory}</td>

                      <td className="p-3 border text-center space-x-2">
                        <Link
                          to={`/manajemen?id=${patient.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-4 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card untuk Mobile/HP */}
          <div className="md:hidden space-y-4">
            {filtered.length > 0 ? (
              filtered.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white p-4 rounded-lg shadow text-sm text-gray-700"
                >
                  <p>
                    <span className="font-semibold">Nama:</span> {patient.name}
                  </p>
                  <p>
                    <span className="font-semibold">Umur:</span> {patient.age}
                  </p>
                  <p>
                    <span className="font-semibold">Tanggal Lahir:</span>{" "}
                    {patient.address}
                  </p>
                  <p>
                    <span className="font-semibold">Alamat:</span>{" "}
                    {patient.phone}
                  </p>
                  <p>
                    <span className="font-semibold">No Telephone:</span>{" "}
                    {patient.diagnosis}
                  </p>
                  <p>
                    <span className="font-semibold">Gender:</span>{" "}
                    {patient.medicalHistory}
                  </p>

                  <div className="flex items-center mt-2 gap-3">
                    <Link
                      to={`/manajemen?id=${patient.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                Tidak ada data ditemukan.
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default PatienTable;
