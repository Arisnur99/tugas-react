import { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import PatienTable from "./PatienTable";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Manajemen() {
  const [Patientable, setPatientTable] = useState([]);

  const navigate = useNavigate();

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
    setPatientTable(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async () => {
    const isFormValid = Object.values(form).every((val) => val.trim() !== "");
    if (!isFormValid) {
      Swal.fire({
        icon: "warning",
        title: "Lengkapi Data!",
        text: "Harap isi semua field sebelum menyimpan.",
      });
      return;
    }

    const result = await Swal.fire({
      title: editId
        ? "Yakin ingin update data pasien ini?"
        : "Yakin ingin simpan data pasien ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: editId ? "Ya, update!" : "Ya, simpan!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

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
      Swal.fire({
        icon: "success",
        title: editId ? "Berhasil diupdate!" : "Berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500,
      });

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

      setTimeout(() => {
        navigate("/patients"); // sesuaikan dengan rute daftar pasien
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      setEditId(id);
      fetch(`http://localhost:3001/patients/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm(data);
        });
    }
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-20">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-green-300">
              Home
            </a>
          </li>
          <li className="mb-4">
            <a href="datapasien" className="hover:text-green-300">
              Data Pasien
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-green-300">
              Laporan
            </a>
          </li>
        </ul>
      </div>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed bg-green-700 text-white w-64 h-full p-4 top-0 left-0 z-30 md:hidden">
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
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-green-300">
                Data Pasien
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-green-300">
                Laporan
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-64">
        {/* Menu Button Mobile */}
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

          {/* Form Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              ["Nama", "name"],
              ["Umur", "age", "number"],
              ["Alamat", "address"],
              ["Telepon", "phone"],
              ["Diagnosis", "diagnosis"],
              ["Riwayat Medis", "medicalHistory"],
              ["Janji Temu", "appointmentCare"],
              ["Status Pasien", "status"],
            ].map(([placeholder, key, type = "text"]) => (
              <input
                key={key}
                type={type}
                placeholder={placeholder}
                className="border p-2 rounded w-full"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-3 rounded w-full sm:w-auto"
            >
              {editId ? "Update" : "Tambah"}
            </button>
          </div>

          {/* Tabel Pasien
          <PatienTable data={Patientable} search={search} setForm={setForm} setEditId={setEditId} fetchPatients={fetchPatients} /> */}
        </div>
      </div>
    </div>
  );
}

export default Manajemen;
