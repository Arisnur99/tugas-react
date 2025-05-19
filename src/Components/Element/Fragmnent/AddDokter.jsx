import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddDokter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    nama: "",
    spesialis: "",
    jadwal: "",
  });

  const [editing, setEditing] = useState(false);

  // Prefill jika ada data dari route state (untuk edit)
  useEffect(() => {
    if (location.state) {
      setForm(location.state);
      setEditing(true);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    const { nama, spesialis, jadwal } = form;

    if (!nama || !spesialis || !jadwal) {
      Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
      return;
    }

    const url = editing
      ? `http://localhost:3001/dokter/${form.id}`
      : "http://localhost:3001/dokter";
    const method = editing ? "PUT" : "POST";

    const dataToSend = editing
      ? { id: form.id, nama, spesialis, jadwal }
      : { nama, spesialis, jadwal };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      Swal.fire(
        "Sukses",
        editing ? "Data dokter diperbarui" : "Dokter ditambahkan",
        "success"
      ).then(() => {
        navigate("/tabledokter");
      });

      setForm({ nama: "", spesialis: "", jadwal: "" });
      setEditing(false);
    } else {
      Swal.fire("Gagal", "Terjadi kesalahan", "error");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-4 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
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
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6 bg-gray-100">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            {editing ? "Edit Dokter" : "Form Dokter"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nama Dokter"
              className="border px-3 py-2 rounded"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
            <input
              type="text"
              placeholder="Spesialis"
              className="border px-3 py-2 rounded"
              value={form.spesialis}
              onChange={(e) => setForm({ ...form, spesialis: e.target.value })}
            />
            <input
              type="text"
              placeholder="Jadwal (cth: Senin & Rabu)"
              className="border px-3 py-2 rounded"
              value={form.jadwal}
              onChange={(e) => setForm({ ...form, jadwal: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editing ? "Update" : "Tambah"}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setForm({ nama: "", spesialis: "", jadwal: "" });
                  setEditing(false);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDokter;
