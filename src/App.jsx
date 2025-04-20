import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormLogin from "./Components/Element/Fragmnent/FormLogin";
import FormRegister from "./Components/Element/Fragmnent/FormRegister";
import Dashboard from "./Components/Element/Fragmnent/Dashboard";
import Manajemen from "./Components/Element/Fragmnent/Manajemen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manajemen" element={<Manajemen />} />

      </Routes>
    </Router>
  );
}

export default App;
