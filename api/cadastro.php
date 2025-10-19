<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['nome']) && !empty($data['email']) && !empty($data['senha'])) {
    $nome = $data['nome'];
    $email = $data['email'];
    $senha = password_hash($data['senha'], PASSWORD_DEFAULT);

    $sql = $conexao->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $nome, $email, $senha);

    if ($sql->execute()) {
        echo json_encode(["message" => "Cadastro realizado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Erro ao cadastrar."]);
    }
} else {
    echo json_encode(["message" => "Preencha todos os campos."]);
}
?>
