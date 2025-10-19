import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="row g-4">
          
          <div className="col-lg-4 col-md-6 ">
            <div className="footer-brand mb-4">
              <img
                src="src/img/L.png"
                alt="LavaLux Logo"
                className="img-fluid mb-3"
                style={{ maxWidth: "100px", filter: "brightness(0) invert(1)" }}
              />
                <div className="footer-social">
                  <a
                    href="https://www.instagram.com"
                    className="btn btn-outline-light btn-lg rounded-circle me-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.facebook.com"
                    className="btn btn-outline-light btn-lg rounded-circle me-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.whatsapp.com"
                    className="btn btn-outline-light btn-lg rounded-circle"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div> 
            </div>
            
          </div>

          
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-uppercase fs-6">Blog</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none ">
                  <i className="fas fa-chevron-right me-2 small"></i>
                  Tech
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none ">
                  <i className="fas fa-chevron-right me-2 small"></i>
                  Adventure
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none ">
                  <i className="fas fa-chevron-right me-2 small"></i>
                  Music
                </a>
              </li>
            </ul>
          </div>

          
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-uppercase fs-6">Products</h5>
            <ul className="list-unstyled">

              <li className="mb-2">
                <Link to="/ajuda" className="text-light text-decoration-none">
                  <i className="fas fa-chevron-right me-2 small"></i>
                  Ajuda
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/Contato" className="text-light text-decoration-none">
                  <i className="fas fa-chevron-right me-2 small"></i>
                  Contato
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/Assinaturas" className="text-light text-decoration-none">
                  <i className="fas fa-chevron-right me-2 small"></i>
                  Assinaturas
                </Link>
              </li>

            </ul>
          </div>


          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-uppercase fs-6">Newsletter</h5>
            <p className="text-light opacity-75 mb-3 small">
              Inscreva-se para receber notificações sobre nossas novas soluções e atualizações.
            </p>
            <div className="input-group input-group-lg mb-3">
              <input
                type="email"
                className="form-control border-0 shadow-sm"
                placeholder="seu@email.com"
                aria-label="Email"
                style={{ borderRadius: "10px 0 0 10px" }}
              />
              <button 
                className="btn btn-primary border-0 px-4" 
                type="button"
                style={{ borderRadius: "0 10px 10px 0", background: "#8A2BE2" }}
              >
                <i className="fas fa-paper-plane me-2"></i>
                Enviar
              </button>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="newsletterCheck" />
              <label className="form-check-label text-light opacity-75 small" htmlFor="newsletterCheck">
                Aceito receber comunicações
              </label>
            </div>
          </div>
        </div>

        {/* Copyright e Links Adicionais */}
        <div className="row pt-4 mt-4 border-top border-secondary">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-light opacity-75 small">
              © 2024 <span className="fw-bold">LavaLux</span>. Todos os direitos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-light opacity-75 text-decoration-none small me-3 ">
              Política de Privacidade
            </a>
            <a href="#" className="text-light opacity-75 text-decoration-none small me-3 ">
              Termos de Uso
            </a>
            <a href="#" className="text-light opacity-75 text-decoration-none small ">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;