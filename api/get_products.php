<?php
// Headers CORS mais completos
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Para requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("config.php");

// Dados fixos de produtos (fallback se o banco não funcionar)
$produtos_fallback = [
    [
        "id" => 1,
        "name" => "Álcool 70%",
        "price" => 12.90,
        "image_path" => "http://localhost/lavalux-api/src/img/produtos/alcool_70.jpg",
        "category" => "Limpeza",
        "description" => "Álcool 70% para limpeza e desinfecção"
    ],
    [
        "id" => 2,
        "name" => "Álcool em Gel",
        "price" => 15.50,
        "image_path" => "http://localhost/lavalux-api/img/produtos/alcool_gel.jpg",
        "category" => "Limpeza",
        "description" => "Álcool em gel antisséptico"
    ],
    [
        "id" => 3,
        "name" => "Amaciante Comfort",
        "price" => 18.90,
        "image_path" => "http://localhost/lavalux-api/img/produtos/amaciante_comfort.jpg",
        "category" => "Lavanderia",
        "description" => "Amaciante de roupas Comfort"
    ],
    [
        "id" => 4,
        "name" => "Detergente Ypê",
        "price" => 5.50,
        "image_path" => "http://localhost/lavalux-api/img/produtos/detergente_ype.png",
        "category" => "Cozinha",
        "description" => "Detergente líquido Ypê"
    ],
    [
        "id" => 5,
        "name" => "Desinfetante Veja",
        "price" => 14.50,
        "image_path" => "http://localhost/lavalux-api/img/produtos/desinfetante_veja.jpg",
        "category" => "Limpeza",
        "description" => "Desinfetante Veja multiuso"
    ],
    [
        "id" => 6,
        "name" => "Sabão em Pó Omo",
        "price" => 25.90,
        "image_path" => "http://localhost/lavalux-api/img/produtos/po_omo.jpg",
        "category" => "Lavanderia",
        "description" => "Sabão em pó Omo para roupas"
    ]
];

try {
    // Tenta buscar do banco de dados
    $query = "SELECT id, name, price, image_path FROM produtos";
    $result = $conexao->query($query);
    
    $produtos = [];
    
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Converte caminhos relativos para URLs completas
            if (!empty($row['image_path'])) {
                if (strpos($row['image_path'], 'http') === false) {
                    // Se não é URL completa, converte
                    if (strpos($row['image_path'], '/lavalux-api/') !== false) {
                        $row['image_path'] = "http://localhost" . $row['image_path'];
                    } else {
                        $row['image_path'] = "http://localhost/lavalux-api/img/produtos/" . basename($row['image_path']);
                    }
                }
            }
            $produtos[] = $row;
        }
        
        // Retorna produtos do banco
        echo json_encode($produtos);
        
    } else {
        // Se não há produtos no banco, usa os dados fixos
        echo json_encode($produtos_fallback);
    }
    
} catch (Exception $e) {
    // Em caso de erro, retorna os dados fixos
    error_log("Erro ao buscar produtos: " . $e->getMessage());
    echo json_encode($produtos_fallback);
}

if (isset($conexao)) {
    $conexao->close();
}
?>