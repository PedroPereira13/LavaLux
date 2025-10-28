import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function NavBar({ usuario, onLogout }) {
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  const handleBusca = (e) => {
    e.preventDefault();
    
    if (!termoBusca.trim()) {
      navigate("/");
      if (window.buscarProdutosHome) {
        window.buscarProdutosHome("");
      }
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (window.buscarProdutosHome) {
          window.buscarProdutosHome(termoBusca);
        }
      }, 100);
    } else {
      if (window.buscarProdutosHome) {
        window.buscarProdutosHome(termoBusca);
      }
    }

    setTermoBusca("");
  };

  const handleInputChange = (e) => {
    setTermoBusca(e.target.value);
    
    if (window.location.pathname === "/" && window.buscarProdutosHome) {
      window.buscarProdutosHome(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBusca(e);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };


  const getInicial = (nome) => {
    if (!nome) return "U";
    return nome.charAt(0).toUpperCase();
  };

  const getCorAvatar = (nome) => {
    const cores = [
      '#6f42c1', '#d63384', '#fd7e14', '#20c997', 
      '#0dcaf0', '#ffc107', '#6610f2', '#198754'
    ];
    const index = nome ? nome.charCodeAt(0) % cores.length : 0;
    return cores[index];
  };

  return (
    <nav className="container">
      <div className="barranav d-flex justify-content-between align-items-center">
        <div>
          <Link to="/">
            <img className="logo" src="/src/img/LavaLux.png" alt="LavaLux" />
          </Link>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleBusca} className="input-group">
            <span className="input-group-text bg-transparent border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control border-start-0"
              type="search"
              placeholder="Buscar produtos..."
              aria-label="Buscar"
              value={termoBusca}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              type="submit" 
              className="btn btn-purple"
              style={{
                backgroundColor: '#6f42c1',
                color: 'white',
                border: '1px solid #6f42c1'
              }}
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown me-3">
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
            <div className="dropdown">
              <button
                className="btn dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  minWidth: '40px',
                  minHeight: '40px'
                }}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: getCorAvatar(usuario),
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {getInicial(usuario)}
                </div>
                <span className="d-none d-md-inline">{usuario}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="dropdown-item-text small text-muted">
                    Logado como <strong>{usuario}</strong>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/perfil">
                    <i className="bi bi-person me-2"></i>Meu Perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/pedidos">
                    <i className="bi bi-bag me-2"></i>Meus Pedidos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/assinaturas">
                    <i className="bi bi-star me-2"></i>Minhas Assinaturas
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Sair
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="navlink cta-link">
              <i className="bi bi-person me-1"></i>Login
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