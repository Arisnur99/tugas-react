import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddDokter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    spesialis: "",
    jadwal: "",
  });

  const [editing, setEditing] = useState(false);

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
      ? `http://localhost:3001/doctors/${form.id}`
      : "http://localhost:3001/doctors";
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-sm">
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-50 text-base">
        <h2 className="text-2xl font-bold mb-6 leading-tight">
          Puskesmas <br /> Bina Desa
        </h2>
        <ul className="space-y-4">
          <li>
            <a
              href="dashboard"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a href="patients" className="block hover:bg-green-600 p-2 rounded">
              Pasien
            </a>
          </li>
          <li>
            <a
              href="tabledokter"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Janji Dokter
            </a>
          </li>
          <li>
            <a
              href="tablesjanji"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Table Janji
            </a>
          </li>
          <li>
            <a
              href="tableobat"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Obat
            </a>
          </li>
        </ul>
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="dashboard"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="patients"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Pasien
              </a>
            </li>
            <li>
              <a
                href="tabledokter"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Janji Dokter
              </a>
            </li>
            <li>
              <a
                href="tablesjanji"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Table Janji
              </a>
            </li>
            <li>
              <a
                href="tableobat"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Obat
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        {/* Toggle Button Mobile */}
        <button
          className="text-2xl text-green-700 mb-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

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

          <div className="flex gap-2 flex-wrap">
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
