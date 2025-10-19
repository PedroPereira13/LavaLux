import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

function NavBar({ usuario }) {
  return (
    <nav className="container">
      <div className="barranav d-flex justify-content-between align-items-center">
        <div>
          <Link to="/">
            <img className="logo" src="/src/img/LavaLux.png" alt="LavaLux" />
          </Link>
        </div>

        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control border-start-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown me-2">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-telephone"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/contato">
                  Contato
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/ajuda">
                  Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {usuario ? (
            <div className="dropdown me-2">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user"></i> {usuario}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Sair
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="navlink cta-link">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="Barranavb">
        <ul className="nav justify-content-center">
          <Link to="/Servicos" className="nav-item nav-link text-purple fw-semibold px-3 py-2 rounded">
            Servicos
          </Link>
          <Link to="/NossasLojas" className="nav-item nav-link text-purple fw-semibold px-3 py-2 rounded">
            Localidades
          </Link>
          <Link to="/Assinaturas" className="nav-item nav-link text-purple fw-semibold px-3 py-2 rounded">
            Assinaturas
          </Link>
        </ul>
      </div>
    </nav>
    
  );
}

export default NavBar;
