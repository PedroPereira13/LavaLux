export default function ProductCarousel({ produtos }) {
  if (!produtos.length) {
    return <p className="text-center">Nenhum produto cadastrado.</p>;
  }

  const grupos = [];
  for (let i = 0; i < produtos.length; i += 4) {
    grupos.push(produtos.slice(i, i + 4));
  }

  return (
    <div id="carouselProdutos" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {grupos.map((grupo, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
            <div className="d-flex justify-content-center gap-4">
              {grupo.map((p, i) => (
                <div key={i} className="card text-center shadow-sm p-2" style={{ width: "200px" }}>
                  <img
                    src={`http://localhost/lavalux-api/${p.image_path || "imagens/default.png"}`}
                    className="card-img-top img-fluid d-block mx-auto"
                    style={{ height: "150px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="preco fw-bold">
                      R$ {parseFloat(p.price).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
