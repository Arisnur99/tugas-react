import { FaEdit, FaTrash } from "react-icons/fa";

const PatienTable = ({
  data = [],
  search,
  setForm,
  setEditId,
  fetchPatients,
}) => {
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

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-collapse text-sm md:text-base">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Umur</th>
            <th className="p-2 border">Alamat</th>
            <th className="p-2 border">Telepon</th>
            <th className="p-2 border">Diagnosis</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-100">
                <td className="p-2 border">{patient.name}</td>
                <td className="p-2 border">{patient.age}</td>
                <td className="p-2 border">{patient.address}</td>
                <td className="p-2 border">{patient.phone}</td>
                <td className="p-2 border">{patient.diagnosis}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => handleEdit(patient)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(patient.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatienTable;
