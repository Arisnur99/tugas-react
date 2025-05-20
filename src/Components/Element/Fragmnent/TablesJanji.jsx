import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const statusColor = {
  Terkonfirmasi: "text-green-600 bg-green-100",
  Menunggu: "text-yellow-600 bg-yellow-100",
  Batal: "text-red-600 bg-red-100",
};

function JanjiPasien() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchAppointments = () => {
    fetch("http://localhost:3001/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:3001/appointments/${id}`, {
        method: "DELETE",
      });
      fetchAppointments();
      Swal.fire("Terhapus!", "Janji temu berhasil dihapus.", "success");
    }
  };

  const handleEdit = (id) => {
    navigate(`/janjidokter/${id}`);
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patient &&
      appt.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h1>
        <ul className="space-y-4">
          <li className="mb-4">
            <a
              href="dashboard"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="patients" className="block hover:bg-green-600 p-2 rounded">
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
          console.log("fetchAppointments function called");
          console.log("useEffect hook called"); console.log("handleDelete
          function called"); console.log("handleEdit function called");
          console.log("filteredAppointments:", filteredAppointments);
          console.log("appointments:", appointments); console.log("searchTerm:",
          searchTerm);
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header + Search + Button */}
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-700">
            Janji Temu Pasien
          </h2>
          <button
            onClick={() => navigate("/janjidokter")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Tambah Janji
          </button>
        </div>

        {/* Search Input - moved just above table */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari nama pasien..."
            className="px-3 py-2 border rounded w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabel Janji Temu */}
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama Pasien</th>
                <th className="px-4 py-3">Dokter</th>
                <th className="px-4 py-3">Spesialis</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt, i) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{appt.patient}</td>
                  <td className="px-4 py-3">{appt.doctor}</td>
                  <td className="px-4 py-3">{appt.spesialis}</td>
                  <td className="px-4 py-3">{appt.date}</td>
                  <td className="px-4 py-3">{appt.time}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${
                        statusColor[appt.status] || "bg-gray-100"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(appt.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(appt.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Tidak ada janji temu yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JanjiPasien;
