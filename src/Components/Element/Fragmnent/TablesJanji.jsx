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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = () => {
    fetch("http://localhost:3001/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  };

  useEffect(() => {
    fetchAppointments();
    fetch("http://localhost:3001/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
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
    navigate(`/dokter/${id}`);
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patient &&
      appt.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDoctorNameById = (id) => {
    const doctor = doctors.find((d) => d.id === id);
    return doctor ? doctor.nama : "-";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Overlay Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`bg-green-700 text-white fixed inset-y-0 left-0 z-50 w-64 p-4 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h1>
        <ul className="space-y-4 text-base">
          <li>
            <a
              href="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/patients"
              onClick={() => setSidebarOpen(false)}
              className="block hover:bg-green-600 p-2 rounded"
            >
              Pasien
            </a>
          </li>
          <li>
            <a
              href="/tabledokter"
              onClick={() => setSidebarOpen(false)}
              className="block hover:bg-green-600 p-2 rounded"
            >
              Janji Dokter
            </a>
          </li>
          <li>
            <a
              href="/tablesjanji"
              onClick={() => setSidebarOpen(false)}
              className="block hover:bg-green-600 p-2 rounded"
            >
              Table Janji
            </a>
          </li>
          <li>
            <a
              href="/tableobat"
              onClick={() => setSidebarOpen(false)}
              className="block hover:bg-green-600 p-2 rounded"
            >
              Obat
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {/* Topbar Mobile */}
        <div className="md:hidden mb-4 flex justify-between items-center border-b border-gray-300 pb-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-700 focus:outline-none text-2xl"
            aria-label="Open sidebar"
          >
            ☰
          </button>
        </div>

        {/* Header & Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-700">
            Janji Temu Pasien
          </h2>
          <button
            onClick={() => navigate("/dokter")}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 text-sm md:text-base transition duration-200"
          >
            + Tambah Janji
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama pasien..."
            className="w-45 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabel untuk Desktop */}
        <div className="hidden md:block overflow-x-auto rounded-xl shadow bg-white">
          <table className="w-full table-auto text-sm text-left min-w-[720px]">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="border p-3">#</th>
                <th className="border p-3">Nama Pasien</th>
                <th className="border p-3">Dokter</th>
                <th className="border p-3">Spesialis</th>
                <th className="border p-3">Tanggal</th>
                <th className="border p-3">Waktu</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt, i) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{appt.patient}</td>
                  <td className="px-4 py-2">{getDoctorNameById(appt.doctor)}</td>
                  <td className="px-4 py-2">{appt.spesialis}</td>
                  <td className="px-4 py-2">{appt.date}</td>
                  <td className="px-4 py-2">{appt.time}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full font-medium ${statusColor[appt.status]}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(appt.id)}
                      className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(appt.id)}
                      className="text-red-600 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      <FaTrash /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tampilan Mobile: Card */}
        <div className="md:hidden space-y-4">
          {filteredAppointments.map((appt) => (
            <div key={appt.id} className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold text-green-700">{appt.patient}</div>
              <div className="text-sm text-gray-700">
                <div><span className="font-medium">Dokter:</span> {getDoctorNameById(appt.doctor)}</div>
                <div><span className="font-medium">Spesialis:</span> {appt.spesialis}</div>
                <div><span className="font-medium">Tanggal:</span> {appt.date}</div>
                <div><span className="font-medium">Waktu:</span> {appt.time}</div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full font-medium text-xs ${statusColor[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(appt.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  <FaEdit/> 
                </button>
                <button
                  onClick={() => handleDelete(appt.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  <FaTrash/> 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JanjiPasien;
