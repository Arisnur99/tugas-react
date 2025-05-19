import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const ObatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    stock: "",
    price: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (location.state?.editObat) {
      const obat = location.state.editObat;
      setForm({
        name: obat.name || "",
        type: obat.type || "",
        description: obat.description || "",
        stock: obat.stock || "",
        price: obat.price || "",
      });
      setEditId(obat.id);
      setEditMode(true);
    }
  }, [location.state]);

  const handleAddOrEdit = async () => {
    const { name, type, description, stock, price } = form;

    if (!name || !type || !description || !stock || !price) {
      Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
      return;
    }

    if (editMode) {
      try {
        await fetch(`http://localhost:3001/medicines/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            stock: parseInt(stock),
            price: parseInt(price),
          }),
        });

        Swal.fire("Sukses", "Obat berhasil diperbarui", "success").then(() => {
          navigate("/tableobat");
        });

        setEditMode(false);
        setEditId(null);
      } catch (error) {
        Swal.fire("Gagal", "Gagal memperbarui data obat.", "error");
      }
    } else {
      try {
        await fetch("http://localhost:3001/medicines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            id: `obat${Date.now()}`,
            stock: parseInt(stock),
            price: parseInt(price),
          }),
        });

        Swal.fire("Sukses", "Obat berhasil ditambahkan", "success").then(() => {
          navigate("/tableobat");
        });
      } catch (error) {
        Swal.fire("Gagal", "Gagal menambahkan data obat.", "error");
      }
    }

    setForm({ name: "", type: "", description: "", stock: "", price: "" });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-green-700 text-white fixed inset-0 z-50 md:relative md:inset-auto md:z-auto md:w-64 p-4 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
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
        <button
          className="md:hidden bg-green-600 mt-4 px-4 py-2 rounded"
          onClick={() => setSidebarOpen(false)}
        >
          Tutup Menu
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-0">
        <button
          className="text-lg text-green-700 mb-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Buka Menu
        </button>

        <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            {editMode ? "Edit Obat" : "Form Tambah Obat"}
          </h2>

          {/* Form Tambah / Edit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Nama Obat"
              className="border px-3 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Jenis"
              className="border px-3 py-2 rounded"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Deskripsi"
              className="border px-3 py-2 rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Stok"
              className="border px-3 py-2 rounded"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            <input
              type="number"
              placeholder="Harga (Rp)"
              className="border px-3 py-2 rounded"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleAddOrEdit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editMode ? "Simpan Perubahan" : "Tambah Obat"}
            </button>
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditId(null);
                  setForm({
                    name: "",
                    type: "",
                    description: "",
                    stock: "",
                    price: "",
                  });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
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

export default ObatPage;
