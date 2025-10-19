import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/lavalux-api/api/contato.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <>
      
      <div className="container mt-5 text-center">
        <h2>Contato</h2>
        <form onSubmit={handleSubmit} className="col-md-6 text-center mx-auto">
          <input className="form-control mb-3" name="nome" placeholder="Nome" onChange={handleChange} required />
          <input className="form-control mb-3" name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <textarea className="form-control mb-3" name="mensagem" placeholder="Mensagem" rows="4" onChange={handleChange} required />
          <button className="btn btn-primary">Enviar</button>
        </form>
        {status && <p className="mt-3">{status}</p>}
      </div>
     
    </>
  );
}
