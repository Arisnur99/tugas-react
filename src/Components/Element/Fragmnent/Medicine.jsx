import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Edit, Trash2 } from "lucide-react";

const ObatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    stock: "",
    price: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3001/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrEdit = async () => {
    const { name, type, description, stock, price } = form;

    if (!name || !type || !description || !stock || !price) {
      Swal.fire("Gagal", "Semua kolom wajib diisi!", "warning");
      return;
    }

    if (editMode) {
      await fetch(`http://localhost:3001/medicines/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stock: parseInt(stock),
          price: parseInt(price),
        }),
      });

      Swal.fire("Sukses", "Obat berhasil diperbarui", "success");
      setEditMode(false);
      setEditId(null);
    } else {
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

      Swal.fire("Sukses", "Obat berhasil ditambahkan", "success");
    }

    setForm({ name: "", type: "", description: "", stock: "", price: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus obat ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3001/medicines/${id}`, {
        method: "DELETE",
      });
      fetchData();
      Swal.fire("Terhapus!", "Data obat telah dihapus.", "success");
    }
  };

  const handleEdit = (obat) => {
    setForm({
      name: obat.name,
      type: obat.type,
      description: obat.description,
      stock: obat.stock,
      price: obat.price,
    });
    setEditId(obat.id);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <li className="mb-4">
            <a href="/obat" className="hover:text-green-300 ">
              Data Obat
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

        <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded shadow">
          <h2 className="text-lg md:text-xl font-bold text-green-700 mb-4">
            Manajemen Obat
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
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleAddOrEdit}
                className="bg-green-600 text-white text-sm md:text-base px-4 py-2 rounded hover:bg-green-700"
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

          {/* Tabel Obat */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-sm border text-left">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Jenis</th>
                  <th className="px-4 py-2">Deskripsi</th>
                  <th className="px-4 py-2">Stok</th>
                  <th className="px-4 py-2">Harga</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((obat) => (
                  <tr key={obat.id} className="hover:bg-green-50">
                    <td className="px-4 py-2">{obat.name}</td>
                    <td className="px-4 py-2">{obat.type}</td>
                    <td className="px-4 py-2">{obat.description}</td>
                    <td className="px-4 py-2">{obat.stock}</td>
                    <td className="px-4 py-2">
                      Rp {obat.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(obat)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(obat.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {medicines.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Tidak ada data obat.
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

export default ObatPage;
