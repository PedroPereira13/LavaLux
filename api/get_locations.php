<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$lojas = [
    [
        "id" => 1,
        "nome" => "LavaLux Centro",
        "endereco" => "Rua Principal, 123 - Centro",
        "cidade" => "São Paulo",
        "estado" => "SP",
        "telefone" => "(11) 3456-7890",
        "horario" => "Seg a Sáb: 8h às 20h | Dom: 9h às 18h",
        "lat" => -23.5505,
        "lng" => -46.6333,
        "servicos" => ["Lavagem Expressa", "Passadoria", "Delivery"],
        "imagem" => "imagens/loja-centro.jpg"
    ],
    [
        "id" => 2,
        "nome" => "LavaLux Zona Sul",
        "endereco" => "Av. Paulista, 456 - Jardins",
        "cidade" => "São Paulo",
        "estado" => "SP",
        "telefone" => "(11) 2345-6789",
        "horario" => "Seg a Sáb: 7h às 22h | Dom: 8h às 19h",
        "lat" => -23.5631,
        "lng" => -46.6542,
        "servicos" => ["Lavagem a Seco", "Lavagem de Edredons", "Assinatura"],
        "imagem" => "imagens/loja-paulista.jpg"
    ],
    [
        "id" => 3,
        "nome"=>"LavaLux Zona Norte",
        "endereco"=> "Rua das Flores, 789 - Santana",
        "cidade"=> "São Paulo",
        "estado"=> "SP",
        "telefone"=>  "(11) 4567-8901",
        "horario"=>  "Seg a Sex: 6h às 21h | Sáb: 7h às 20h",
        "lat"=> -23.5000,
        "lng"=>  -46.6250,
        "servicos"=>  ["Lavagem Ecológica", "Delivery Grátis", "Retirada Expressa"],
        "imagem"=>  "imagens/loja-santana.jpg"
    ],
    [
        "id"=>  4,
        "nome"=>  "LavaLux Campinas",
        "endereco"=>  "Av. Brasil, 321 - Centro",
        "cidade"=>  "Campinas",
        "estado"=>  "SP",
        "telefone"=>  "(19) 3456-7890",
        "horario"=>  "Seg a Dom: 24 horas",
        "lat"=>  -22.9071,
        "lng"=>  -47.0632,
        "servicos"=>  ["Serviço 24h", "Lavagem Industrial", "Atendimento Corporativo"],
        "imagem"=>  "imagens/loja-campinas.jpg"
    ],
    [
        "id" => 5,
        "nome" => "LavaLux Americana",
        "endereco" => "Av. da Saudade, 567 - Centro",
        "cidade" => "Americana",
        "estado" => "SP",
        "telefone" => "(19) 3456-1234",
        "horario" => "Seg a Sáb: 7h às 21h | Dom: 8h às 17h",
        "lat" => -22.7429,
        "lng" => -47.3333,
        "servicos" => ["Lavagem Premium", "Hidratação de Roupas", "Delivery Rápido"],
        "imagem" => "imagens/loja-americana.jpg"
    ],
    [
        "id" => 6,
        "nome" => "LavaLux Sumaré",
        "endereco" => "Rua das Palmeiras, 890 - Vila Maria",
        "cidade" => "Sumaré",
        "estado" => "SP",
        "telefone" => "(19) 3456-5678",
        "horario" => "Seg a Sex: 6h às 22h | Sáb: 7h às 20h",
        "lat" => -22.8219,
        "lng" => -47.2668,
        "servicos" => ["Lavagem Econômica", "Pacote Familiar", "Retirada em 2h"],
        "imagem" => "imagens/loja-sumaré.jpg"
    ],
    [
        "id" => 7,
        "nome" => "LavaLux Miami",
        "endereco" => "Ocean Drive, 123 - South Beach",
        "cidade" => "Miami",
        "estado" => "FL",
        "telefone" => "+1 (305) 555-0123",
        "horario" => "Mon to Sat: 7am to 11pm | Sun: 8am to 9pm",
        "lat" => 25.7617,
        "lng" => -80.1918,
        "servicos" => ["Dry Cleaning", "Express Service", "VIP Treatment", "Pickup & Delivery"],
        "imagem" => "imagens/loja-miami.jpg"
    ],
    [
        "id" => 8,
        "nome" => "LavaLux Lisboa",
        "endereco" => "Avenida da Liberdade, 456 - Centro",
        "cidade" => "Lisboa",
        "estado" => "PT",
        "telefone" => "+351 21 345 6789",
        "horario" => "Seg a Sáb: 8h às 20h | Dom: Fechado",
        "lat" => 38.7223,
        "lng" => -9.1393,
        "servicos" => ["Lavagem a Seco", "Serviço Premium", "Entrega em Domícilio", "Lavagem Ecológica"],
        "imagem" => "imagens/loja-lisboa.jpg"
    ]
];


if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $loja = array_filter($lojas, function($loja) use ($id) {
        return $loja['id'] === $id;
    });
    
    if (!empty($loja)) {
        echo json_encode(array_values($loja)[0]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Loja não encontrada"]);
    }
} else {
    echo json_encode($lojas);
}
?>