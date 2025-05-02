import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const data = {
  doctors: [
    {
      id: "d001",
      name: "dr. Lisa",
      specialty: "Umum",
    },
  ],
  appointments: [
    {
      id: "a001",
      patientId: "2001",
      doctorId: "d001",
      schedule: "2025-06-24T10:00",
      status: "Terjadwal",
    },
  ],
  medicines: [
    {
      id: "obat001",
      name: "Paracetamol",
      type: "Tablet",
      description: "Obat penurun panas dan pereda nyeri",
      stock: 100,
      price: 5000,
    },
    {
      id: "obat002",
      name: "Salbutamol",
      type: "Inhaler",
      description: "Obat untuk mengatasi sesak napas",
      stock: 50,
      price: 25000,
    },
  ],
};

const Tables = () => {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState(data.medicines);
  const [newMed, setNewMed] = useState({
    id: "",
    name: "",
    type: "",
    description: "",
    stock: "",
    price: "",
  });

  const handleEdit = (id) => {
    Swal.fire({
      icon: "info",
      title: "Edit Obat",
      text: `Edit obat dengan ID: ${id}`,
      confirmButtonColor: "#3085d6",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data obat akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/medicines/${id}`)
          .then(() => {
            const updated = medicines.filter((med) => med.id !== id);
            setMedicines(updated);
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Obat berhasil dihapus.",
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Gagal menghapus obat.",
            });
          });
      }
    });
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
        Sistem Informasi Puskesmas Bina Desa
      </h1>

      {/* Dokter */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-5">
          Daftar Dokter
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border shadow-md rounded-xl overflow-hidden">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Nama</th>
                <th className="px-4 py-2 border-b">Spesialis</th>
              </tr>
            </thead>
            <tbody>
              {data.doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border-b">{doc.id}</td>
                  <td className="px-4 py-2 border-b">{doc.name}</td>
                  <td className="px-4 py-2 border-b">{doc.specialty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointments */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Jadwal Janji Temu
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border shadow-md rounded-xl overflow-hidden">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">ID Pasien</th>
                <th className="px-4 py-2 border-b">ID Dokter</th>
                <th className="px-4 py-2 border-b">Jadwal</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.appointments.map((app) => (
                <tr key={app.id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border-b">{app.id}</td>
                  <td className="px-4 py-2 border-b">{app.patientId}</td>
                  <td className="px-4 py-2 border-b">{app.doctorId}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(app.schedule).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Medicines */}
      <div>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Data Obat
        </h2>
        <input
          type="text"
          placeholder="Cari nama obat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 px-4 py-2 border rounded-lg w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {/* Form Tambah Obat */}
        <div className="mb-8 border rounded-xl p-4 bg-blue-50 shadow-md">
          <h3 className="text-lg font-bold text-blue-800 mb-4">
            Tambah Obat Baru
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                !newMed.id ||
                !newMed.name ||
                !newMed.type ||
                !newMed.description ||
                !newMed.stock ||
                !newMed.price
              ) {
                Swal.fire({
                  icon: "warning",
                  title: "Peringatan",
                  text: "Semua field harus diisi!",
                  confirmButtonColor: "#3085d6",
                });

                return;
              }

              setMedicines([...medicines, newMed]);
              setNewMed({
                id: "",
                name: "",
                type: "",
                description: "",
                stock: "",
                price: "",
              });
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Obat berhasil ditambahkan!",
                confirmButtonColor: "#3085d6",
                timer: 2000,
                showConfirmButton: false,
              });
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="ID"
              value={newMed.id}
              onChange={(e) => setNewMed({ ...newMed, id: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Nama"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Tipe"
              value={newMed.type}
              onChange={(e) => setNewMed({ ...newMed, type: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Deskripsi"
              value={newMed.description}
              onChange={(e) =>
                setNewMed({ ...newMed, description: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Stok"
              value={newMed.stock}
              onChange={(e) =>
                setNewMed({ ...newMed, stock: Number(e.target.value) })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Harga"
              value={newMed.price}
              onChange={(e) =>
                setNewMed({ ...newMed, price: Number(e.target.value) })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-2"
              >
                Tambahkan Obat
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border shadow-md rounded-xl overflow-hidden">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Nama</th>
                <th className="px-4 py-2 border-b">Tipe</th>
                <th className="px-4 py-2 border-b">Deskripsi</th>
                <th className="px-4 py-2 border-b">Stok</th>
                <th className="px-4 py-2 border-b">Harga</th>
                <th className="px-4 py-2 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((med) => (
                <tr key={med.id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border-b">{med.id}</td>
                  <td className="px-4 py-2 border-b">{med.name}</td>
                  <td className="px-4 py-2 border-b">{med.type}</td>
                  <td className="px-4 py-2 border-b">{med.description}</td>
                  <td className="px-4 py-2 border-b">{med.stock}</td>
                  <td className="px-4 py-2 border-b">
                    Rp{med.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(med.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(med.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMedicines.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Tidak ada obat ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tables;
