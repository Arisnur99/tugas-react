import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FormRekamMedis() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    id_pasien: "",
    tanggal: "",
    keluhan: "",
    diagnosa: "",
    tindakan: "",
    obat: "",
  });
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      ...form,
      id_pasien: parseInt(form.id_pasien),
      obat: form.obat.split(",").map((item) => item.trim()),
    };

    const res = await fetch("http://localhost:3001/rekam_medis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    if (res.ok) {
      Swal.fire("Berhasil!", "Rekam medis berhasil ditambahkan", "success");
      setForm({
        id_pasien: "",
        tanggal: "",
        keluhan: "",
        diagnosa: "",
        tindakan: "",
        obat: "",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-50 text-base">
        <h2 className="text-2xl font-bold mb-6 leading-tight">
          Puskesmas <br /> Bina Desa
        </h2>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="block hover:bg-green-600 p-2 rounded">Dashboard</a></li>
          <li><a href="/patients" className="block hover:bg-green-600 p-2 rounded">Pasien</a></li>
          <li><a href="/tabledokter" className="block hover:bg-green-600 p-2 rounded">Janji Dokter</a></li>
          <li><a href="/tablesjanji" className="block hover:bg-green-600 p-2 rounded">Table Janji</a></li>
          <li><a href="/tableobat" className="block hover:bg-green-600 p-2 rounded">Obat</a></li>
          <li><a href="/datamedis" className="block hover:bg-green-600 p-2 rounded">Tenaga Medis</a></li>
          <li><a href="/rekammedis" className="block hover:bg-green-600 p-2 rounded">Rekam Medis</a></li>
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
            <li><a href="/dashboard" className="block hover:bg-green-600 p-2 rounded">Dashboard</a></li>
            <li><a href="/patients" className="block hover:bg-green-600 p-2 rounded">Pasien</a></li>
            <li><a href="/tabledokter" className="block hover:bg-green-600 p-2 rounded">Janji Dokter</a></li>
            <li><a href="/tablesjanji" className="block hover:bg-green-600 p-2 rounded">Table Janji</a></li>
            <li><a href="/tableobat" className="block hover:bg-green-600 p-2 rounded">Obat</a></li>
            <li><a href="/datamedis" className="block hover:bg-green-600 p-2 rounded">Tenaga Medis</a></li>
            <li><a href="/rekammedis" className="block hover:bg-green-600 p-2 rounded">Rekam Medis</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        {/* Button Toggle Mobile */}
        <div className="flex items-center gap-4 mb-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-green-700 text-xl"
          >
            <FaBars />
          </button>
          <h2 className="text-xl font-bold text-green-700">Rekam Medis</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-green-700">Form Rekam Medis</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Pasien</label>
              <select
                name="id_pasien"
                value={form.id_pasien}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">-- Pilih Pasien --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.nama}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Keluhan</label>
              <input
                type="text"
                name="keluhan"
                value={form.keluhan}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Diagnosa</label>
              <input
                type="text"
                name="diagnosa"
                value={form.diagnosa}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Tindakan</label>
              <input
                type="text"
                name="tindakan"
                value={form.tindakan}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Obat (pisahkan dengan koma)</label>
              <input
                type="text"
                name="obat"
                value={form.obat}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
