import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormLogin from "./Components/Element/Fragmnent/FormLogin";
import FormRegister from "./Components/Element/Fragmnent/FormRegister";
import Dashboard from "./Components/Element/Fragmnent/Dashboard";
import NotFound from "./Components/Element/Fragmnent/NotFound";
import PatienTable from "./Components/Element/Fragmnent/PatienTable";
import Manajemen from "./Components/Element/Fragmnent/Manajemen";
import Tables from "./Components/Element/Fragmnent/Tables";
import DoctorTable from "./Components/Element/Fragmnent/Docter";

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
        <Route path="/tables" element={<Tables/>} />
        <Route path="/docter" element={<DoctorTable/>} />
      </Routes>
    </Router>
  );
}

export default App;
