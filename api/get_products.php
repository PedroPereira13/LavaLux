<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../config.php");

try {

    $query = "SELECT name, price, image_path FROM produtos";
    $result = $conexao->query($query);
    

    if (!$result) {
        $query = "SELECT name, price, image_path FROM products";
        $result = $conexao->query($query);
    }
    
    $produtos = [];
    
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $produtos[] = $row;
        }
        echo json_encode($produtos);
    } else {
        echo json_encode([]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao buscar produtos: " . $e->getMessage()]);
}
?>