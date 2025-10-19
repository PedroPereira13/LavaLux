import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NossasLojas = () => {
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lojaSelecionada, setLojaSelecionada] = useState(null);
  const [filtroCidade, setFiltroCidade] = useState("");

  useEffect(() => {
    fetch("http://localhost/lavalux-api/api/get_locations.php")
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta do servidor');
        return res.json();
      })
      .then(data => {
        console.log('Lojas recebidas:', data);
        setLojas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar lojas:', err);
        setError("Erro ao carregar localizações");
        setLoading(false);
      });
  }, []);

  const lojasFiltradas = lojas.filter(loja =>
    loja.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
  );

  const cidadesUnicas = [...new Set(lojas.map(loja => loja.cidade))];

  return (
    <>
      <main className="container mt-4">
        <div className="row mb-5">
          <div className="col-12">
            <div className="bg-gradient-purple text-white rounded-4 p-5 shadow-lg">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-5 fw-bold mb-3">
                    <i className="fas fa-map-marker-alt me-3"></i>
                    Nossas Lojas
                  </h1>
                  <p className="lead mb-4">
                    Encontre a LavaLux mais próxima de você e experimente 
                    o melhor serviço de lavanderia da cidade
                  </p>
                  
                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <span className="badge bg-white text-purple fs-6 p-2">
                      <i className="fas fa-clock me-2"></i>Horários Flexíveis
                    </span>
                    <span className="badge bg-white text-purple fs-6 p-2">
                      <i className="fas fa-truck me-2"></i>Delivery
                    </span>
                    <span className="badge bg-white text-purple fs-6 p-2">
                      <i className="fas fa-star me-2"></i>Atendimento Premium
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 text-center">
                  <div className="subscription-icon">
                    <i className="fas fa-store fa-8x text-white opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row mb-5">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">
                  <i className="fas fa-filter me-2"></i>
                  Filtrar Lojas
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="filtroCidade" className="form-label fw-bold">
                    <i className="fas fa-city me-2"></i>
                    Cidade
                  </label>
                  <select 
                    className="form-select"
                    id="filtroCidade"
                    value={filtroCidade}
                    onChange={(e) => setFiltroCidade(e.target.value)}
                  >
                    <option value="">Todas as cidades</option>
                    {cidadesUnicas.map((cidade, index) => (
                      <option key={index} value={cidade}>
                        {cidade}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="d-grid">
                  <button 
                    className="btn btn-outline-purple"
                    onClick={() => setFiltroCidade("")}
                  >
                    <i className="fas fa-eraser me-2"></i>
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>

           
            <div className="mt-4">
              <h5 className="fw-bold text-purple mb-3">
                <i className="fas fa-list me-2"></i>
                Nossas Unidades ({lojasFiltradas.length})
              </h5>
              
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-purple" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              ) : (
                <div className="list-group">
                  {lojasFiltradas.map((loja) => (
                    <div
                      key={loja.id}
                      className={`list-group-item list-group-item-action cursor-pointer ${
                        lojaSelecionada?.id === loja.id ? 'active' : ''
                      }`}
                      onClick={() => setLojaSelecionada(loja)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1 fw-bold">{loja.nome}</h6>
                        <small>
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {loja.cidade}
                        </small>
                      </div>
                      <p className="mb-1 small">{loja.endereco}</p>
                      <small>
                        <i className="fas fa-phone me-1"></i>
                        {loja.telefone}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-purple">
                  <i className="fas fa-map me-2"></i>
                  Localização
                </h5>
              </div>
              <div className="card-body p-0">
                {lojaSelecionada ? (
                  <>
                    
                    <div 
                      className="bg-light border-bottom"
                      style={{ height: '300px', background: 'linear-gradient(135deg, #e6e6fa 0%, #f8f9fa 100%)' }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center text-purple">
                          <i className="fas fa-map-marked-alt fa-4x mb-3"></i>
                          <h6>{lojaSelecionada.nome}</h6>
                          <small className="text-muted">
                            {lojaSelecionada.endereco}, {lojaSelecionada.cidade} - {lojaSelecionada.estado}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="fw-bold text-purple mb-3">{lojaSelecionada.nome}</h4>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <p className="mb-2">
                            <i className="fas fa-map-marker-alt text-purple me-2"></i>
                            <strong>Endereço:</strong> {lojaSelecionada.endereco}
                          </p>
                          <p className="mb-2">
                            <i className="fas fa-phone text-purple me-2"></i>
                            <strong>Telefone:</strong> {lojaSelecionada.telefone}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-2">
                            <i className="fas fa-clock text-purple me-2"></i>
                            <strong>Horário:</strong> {lojaSelecionada.horario}
                          </p>
                          <p className="mb-2">
                            <i className="fas fa-city text-purple me-2"></i>
                            <strong>Cidade:</strong> {lojaSelecionada.cidade} - {lojaSelecionada.estado}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6 className="fw-bold text-purple mb-3">
                          <i className="fas fa-concierge-bell me-2"></i>
                          Serviços Disponíveis
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                          {lojaSelecionada.servicos.map((servico, index) => (
                            <span key={index} className="badge bg-purple text-white">
                              {servico}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-purple me-md-2">
                          <i className="fas fa-directions me-2"></i>
                          Como Chegar
                        </button>
                        <button className="btn btn-outline-purple">
                          <i className="fas fa-phone me-2"></i>
                          Ligar Agora
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 min-h-400">
                    <div className="text-center text-muted">
                      <i className="fas fa-store fa-4x mb-3"></i>
                      <h5>Selecione uma loja para ver os detalhes</h5>
                      <p>Clique em uma das unidades na lista ao lado</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      
        <div className="row mb-5">
          <div className="col-12">
            <div className="bg-light rounded-4 p-5 text-center">
              <h3 className="fw-bold text-purple mb-3">
                Não encontrou uma loja perto de você?
              </h3>
              <p className="lead mb-4">
                Nossa equipe de delivery está pronta para atender você onde estiver!
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/assinaturas" className="btn btn-purple btn-lg">
                  <i className="fas fa-crown me-2"></i>
                  Conhecer Assinatura
                </Link>
                <Link to="/contato" className="btn btn-outline-purple btn-lg">
                  <i className="fas fa-headset me-2"></i>
                  Falar com Atendimento
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .min-h-400 {
          min-height: 400px;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .btn-outline-purple {
          color: var(--roxo-lavalux);
          border-color: var(--roxo-lavalux);
        }
        .btn-outline-purple:hover {
          background-color: var(--roxo-lavalux);
          color: white;
        }
      `}</style>
    </>
  );
};

export default NossasLojas;