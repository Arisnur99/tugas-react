import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Manajemen() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    phone: "",
    diagnosis: "",
    medicalHistory: "",
    appointmentCare: "",
    status: "",
  });
  const [editId, setEditId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:3001/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.age) return alert("Lengkapi data pasien.");
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:3001/patients/${editId}`
      : "http://localhost:3001/patients";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        name: "",
        age: "",
        address: "",
        phone: "",
        diagnosis: "",
        medicalHistory: "",
        appointmentCare: "",
        status: "",
      });
      setEditId(null);
      fetchPatients();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin hapus pasien ini?")) return;
    await fetch(`http://localhost:3001/patients/${id}`, { method: "DELETE" });
    fetchPatients();
  };

  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      age: patient.age,
      address: patient.address,
      phone: patient.phone,
      diagnosis: patient.diagnosis,
      medicalHistory: patient.medicalHistory,
      appointmentCare: patient.appointmentCare,
      status: patient.status,
    });
    setEditId(patient.id);
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-20 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            className="text-white text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ❌
          </button>
        </div>

        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-green-300">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-green-300">
              Pasien
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-green-300">
              Laporan
            </a>
          </li>
        </ul>
      </div>
      <button
        className="fixed top-4 left-4 z-30 text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg shadow-lg text-lg font-semibold transition duration-300"
        onClick={() => setSidebarOpen(true)}
      >
        ☰ Menu
      </button>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Mobile Menu Button */}
        <button
          className="text-2xl text-green-700 mb-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        <div className="bg-white p-4 rounded shadow">
          <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl text-green-700 mb-6">
            Manajemen Pasien Puskesmas Bina Desa
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
            <input
              type="text"
              placeholder="Nama"
              className="border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Umur"
              className="border p-2 rounded"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Alamat"
              className="border p-2 rounded"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telepon"
              className="border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Diagnosis"
              className="border p-2 rounded"
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
            />
            <input
              type="text"
              placeholder="Riwayat Medis"
              className="border p-2 rounded"
              value={form.medicalHistory}
              onChange={(e) =>
                setForm({ ...form, medicalHistory: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Janji Temu"
              className="border p-2 rounded"
              value={form.appointmentCare}
              onChange={(e) =>
                setForm({ ...form, appointmentCare: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Status Pasien"
              className="border p-2 rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded mb-6 w-full sm:w-auto"
          >
            {editId ? "Update" : "Tambah"}
          </button>

          <input
            type="text"
            placeholder="Cari pasien..."
            className="border p-2 rounded mb-4 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-green-700 text-white whitespace-nowrap">
                <tr>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Umur</th>
                  <th className="p-2">Alamat</th>
                  <th className="p-2">Telepon</th>
                  <th className="p-2">Diagnosis</th>
                  <th className="p-2">Riwayat Medis</th>
                  <th className="p-2">Perawatan</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient) => (
                  <tr key={patient.id} className="border-b">
                    <td className="p-2 whitespace-nowrap">{patient.name}</td>
                    <td className="p-2 whitespace-nowrap">{patient.age}</td>
                    <td className="p-2 whitespace-nowrap">{patient.address}</td>
                    <td className="p-2 whitespace-nowrap">{patient.phone}</td>
                    <td className="p-2 whitespace-nowrap">
                      {patient.diagnosis}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {patient.medicalHistory}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {patient.appointmentCare}
                    </td>
                    <td className="p-2 whitespace-nowrap">{patient.status}</td>
                    <td className="p-2 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manajemen;
