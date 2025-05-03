import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaCalendarAlt, FaHome, FaUser } from "react-icons/fa";

const statusColor = {
  Terkonfirmasi: "text-green-600 bg-green-100",
  Menunggu: "text-yellow-600 bg-yellow-100",
  Batal: "text-red-600 bg-red-100",
};

function JanjiPasien() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      nama: "Ahmad Fadli",
      tanggal: "2025-05-04",
      waktu: "09:00",
      dokter: "dr. Siti Aminah",
      status: "Terkonfirmasi",
    },
  ]);

  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
    waktu: "",
    dokter: "",
    status: "Menunggu",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddOrEdit = () => {
    if (!form.nama || !form.tanggal || !form.waktu || !form.dokter) {
      Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
      return;
    }

    if (editingId) {
      setAppointments(appointments.map((appt) =>
        appt.id === editingId ? { ...appt, ...form } : appt
      ));
      Swal.fire("Sukses", "Janji temu berhasil diperbarui!", "success");
    } else {
      const newAppointment = { id: Date.now(), ...form };
      setAppointments([...appointments, newAppointment]);
      Swal.fire("Sukses", "Janji temu berhasil ditambahkan!", "success");
    }

    setForm({ nama: "", tanggal: "", waktu: "", dokter: "", status: "Menunggu" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (appt) => {
    setForm(appt);
    setEditingId(appt.id);
    setShowForm(true);
  };

  useEffect(() => {
    fetch("http://localhost:3001/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setAppointments(appointments.filter((appt) => appt.id !== id));
        Swal.fire("Terhapus!", "Janji temu berhasil dihapus.", "success");
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">Puskesmas <br /> Bina Desa</h1>
        <ul className="space-y-4">
          <li className="hover:bg-green-500 flex items-center gap-2 cursor-pointer">
            <FaHome /> Beranda
          </li>
          <li className="hover:bg-green-500 flex items-center gap-2 cursor-pointer">
            <FaCalendarAlt /> Janji Temu
          </li>
          <li className=" hover:bg-green-500 flex items-center gap-2 cursor-pointer">
            <FaUser /> Pasien
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">Janji Temu Pasien</h2>
          <button
            onClick={() => {
              setForm({ nama: "", tanggal: "", waktu: "", dokter: "", status: "Menunggu" });
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Tambah Janji Temu
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Dokter</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, i) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{appt.nama}</td>
                  <td className="px-4 py-3">{appt.tanggal}</td>
                  <td className="px-4 py-3">{appt.waktu}</td>
                  <td className="px-4 py-3">{appt.dokter}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full font-medium ${statusColor[appt.status]}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(appt)}
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
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold text-center">
                {editingId ? "Edit Janji Temu" : "Tambah Janji Temu"}
              </h3>
              <input
                type="text"
                placeholder="Nama Pasien"
                className="w-full border px-3 py-2 rounded"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              />
              <input
                type="time"
                className="w-full border px-3 py-2 rounded"
                value={form.waktu}
                onChange={(e) => setForm({ ...form, waktu: e.target.value })}
              />
              <input
                type="text"
                placeholder="Dokter"
                className="w-full border px-3 py-2 rounded"
                value={form.dokter}
                onChange={(e) => setForm({ ...form, dokter: e.target.value })}
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Menunggu">Menunggu</option>
                <option value="Terkonfirmasi">Terkonfirmasi</option>
                <option value="Batal">Batal</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddOrEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JanjiPasien;