<?php
// Headers CORS - devem vir antes de qualquer output
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$user = "root";
$password = "";
$database = "lavalux";

try {
    $conexao = new mysqli($host, $user, $password, $database);
    
    if ($conexao->connect_error) {
        throw new Exception("Erro de conexão: " . $conexao->connect_error);
    }
    
    $conexao->set_charset("utf8mb4");
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro no servidor: " . $e->getMessage()]);
    exit();
}
?>