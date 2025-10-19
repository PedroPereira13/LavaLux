<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nome'], $data['email'], $data['mensagem'])) {
    echo json_encode(["message" => "Mensagem enviada com sucesso!"]);
} else {
    echo json_encode(["message" => "Preencha todos os campos."]);
}
?>
