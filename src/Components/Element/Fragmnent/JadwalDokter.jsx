
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


const JanjiTemu = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    id: null,
    patient: "",
    doctor: "",
    spesialis: "",
    date: "",
    time: "",
    status: "",
  });
  const [editing, setEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:3001/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async () => {
    const { patient, doctor, spesialis, date, time, status } = form;
    if (!patient || !doctor || !spesialis || !date || !time || !status) {
      Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
      return;
    }

    const url = editing
      ? `http://localhost:3001/appointments/${form.id}`
      : "http://localhost:3001/appointments";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      Swal.fire(
        "Sukses",
        editing ? "Janji diperbarui" : "Janji ditambahkan",
        "success"
      );
      fetchAppointments();
      setForm({
        id: null,
        patient: "",
        doctor: "",
        spesialis: "",
        date: "",
        time: "",
        status: "",
      });
      setEditing(false);
    } else {
      Swal.fire("Error", "Gagal menyimpan data", "error");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus janji ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3001/appointments/${id}`, {
        method: "DELETE",
      });
      fetchAppointments();
      Swal.fire("Terhapus!", "Data janji temu telah dihapus.", "success");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 p-4 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">
          Puskesmas
          <br />
          Bina Desa
        </h2>
        <ul>
          <li className="mb-4">
            <a href="/datapasien" className="hover:text-green-300">
              Data Pasien
            </a>
          </li>
          <li className="mb-4">
            <a href="/jadwaldokter" className="hover:text-green-300">
              Jadwal Dokter
            </a>
          </li>
          <li className="mb-4">
            <a href="/janjitemu" className="hover:text-green-300">
              Janji Temu
            </a>
          </li>
        </ul>
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {sidebarOpen && (
        <div className="fixed bg-green-700 text-white w-64 h-full p-4 z-20 md:hidden transition-transform duration-300 transform">
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
                Data Pasien
              </a>
            </li>
            <li className="mb-4">
              <a href="/jadwaldokter" className="hover:text-green-300">
                Jadwal Dokter
              </a>
            </li>
            <li className="mb-4">
              <a href="/janjitemu" className="hover:text-green-300">
                Janji Temu
              </a>
            </li>
          </ul>
        </div>
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
            Jadwal Dokter Puskesmas Bina Desa
          </h2>

          {/* Form Input */}
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
              placeholder="Nama Dokter"
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

          {/* Tombol Submit */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editing ? "Update" : "Tambah"}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setForm({
                    id: null,
                    patient: "",
                    doctor: "",
                    spesialis: "",
                    date: "",
                    time: "",
                    status: "",
                  });
                  setEditing(false);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            )}
          </div>

          {/* Tabel Janji Temu */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-[600px] w-full text-sm text-left border">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-4 py-2">Pasien</th>
                  <th className="px-4 py-2">Dokter</th>
                  <th className="px-4 py-2">Spesialis</th>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Waktu</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item.id} className="hover:bg-green-50">
                    <td className="px-4 py-2">{item.patient}</td>
                    <td className="px-4 py-2">{item.doctor}</td>
                    <td className="px-4 py-2">{item.spesialis}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.time}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      Tidak ada janji temu.
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

export default JanjiTemu;
