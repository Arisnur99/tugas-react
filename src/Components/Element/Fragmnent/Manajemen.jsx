import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Manajemen() {
  const [Patientable, setPatientTable] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    alamat: "",
    diagnosis: "",
    medicalHistory: "",
  });
  const [editId, setEditId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        alamat: "",
        diagnosis: "",
        medicalHistory: "",
      });
      setEditId(null);

      setTimeout(() => {
        navigate("/patients");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  };

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
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:block bg-green-700 text-white w-64 h-full p-4 fixed top-0 left-0 z-20">
        <h2 className="text-2xl font-bold mb-6">
          Puskesmas <br /> Bina Desa
        </h2>
        <ul>
          <li className="mb-4">
            <a
              href="dashboard"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="patients" className="block hover:bg-green-600 p-2 rounded">
              Pasien
            </a>
          </li>
          <li className="mb-4">
            <a
              href="tabledokter"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Janji Dokter
            </a>
          </li>
          <li className="mb-4">
            <a
              href="tablesjanji"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Table Janji
            </a>
          </li>
          <li className="mb-4">
            <a
              href="tableobat"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Obat
            </a>
          </li>
          <li className="mb-4">
            <a
              href="datamedis"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Tenaga Medis
            </a>
          </li>
          <li className="mb-4">
            <a
              href="rekammedis"
              className="block hover:bg-green-600 p-2 rounded"
            >
              Rekam Medis
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
          <ul>
            <li className="mb-4">
              <a
                href="dashboard"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="patients"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Pasien
              </a>
            </li>
            <li className="mb-4">
              <a
                href="tabledokter"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Janji Dokter
              </a>
            </li>
            <li className="mb-4">
              <a
                href="tablesjanji"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Table Janji
              </a>
            </li>
            <li className="mb-4">
              <a
                href="tableobat"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Obat
              </a>
            </li>
            <li className="mb-4">
              <a
                href="datamedis"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Tenaga Medis
              </a>
            </li>
            <li className="mb-4">
              <a
                href="rekammedis"
                className="block hover:bg-green-600 p-2 rounded"
              >
                Rekam medis
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

        <div className="bg-white p-4 rounded shadow">
          <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl text-green-700 mb-6">
            Manajemen Pasien Puskesmas Bina Desa
          </h1>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              ["Nama", "name"],
              ["Umur", "age", "number"],
              ["Tanggal Lahir", "address"],
              ["Alamat", "alamat"],
              ["No Telephone", "diagnosis"],
              ["Gender", "medicalHistory"],
            ].map(([placeholder, key, type = "text"]) => (
              <input
                key={key}
                type={type}
                placeholder={placeholder}
                className="border p-2 rounded w-full"
                value={form[key] || ""}
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
        </div>
      </div>
    </div>
  );
}

export default Manajemen;
