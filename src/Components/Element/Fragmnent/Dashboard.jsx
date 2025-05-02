import { useState } from "react";
import {
  FaUserInjured,
  FaStethoscope,
  FaCalendarCheck,
  FaHeartbeat,
  FaBars,
} from "react-icons/fa";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      <aside
        className={`fixed inset-y-0 left-0 bg-green-700 text-white w-64 p-6 z-50 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:relative sm:block`}
      >
        <div className="text-2xl font-bold border-b border-green-600 pb-4">
          Puskesmas
        </div>
        <nav className="mt-6 space-y-4">
          <a href="#" className="block hover:bg-green-600 p-2 rounded">
            Dashboard
          </a>
          <a href="#" className="block hover:bg-green-600 p-2 rounded">
            Pasien
          </a>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 sm:ml-64 p-4 sm:p-6">
        <button
          className="sm:hidden mb-4 text-green-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={24} />
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6">
          Dashboard <br /> Puskesmas Bina Desa
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaUserInjured className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Jumlah Pasien</p>
                <p className="text-xl font-semibold">128</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaStethoscope className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Dokter Aktif</p>
                <p className="text-xl font-semibold">7</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaCalendarCheck className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Janji Hari Ini</p>
                <p className="text-xl font-semibold">23</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <FaHeartbeat className="text-green-600 text-3xl" />
              <div>
                <p className="text-gray-600 text-sm">Kunjungan Hari Ini</p>
                <p className="text-xl font-semibold">45</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Informasi Umum
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md text-gray-700 text-sm leading-relaxed">
            Selamat datang di Dashboard Puskesmas Bina Desa. Di sini Anda bisa
            melihat data terkait jumlah pasien, dokter, janji temu, dan
            kunjungan harian. Dashboard ini bertujuan untuk mempermudah
            pengelolaan dan pemantauan kegiatan di puskesmas.
          </div>
        </div>
      </main>
    </div>
  );
}
