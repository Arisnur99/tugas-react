import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormLogin from "./Components/Element/Fragmnent/FormLogin";
import FormRegister from "./Components/Element/Fragmnent/FormRegister";
import Dashboard from "./Components/Element/Fragmnent/Dashboard";
import NotFound from "./Components/Element/Fragmnent/NotFound";
import PatienTable from "./Components/Element/Fragmnent/PatienTable";
import Manajemen from "./Components/Element/Fragmnent/Manajemen";
import Tables from "./Components/Element/Fragmnent/TablesJanji";
import JadwalDokter from "./Components/Element/Fragmnent/JadwalDokter";
import ObatTable from "./Components/Element/Fragmnent/Obat";
import Dokter from "./Components/Element/Fragmnent/AddDokter";
import TabelDokter from "./Components/Element/Fragmnent/TableDokter";
import TableObat from "./Components/Element/Fragmnent/TableObat";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manajemen" element={<Manajemen />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/patients" element={<PatienTable />} />
        <Route path="/dokter" element={<JadwalDokter />} />
        <Route path="/dokter/:id" element={<JadwalDokter />} />
        <Route path="/tablesjanji" element={<Tables />} />
        <Route path="/obat" element={<ObatTable />} />
        <Route path="/tableobat" element={<TableObat />} />
        <Route path="/adddokter" element={<Dokter />} />
        <Route path="/tabledokter" element={<TabelDokter />} />
      </Routes>
    </Router>
  );
}

export default App;
