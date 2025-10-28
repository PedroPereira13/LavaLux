import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost/lavalux-api/api/get_products.php");
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Produtos carregados:', data);
        
        setProdutos(Array.isArray(data) ? data : []);
        setProdutosFiltrados(Array.isArray(data) ? data : []);
        
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError(`Erro ao carregar produtos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // Inicializa o carousel quando os produtos são carregados
  useEffect(() => {
    if (produtosFiltrados.length > 0) {
      // Aguarda o DOM ser renderizado completamente
      const timer = setTimeout(() => {
        initializeCarousel();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [produtosFiltrados]);

  const initializeCarousel = () => {
    if (!carouselRef.current) return;
    
    // Remove qualquer instância existente
    const existingCarousel = window.bootstrap?.Carousel.getInstance(carouselRef.current);
    if (existingCarousel) {
      existingCarousel.dispose();
    }

    // Inicializa novo carousel
    if (window.bootstrap) {
      try {
        new window.bootstrap.Carousel(carouselRef.current, {
          interval: false, // Remove auto-play
          wrap: true,
          touch: true
        });
        console.log('Carousel inicializado com sucesso!');
      } catch (error) {
        console.error('Erro ao inicializar carousel:', error);
      }
    }
  };

  // Função para agrupar produtos em slides de 4
  const gruposProdutos = [];
  for (let i = 0; i < produtosFiltrados.length; i += 4) {
    gruposProdutos.push(produtosFiltrados.slice(i, i + 4));
  }

  // Função para buscar produtos (será chamada pela NavBar)
  const buscarProdutos = (termo) => {
    if (!termo.trim()) {
      setProdutosFiltrados(produtos);
      return;
    }

    const termoLower = termo.toLowerCase();
    const filtrados = produtos.filter(produto =>
      produto.name.toLowerCase().includes(termoLower)
    );
    
    setProdutosFiltrados(filtrados);
  };

  // Expõe a função de busca globalmente para a NavBar acessar
  useEffect(() => {
    window.buscarProdutosHome = buscarProdutos;
    return () => {
      delete window.buscarProdutosHome;
    };
  }, [produtos]);

  // Função para corrigir URLs de imagem
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/imagens/default.png";
    
    if (imagePath.startsWith('http')) return imagePath;
    
    if (imagePath.startsWith('/')) {
      return `http://localhost${imagePath}`;
    }
    
    return `http://localhost/lavalux-api/img/produtos/${imagePath}`;
  };

  const handleImageError = (e, produto) => {
    console.warn(`Erro ao carregar imagem: ${produto.image_path}`);
    e.target.src = "/imagens/default.png";
  };

  // Funções para controle manual do carousel - SIMPLIFICADAS
  const nextSlide = () => {
    if (carouselRef.current) {
      const event = new Event('slide.bs.carousel');
      carouselRef.current.dispatchEvent(event);
      
      // Lógica manual de navegação
      const activeSlide = carouselRef.current.querySelector('.carousel-item.active');
      const nextSlide = activeSlide.nextElementSibling || carouselRef.current.querySelector('.carousel-item');
      
      if (nextSlide) {
        activeSlide.classList.remove('active');
        nextSlide.classList.add('active');
        
        // Atualiza indicadores
        const activeIndex = Array.from(carouselRef.current.querySelectorAll('.carousel-item')).indexOf(nextSlide);
        updateIndicators(activeIndex);
      }
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const event = new Event('slide.bs.carousel');
      carouselRef.current.dispatchEvent(event);
      
      // Lógica manual de navegação
      const activeSlide = carouselRef.current.querySelector('.carousel-item.active');
      const prevSlide = activeSlide.previousElementSibling || carouselRef.current.querySelector('.carousel-item:last-child');
      
      if (prevSlide) {
        activeSlide.classList.remove('active');
        prevSlide.classList.add('active');
        
        // Atualiza indicadores
        const activeIndex = Array.from(carouselRef.current.querySelectorAll('.carousel-item')).indexOf(prevSlide);
        updateIndicators(activeIndex);
      }
    }
  };

  const updateIndicators = (activeIndex) => {
    const indicators = document.querySelectorAll('.carousel-indicators button');
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add('active');
        indicator.classList.remove('bg-secondary');
        indicator.classList.add('bg-purple');
      } else {
        indicator.classList.remove('active');
        indicator.classList.remove('bg-purple');
        indicator.classList.add('bg-secondary');
      }
    });
  };

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slides = carouselRef.current.querySelectorAll('.carousel-item');
      const activeSlide = carouselRef.current.querySelector('.carousel-item.active');
      
      if (activeSlide && slides[index]) {
        activeSlide.classList.remove('active');
        slides[index].classList.add('active');
        updateIndicators(index);
      }
    }
  };

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
                    className="btn btn-light btn-lg fw-bold py-3 px-5"
                    style={{ 
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
                    <img 
                      className="logo" 
                      src="/src/img/Lw.png" 
                      alt="LavaLux" 
                      style={{width: '150px', height: 'auto'}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-3">Carregando produtos...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">
              <h5>Erro ao carregar produtos</h5>
              <p className="mb-0">{error}</p>
              <button 
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={() => window.location.reload()}
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {!loading && !error && produtosFiltrados.length > 0 && (
            <>
              <h1 className="display-4 fw-bold text-center mb-5">
                {produtosFiltrados.length === produtos.length ? 'Nossos Produtos' : 'Produtos Encontrados'}
                <small className="d-block fs-6 text-muted mt-2">
                  {produtosFiltrados.length} de {produtos.length} produtos
                </small>
              </h1>
              
              {/* Container do Carousel */}
              <div className="position-relative">
                <div 
                  id="carouselProdutos" 
                  ref={carouselRef}
                  className="carousel slide" 
                  data-bs-ride="false" // Importante: false para controle manual
                >
                  <div className="carousel-inner">
                    {gruposProdutos.map((grupo, index) => (
                      <div 
                        className={`carousel-item ${index === 0 ? "active" : ""}`} 
                        key={index}
                        data-bs-interval="false"
                      >
                        <div className="d-flex justify-content-center gap-4 flex-wrap">
                          {grupo.map((produto, i) => (
                            <div className="card text-center shadow-sm p-3 border-0" style={{width: "220px"}} key={i}>
                              <div className="image-container" style={{
                                height: "160px", 
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                              }}>
                                <img 
                                  src={getImageUrl(produto.image_path)} 
                                  className="card-img-top img-fluid mx-auto" 
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%", 
                                    objectFit: "contain"
                                  }} 
                                  alt={produto.name} 
                                  onError={(e) => handleImageError(e, produto)}
                                  loading="lazy"
                                />
                              </div>
                              <div className="card-body">
                                <h6 className="card-title fw-bold text-dark">{produto.name}</h6>
                                <p className="preco fw-bold text-purple fs-5 mb-2">
                                  R$ {Number(produto.price).toFixed(2).replace(".", ",")}
                                </p>
                                <div className="mt-2">
                                  <span className="badge bg-light text-purple small p-2">
                                    <i className="fas fa-tag me-1"></i>
                                    Assinatura: R$ {(Number(produto.price) * 0.8).toFixed(2).replace(".", ",")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Controles de Navegação - SEMPRE VISÍVEIS quando há múltiplos slides */}
                  {gruposProdutos.length > 1 && (
                    <>
                      <button 
                        className="carousel-control-prev" 
                        type="button" 
                        onClick={prevSlide}
                        style={{
                          cursor: 'pointer',
                          width: '50px',
                          left: '-60px'
                        }}
                      >
                        <span 
                          className="carousel-control-prev-icon bg-purple rounded-circle p-3" 
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Anterior</span>
                      </button>
                      <button 
                        className="carousel-control-next" 
                        type="button" 
                        onClick={nextSlide}
                        style={{
                          cursor: 'pointer',
                          width: '50px',
                          right: '-60px'
                        }}
                      >
                        <span 
                          className="carousel-control-next-icon bg-purple rounded-circle p-3" 
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Próximo</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Indicadores do carousel */}
                {gruposProdutos.length > 1 && (
                  <div className="text-center mt-4">
                    <div className="carousel-indicators position-static m-0">
                      {gruposProdutos.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => goToSlide(index)}
                          className={index === 0 ? "active bg-purple mx-1" : "bg-secondary mx-1"}
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: "2px solid #6f42c1",
                            cursor: 'pointer'
                          }}
                          aria-label={`Ir para slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {!loading && !error && produtosFiltrados.length === 0 && (
            <div className="alert alert-warning text-center py-4">
              <h4 className="mb-3">
                {produtos.length === 0 ? 'Nenhum produto encontrado' : 'Nenhum produto corresponde à sua busca'}
              </h4>
              <p className="mb-0">
                {produtos.length === 0 
                  ? 'Não há produtos cadastrados no momento.' 
                  : 'Tente usar outros termos de busca.'}
              </p>
              {produtos.length > 0 && (
                <button 
                  className="btn btn-outline-warning btn-sm mt-2"
                  onClick={() => setProdutosFiltrados(produtos)}
                >
                  Mostrar Todos os Produtos
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;