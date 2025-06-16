import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-700 text-white p-4 z-50 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:z-auto`}
      >
        <h2 className="text-2xl font-bold mb-6">Puskesmas Bina Desa</h2>
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/patients"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Pasien
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/tabledokter"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Janji Dokter
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/tablesjanji"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Table Janji
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/tableobat"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Obat
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/datamedis"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Tenaga Medis
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/rekammedis"
              className="block hover:bg-green-600 p-2 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Rekam Medis
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-green-700 mb-4"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka Menu Sidebar"
        >
          <FaBars size={24} />
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
      </main>
    </div>
  );
};

export default ObatPage;
