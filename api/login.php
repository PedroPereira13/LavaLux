<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';

if ($email && $senha) {
    $sql = $conexao->prepare("SELECT senha FROM usuarios WHERE email = ?");
    $sql->bind_param("s", $email);
    $sql->execute();
    $res = $sql->get_result();

    if ($res->num_rows > 0) {
        $user = $res->fetch_assoc();
        if (password_verify($senha, $user['senha'])) {
            echo json_encode(["message" => "Login realizado com sucesso!"]);
        } else {
            echo json_encode(["message" => "Senha incorreta."]);
        }
    } else {
        echo json_encode(["message" => "Usuário não encontrado."]);
    }
} else {
    echo json_encode(["message" => "Preencha todos os campos."]);
}
?>
