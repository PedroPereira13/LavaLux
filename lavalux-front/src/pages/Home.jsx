import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/lavalux-api/api/get_products.php")
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta do servidor');
        return res.json();
      })
      .then(data => {
        console.log('Produtos recebidos:', data);
        setProdutos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar produtos:', err);
        setError("Erro ao carregar produtos");
        setLoading(false);
      });
  }, []);

  const gruposProdutos = [];
  for (let i = 0; i < produtos.length; i += 4) {
    gruposProdutos.push(produtos.slice(i, i + 4));
  }

  return (
    <>
      <main className="container mt-4">
        {usuario ? (
          <div className="alert alert-success text-center fw-bold fs-4 rounded-3 shadow-sm p-3">
            Bem-vindo de volta, <span className="text-primary">{usuario}</span>!
          </div>
        ) : (
          <div className="alert alert-info text-center fw-bold fs-5 rounded-3 shadow-sm p-3">
            Bem-vindo à <strong>LavaLux</strong>! <a href="/login" className="fw-bold fs-5 p-3">Login</a>
          </div>
        )}

        <div className="row mb-5">
          <div className="col-12">
            <div className="assinatura-promo bg-gradient-purple text-white rounded-4 p-5 shadow-lg position-relative overflow-hidden">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h2 className="display-6 fw-bold mb-3">💜 Assinatura LavaLux</h2>
                  
                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <span className="badge bg-white text-purple fs-6 p-3">
                      <i className="fas fa-shipping-fast me-2"></i>Delivery
                    </span>
                    <span className="badge bg-white text-purple fs-6 p-3">
                      <i className="fas fa-percentage me-2"></i>20% Off
                    </span>
                    <span className="badge bg-white text-purple fs-6 p-3">
                      <i className="fas fa-gift me-2"></i>Produtos Exclusivos
                    </span>
                  </div>
                  <br />
                    <Link 
                      to="/assinaturas" 
                      className="cta-link fw-bold py-3 px-5"
                      style={{ 
                        fontSize: '1.2rem', 
                        borderRadius: '15px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="fas fa-crown me-3 fs-5"></i>
                      Conhecer Planos
                    </Link>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <div className="subscription-icon">
                    <img className="logo" src="/src/img/Lw.png" alt="LavaLux" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>


        <div className="row mb-5">
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {!loading && !error && produtos.length > 0 && (
            <>
              <h1 id="Titulolol" className="display-4 fw-bold text-center mb-5">Nossos Produtos</h1>
              <div id="carouselProdutos" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {gruposProdutos.map((grupo, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                      <div className="d-flex justify-content-center gap-4">
                        {grupo.map((produto, i) => (
                          <div className="card text-center shadow-sm p-3 border-0" style={{width: "220px"}} key={i}>
                            <img 
                              src={produto.image_path || "/imagens/default.png"} 
                              className="card-img-top img-fluid d-block mx-auto" 
                              style={{height: "160px", objectFit: "contain"}} 
                              alt={produto.name} 
                              onError={(e) => {
                                e.target.src = "/imagens/default.png";
                              }}
                            />
                            <div className="card-body">
                              <h6 className="card-title fw-bold">{produto.name}</h6>
                              <p className="preco fw-bold text-purple fs-5">R$ {Number(produto.price).toFixed(2).replace(".", ",")}</p>
                              <div className="mt-3">
                                <span className="badge bg-light text-purple small">
                                  <i className="fas fa-tag me-1"></i>Assinatura: R$ {(Number(produto.price) * 0.8).toFixed(2).replace(".", ",")}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselProdutos" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon bg-purple rounded-circle p-3" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselProdutos" data-bs-slide="next">
                  <span className="carousel-control-next-icon bg-purple rounded-circle p-3" aria-hidden="true"></span>
                  <span className="visually-hidden">Próximo</span>
                </button>
              </div>

              
            </>
          )}

          {!loading && !error && produtos.length === 0 && (
            <div className="alert alert-warning text-center">
              <h4>Nenhum produto encontrado.</h4>
            </div>
          )}

        </div>

      
      </main>
    </>
  );
};

export default Home;