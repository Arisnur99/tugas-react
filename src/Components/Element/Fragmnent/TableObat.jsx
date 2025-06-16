import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaBars } from "react-icons/fa";

const TableObatPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch medicines from server
  const fetchMedicines = async () => {
    try {
      const res = await fetch("http://localhost:3001/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((obat) =>
    obat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Delete with confirmation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3001/medicines/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Medicine data has been deleted.", "success");
        fetchMedicines(); // refresh data
      } catch (error) {
        Swal.fire("Failed!", "Failed to delete medicine data.", "error");
      }
    }
  };

  // Handle Edit - navigate to /obat with medicine data
  const handleEdit = (obat) => {
    navigate("/obat", { state: { editObat: obat } });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Overlay untuk sidebar di HP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
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
              to="dashboard"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="patients"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Pasien
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="tabledokter"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Janji Dokter
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="tablesjanji"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Table Janji
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="tableobat"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Obat
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="datamedis"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Tenaga Medis
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="rekammedis"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Rekam Medis
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 z-0">
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-green-700 mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <FaBars size={24} />
        </button>

        <h1 className="text-xl font-bold text-green-700 mb-0">
          Manajemen Obat
        </h1>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <Link
            to="/obat"
            className="bg-green-600 text-white px-7 py-2 rounded hover:bg-green-700"
          >
            + Tambah Obat
          </Link>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari obat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Tampilan Kartu untuk Mobile */}
        <div className="grid grid-cols-1 sm:hidden gap-4">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((obat) => (
              <div
                key={obat.id}
                className="bg-white p-4 rounded shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-green-700">
                  {obat.name}
                </h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Jenis:</span> {obat.type}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Deskripsi:</span>{" "}
                  {obat.description}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Stok:</span> {obat.stock}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Harga:</span> Rp{" "}
                  {obat.price?.toLocaleString() || 0}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(obat)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(obat.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tidak ada data obat.</p>
          )}
        </div>

        {/* Tampilan Tabel untuk Desktop */}
        <div className="overflow-x-auto hidden sm:block bg-white rounded shadow">
          <table className="w-full min-w-max text-sm border text-left">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Jenis</th>
                <th className="p-3 border">Deskripsi</th>
                <th className="p-3 border">Stok</th>
                <th className="p-3 border">Harga</th>
                <th className="p-3 border">Aksi</th>
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
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(obat.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <FaTrash />
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
