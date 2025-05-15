import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const JanjiTemu = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    spesialis: "",
    date: "",
    time: "",
    status: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:3001/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    if (isEditMode) {
      fetch(`http://localhost:3001/appointments/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleSubmit = async () => {
    const { patient, doctor, spesialis, date, time, status } = form;
    if (!patient || !doctor || !spesialis || !date || !time || !status) {
      Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
      return;
    }

    const url = isEditMode
      ? `http://localhost:3001/appointments/${id}`
      : "http://localhost:3001/appointments";
    const method = isEditMode ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      Swal.fire(
        "Sukses",
        `Janji berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}`,
        "success"
      ).then(() => {
        // Arahkan setelah alert ditutup
        navigate("/tablesjanji");
      });

      fetchAppointments();

      // Reset form hanya saat tambah (POST)
      if (!isEditMode) {
        setForm({
          patient: "",
          doctor: "",
          spesialis: "",
          date: "",
          time: "",
          status: "",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block bg-green-700 text-white w-64 p-4 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">
          Puskesmas
          <br />
          Bina Desa
        </h2>
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
      </div>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed bg-green-700 text-white w-64 h-full p-4 z-20 md:hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Puskesmas
                <br />
                Bina Desa
              </h2>
              <button onClick={() => setSidebarOpen(false)}>❌</button>
            </div>
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
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        <button
          className="text-2xl text-green-700 mb-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded shadow">
          <h2 className="text-lg md:text-xl font-bold text-green-700 mb-4">
            Tambah Janji Temu Puskesmas Bina Desa
          </h2>

          {/* Form Tambah Janji Temu */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Nama Pasien"
              className="border px-3 py-2 rounded"
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
            />
            <input
              type="text"
              placeholder="Id Dokter"
              className="border px-3 py-2 rounded"
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            />
            <input
              type="text"
              placeholder="Spesialis"
              className="border px-3 py-2 rounded"
              value={form.spesialis}
              onChange={(e) => setForm({ ...form, spesialis: e.target.value })}
            />
            <input
              type="date"
              className="border px-3 py-2 rounded"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <input
              type="time"
              className="border px-3 py-2 rounded"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            <select
              className="border px-3 py-2 rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="">Pilih Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>

          {!isEditMode && (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white  px-4 py-2 rounded mb-6"
            >
              Tambah Janji
            </button>
          )}

          {isEditMode && (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white  px-4 py-2 rounded mb-6"
            >
              Perbarui Janji
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JanjiTemu;
