import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBars } from "react-icons/fa";

function Manajemen() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", age: "" });
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
      setForm({ name: "", age: "" });
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
    setForm({ name: patient.name, age: patient.age });
    setEditId(patient.id);
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div
        className={`
    bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-20
    transform transition-transform duration-300
    -translate-x-full
    ${sidebarOpen ? "translate-x-0" : ""}
  `}
      >
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
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

      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <button
          className="text-white p-2 bg-green-700 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-center font-bold text-3xl text-green-700">
            Manajemen Pasien Puskesmas Bina Desa
          </p>
          <br />
          <br />
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Nama"
              className="border p-2 rounded w-1/3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Umur"
              className="border p-2 rounded w-1/4"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editId ? "Update" : "Tambah"}
            </button>
          </div>

          <input
            type="text"
            placeholder="Cari pasien..."
            className="border p-2 rounded mb-4 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="w-full table-auto border">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Umur</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id} className="border-b">
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">{patient.age}</td>
                  <td className="p-2 space-x-2">
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
  );
}

export default Manajemen;
