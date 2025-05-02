import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DoctorTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [newSchedule, setNewSchedule] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");

  useEffect(() => {
    // Mengambil data dokter dari JSON Server
    axios
      .get("http://localhost:3001/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: `Ada kesalahan saat mengambil data dokter: ${error.message}`,
        });
      });
  }, []);

  const handleAddDoctor = () => {
    if (!doctorName || !doctorSpecialty) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan!",
        text: "Nama dan Spesialis dokter harus diisi!",
      });
      return;
    }

    const newDoctor = {
      name: doctorName,
      specialty: doctorSpecialty,
      schedule: "",
    };

    axios
      .post("http://localhost:3001/doctors", newDoctor)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: `Dokter berhasil ditambahkan: ${response.data.name}`,
        });
        setDoctorName(""); // Clear input
        setDoctorSpecialty(""); // Clear input
        setDoctors((prevDoctors) => [...prevDoctors, response.data]);
      })
      .catch((error) => {
        console.error("Gagal menambahkan dokter:", error);
      });
  };

  const handleAddSchedule = () => {
    if (!selectedDoctor || !newSchedule) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan!",
        text: "Semua field harus diisi!",
      });
      return;
    }

    const scheduleData = {
      doctorId: selectedDoctor,
      schedule: newSchedule,
    };

    axios
      .post("http://localhost:3001/schedules", scheduleData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: `Jadwal berhasil ditambahkan: ${response.data}`,
        });
        setNewSchedule("");
        setSelectedDoctor("");
        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === selectedDoctor
            ? { ...doctor, schedule: newSchedule }
            : doctor
        );
        setDoctors(updatedDoctors);
      })
      .catch((error) => {
        console.error("Gagal menambahkan jadwal:", error);
      });
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        Data Dokter <br /> Puskesmas Bina Desa
      </h2>

      {/* Form Input untuk Penjadwalan Dokter */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Penjadwalan Dokter
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Pilih Dokter</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">-- Pilih Dokter --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Jadwal Praktek</label>
            <input
              type="text"
              value={newSchedule}
              onChange={(e) => setNewSchedule(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan jadwal praktek"
            />
          </div>
          <div>
            <button
              onClick={handleAddSchedule}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Jadwal
            </button>
          </div>
        </div>
      </div>

      {/* Form Input untuk Tambah Dokter */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Tambah Dokter
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama Dokter</label>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan nama dokter"
            />
          </div>
          <div>
            <label className="block text-gray-700">Spesialis</label>
            <input
              type="text"
              value={doctorSpecialty}
              onChange={(e) => setDoctorSpecialty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan spesialis dokter"
            />
          </div>
          <div>
            <button
              onClick={handleAddDoctor}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Dokter
            </button>
          </div>
        </div>
      </div>

      {/* Tabel Dokter */}
      <div className="overflow-x-auto">
        <table className="min-w-full border shadow-md rounded-xl overflow-hidden">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Nama</th>
              <th className="px-4 py-2 border-b">Spesialis</th>
              <th className="px-4 py-2 border-b">Jadwal Praktek</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border-b">{doc.id}</td>
                  <td className="px-4 py-2 border-b">{doc.name}</td>
                  <td className="px-4 py-2 border-b">{doc.specialty}</td>
                  <td className="px-4 py-2 border-b">{doc.schedule}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data dokter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorTable;
