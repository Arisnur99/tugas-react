import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const JanjiTemu = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
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

  const fetchDoctors = async () => {
    const res = await fetch("http://localhost:3001/doctors");
    const data = await res.json();
    setDoctors(data);
  };

  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (form.doctor && doctors.length > 0) {
      const selectedDoctor = doctors.find((d) => d.id === form.doctor);
      if (selectedDoctor && form.spesialis !== selectedDoctor.spesialis) {
        setForm((prev) => ({
          ...prev,
          spesialis: selectedDoctor.spesialis,
        }));
      }
    }
  }, [form.doctor, doctors]);

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
      ).then(() => navigate("/tablesjanji"));

      fetchAppointments();

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
      {/* Sidebar desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 p-4 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">
          Puskesmas
          <br />
          Bina Desa
        </h2>
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
      </div>

      {/* Sidebar mobile + overlay */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar Mobile */}
        {/* Sidebar Mobile */}
        <div
          className={`fixed top-0 left-0 bg-green-700 text-white w-64 h-full p-4 z-20 transform transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Puskesmas
              <br />
              Bina Desa
            </h2>
          </div>
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
        </div>
      </>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        {/* Toggle button mobile */}
        <button
          className="text-2xl text-green-700 mb-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded shadow">
          <h2 className="text-lg md:text-xl font-bold text-green-700 mb-4">
            {isEditMode ? "Perbarui" : "Tambah"} Janji Temu Puskesmas Bina Desa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Nama Pasien"
              className="border px-3 py-2 rounded"
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
            />

            <select
              className="border px-3 py-2 rounded"
              value={form.doctor}
              onChange={(e) => {
                const selectedDoctorId = e.target.value;
                const selectedDoctor = doctors.find(
                  (d) => d.id === selectedDoctorId
                );
                setForm((prev) => ({
                  ...prev,
                  doctor: selectedDoctorId,
                  spesialis: selectedDoctor?.spesialis || "",
                }));
              }}
            >
              <option value="">Pilih Dokter</option>
              {doctors.map((dokter) => (
                <option key={dokter.id} value={dokter.id}>
                  {dokter.nama} - ID: {dokter.id} (Spesialis {dokter.spesialis})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Spesialis"
              className="border px-3 py-2 rounded"
              value={form.spesialis}
              readOnly
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

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded mb-6"
          >
            {isEditMode ? "Perbarui Janji" : "Tambah Janji"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JanjiTemu;
