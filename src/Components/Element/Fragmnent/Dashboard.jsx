import { useState, useEffect } from "react";
import {
  FaUserInjured,
  FaStethoscope,
  FaCalendarCheck,
  FaHeartbeat,
  FaPills,
  FaBars,
} from "react-icons/fa";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    visits: 0,
    medicines: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes, medicinesRes] =
        await Promise.all([
          fetch("http://localhost:3001/patients"),
          fetch("http://localhost:3001/doctors"),
          fetch("http://localhost:3001/appointments"),
          fetch("http://localhost:3001/medicines"),
        ]);

      const [patients, doctors, appointments, medicines] = await Promise.all([
        patientsRes.json(),
        doctorsRes.json(),
        appointmentsRes.json(),
        medicinesRes.json(),
      ]);

      setCounts({
        doctors: doctors.length,
        patients: patients.length,
        appointments: appointments.length,
        visits: appointments.length,
        medicines: medicines.length,
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-green-700 text-white w-64 p-4 z-50 transform transition-transform duration-300 ease-in-out text-base ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:block`}h-
      >
        <div className="text-2xl font-bold border-green-600 pb-4">
          Puskesmas <br /> Bina Desa
        </div>
        <nav className="mt-4 space-y-4">
          <a href="" className="block hover:bg-green-600 p-2 rounded">
            Dashboard
          </a>
          <a href="patients" className="block hover:bg-green-600 p-2 rounded">
            Pasien
          </a>
          <a
            href="tabledokter"
            className="block hover:bg-green-600 p-2 rounded"
          >
            Janji Dokter
          </a>
          <a
            href="tablesjanji"
            className="block hover:bg-green-600 p-2 rounded"
          >
            Table Janji
          </a>
          <a href="tableobat" className="block hover:bg-green-600 p-2 rounded">
            Obat
          </a>
          <a href="datamedis" className="block hover:bg-green-600 p-2 rounded">
            Tenaga Medis
          </a>
          <a href="rekammedis" className="block hover:bg-green-600 p-2 rounded">
            Rekam Medis
          </a>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 p-4 sm:p-6 pl-6">
        {/* Toggle Sidebar Button */}
        <button
          className="sm:hidden mb-4 text-green-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={24} />
        </button>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
            Dashboard <br /> Puskesmas Bina Desa
          </h1>
          <p className="text-sm font-normal text-green-600">
            Kesehatan Anda adalah prioritas Kami
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaUserInjured className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Jumlah Pasien</p>
                <p className="text-xl font-semibold">{counts.patients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaStethoscope className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Dokter Aktif</p>
                <p className="text-xl font-semibold">{counts.doctors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaCalendarCheck className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Janji Hari Ini</p>
                <p className="text-xl font-semibold">{counts.appointments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaHeartbeat className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Kunjungan Hari Ini</p>
                <p className="text-xl font-semibold">{counts.visits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <FaPills className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Jumlah Obat</p>
                <p className="text-xl font-semibold">{counts.medicines}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Umum */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Informasi Umum
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md text-gray-700 text-sm leading-relaxed">
            Selamat datang di Dashboard Puskesmas Bina Desa. Di sini Anda bisa
            melihat data terkait jumlah pasien, dokter, janji temu, kunjungan
            harian, dan obat. Dashboard ini bertujuan untuk mempermudah
            pengelolaan dan pemantauan kegiatan di puskesmas.
          </div>
        </div>
      </main>
    </div>
  );
}
