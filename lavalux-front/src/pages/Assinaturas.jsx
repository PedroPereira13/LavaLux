import '../index.css';

export default function Assinaturas() {
  const planos = [
    { nome: "Básico", preco: 49.90, desc: "Ideal para quem lava pouco." },
    { nome: "Premium", preco: 99.90, desc: "Mais roupas e entrega rápida." },
    { nome: "Deluxe", preco: 149.90, desc: "Plano completo com benefícios extras." },
  ];

  return (
    <>
      <br />
      <section className="assinaturaLavalux bg-purple text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-clock-fill me-3 fs-4"></i>
                <span className="fw-bold fs-5">ASSINATURA LAVALUX</span>
              </div>
              <p className="display-6 ">
                Descomplique seu dia a dia.<br />
                Tenha tudo para sua casa, sempre.
              </p>
              <p className="lead mb-4">
                Compra programada, todo mês na sua casa.<br />
                Fácil assim.
              </p>
              <button className="btn btn-outline-light">
                <a href=""></a>
                Começar Agora
              </button>
            </div>
            <div className="col-lg-6">
              <img 
                className="float-end" 
                src="\src\img\lavanderia.jpg" 
                alt="Serviços de lavanderia LavaLux" 
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 display-4 text-purple">
            Vantagens de ser assinante
          </h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="vantagensIndividuais text-center p-4 h-100">
                <i className="fa-solid fa-tag fa-2x text-purple mb-3"></i>
                <h4 className="fw-bold mb-3">10% OFF</h4>
                <p className="text-muted mb-0">
                  em todas as compras no app, site e lojas físicas
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="vantagensIndividuais text-center p-4 h-100">
                <i className="fa-solid fa-truck fa-2x text-purple mb-3"></i>
                <h4 className="fw-bold mb-3">10% OFF</h4>
                <p className="text-muted mb-0">
                  em todos os serviços de entrega
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="vantagensIndividuais text-center p-4 h-100">
                <i className="fa-solid fa-house fa-2x text-purple mb-3"></i>
                <h4 className="fw-bold mb-3">Receba quando quiser</h4>
                <p className="text-muted mb-0">
                  Escolha a frequência de envio
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="vantagensIndividuais text-center p-4 h-100">
                <i className="fa-solid fa-ticket fa-2x text-purple mb-3"></i>
                <h4 className="fw-bold mb-3">Sem taxa de cancelamento</h4>
                <p className="text-muted mb-0">
                  Cancele sem custos adicionais
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 display-4 text-purple">
            Como funciona
          </h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-4 h-100">
                <div className="bg-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{width: '80px', height: '80px'}}>
                  <span className="fw-bold fs-3">1</span>
                </div>
                <h5 className="fw-bold mb-3">Adicione produtos</h5>
                <p className="text-muted">
                  Coloque na sacola os produtos que quer assinar e clique em "Assinar produto"
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-4 h-100">
                <div className="bg-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{width: '80px', height: '80px'}}>
                  <span className="fw-bold fs-3">2</span>
                </div>
                <h5 className="fw-bold mb-3">Escolha a frequência</h5>
                <p className="text-muted">
                  Defina de quanto em quanto tempo quer receber os produtos em casa
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-4 h-100">
                <div className="bg-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{width: '80px', height: '80px'}}>
                  <span className="fw-bold fs-3">3</span>
                </div>
                <h5 className="fw-bold mb-3">Finalize o pagamento</h5>
                <p className="text-muted">
                  Conclua o pagamento e sua assinatura estará ativa
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-4 h-100">
                <div className="bg-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                     style={{width: '80px', height: '80px'}}>
                  <span className="fw-bold fs-3">4</span>
                </div>
                <h5 className="fw-bold mb-3">Receba em casa</h5>
                <p className="text-muted">
                  Seus produtos chegarão automaticamente na frequência escolhida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 display-4 text-purple">
            Escolha seu plano
          </h2>
          <div className="row justify-content-center g-4">
            {planos.map((plano, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-lg hover-lift">
                  <div className="card-body text-center p-5 d-flex flex-column">
                    <h3 className="card-title fw-bold text-purple mb-3">{plano.nome}</h3>
                    <div className="my-4">
                      <span className="h2 fw-bold text-dark">R$ </span>
                      <span className="display-4 fw-bold text-purple">
                        {plano.preco.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-muted">/mês</span>
                    </div>
                    <p className="card-text text-muted mb-4 flex-grow-1">{plano.desc}</p>
                    <button className="btn btn-purple btn-lg fw-bold py-3">
                      Assinar Agora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}