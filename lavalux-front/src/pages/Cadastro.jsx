import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost/lavalux-api/api/cadastro.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg(data.message);
    } catch (error) {
      setMsg("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-de-login d-flex justify-content-center align-items-center min-vh-100 py-5">
        <div className="container-de-formulario shadow-lg">
          <div className="text-center mb-5">
            <img
              src="src/img/LavaLux.png"
              alt="LavaLux"
              className="mb-4"
              style={{ maxWidth: "220px" }}
            />
            <h1 className="fw-bold text-purple mb-3 display-6">
              Crie sua conta
            </h1>
            <p className="text-muted fs-5">
              Cadastre-se para aproveitar nossos serviços
            </p>
          </div>

          <form onSubmit={handleSubmit} className="col-12">
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="form-label fw-semibold fs-5"
              >
                Nome
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 py-3">
                  <i className="fas fa-user text-purple fs-5"></i>
                </span>
                <input
                  id="nome"
                  className="form-control border-start-0 ps-0 py-3"
                  name="nome"
                  placeholder="Seu nome completo"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "1.1rem" }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="form-label fw-semibold fs-5"
              >
                Email
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 py-3">
                  <i className="fas fa-envelope text-purple fs-5"></i>
                </span>
                <input
                  id="email"
                  className="form-control border-start-0 ps-0 py-3"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "1.1rem" }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="senha"
                className="form-label fw-semibold fs-5"
              >
                Senha
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 py-3">
                  <i className="fas fa-lock text-purple fs-5"></i>
                </span>
                <input
                  id="senha"
                  className="form-control border-start-0 ps-0 py-3"
                  name="senha"
                  type="password"
                  placeholder="Crie uma senha"
                  onChange={handleChange}
                  required
                  style={{ fontSize: "1.1rem" }}
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-100 py-3 fw-bold fs-4 mb-4"
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "var(--roxo-lavalux)",
                borderColor: "var(--roxo-lavalux)",
                borderRadius: "15px",
                height: "65px",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-3"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    role="status"
                  ></span>
                  Cadastrando...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-3"></i>
                  Cadastrar
                </>
              )}
            </button>

            {msg && (
              <div
                className={`alert ${
                  msg.includes("sucesso")
                    ? "alert-success"
                    : "alert-danger"
                } text-center fs-5 py-3`}
              >
                <i
                  className={`fas ${
                    msg.includes("sucesso")
                      ? "fa-check-circle"
                      : "fa-exclamation-triangle"
                  } me-2`}
                ></i>
                {msg}
              </div>
            )}
          </form>

          <div className="text-center mt-5">
            <p className="text-muted mb-3 fs-5">
              Já tem uma conta?
              <Link
                to="/login"
                className="text-purple fw-bold text-decoration-none ms-2 fs-5"
              >
                Entrar
              </Link>
            </p>

            <div className="position-relative my-4">
              <hr className="my-4" />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fs-5">
                Ou cadastre-se com
              </span>
            </div>

            <div className="d-flex justify-content-center gap-4">
              <button
                className="btn btn-outline-secondary rounded-circle p-3"
                style={{ width: "70px", height: "70px" }}
              >
                <i className="fab fa-google fs-4"></i>
              </button>
              <button
                className="btn btn-outline-secondary rounded-circle p-3"
                style={{ width: "70px", height: "70px" }}
              >
                <i className="fab fa-facebook-f fs-4"></i>
              </button>
              <button
                className="btn btn-outline-secondary rounded-circle p-3"
                style={{ width: "70px", height: "70px" }}
              >
                <i className="fab fa-apple fs-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
