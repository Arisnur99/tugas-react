import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormLogin from "./Components/Element/Fragmnent/FormLogin";
import FormRegister from "./Components/Element/Fragmnent/FormRegister";
import Dashboard from "./Components/Element/Fragmnent/Dashboard";
import Manajemen from "./Components/Element/Fragmnent/Manajemen";
import NotFound from "./Components/Element/Fragmnent/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manajemen" element={<Manajemen />} />
        <Route path="*" element={<NotFound />} />


      </Routes>
    </Router>
  );
}

export default App;
