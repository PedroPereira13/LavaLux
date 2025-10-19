import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Ajuda from "./pages/Ajuda";
import Assinaturas from "./pages/Assinaturas";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import NossasLojas from "./pages/NossasLojas.jsx";

function App() {
  const [usuario, setUsuario] = useState(null); 

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar usuario={usuario} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/ajuda" element={<Ajuda />} />
            <Route path="/assinaturas" element={<Assinaturas />} />
            <Route path="/nossaslojas" element={<NossasLojas />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
