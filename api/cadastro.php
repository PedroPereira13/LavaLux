<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("config.php");

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $nome = $data['nome'] ?? '';
    $email = $data['email'] ?? '';
    $senha = $data['senha'] ?? '';

    if (empty($nome) || empty($email) || empty($senha)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
        exit();
    }

    // Verifica se o email já existe
    $check_sql = $conexao->prepare("SELECT id FROM usuarios WHERE email = ?");
    $check_sql->bind_param("s", $email);
    $check_sql->execute();
    $check_res = $check_sql->get_result();

    if ($check_res->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["success" => false, "message" => "Este email já está cadastrado."]);
        exit();
    }

    // Hash da senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere o novo usuário
    $sql = $conexao->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $nome, $email, $senha_hash);

    if ($sql->execute()) {
        echo json_encode([
            "success" => true, 
            "message" => "Cadastro realizado com sucesso!",
            "user" => [
                "id" => $sql->insert_id,
                "nome" => $nome,
                "email" => $email
            ]
        ]);
    } else {
        throw new Exception("Erro ao executar a query");
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $e->getMessage()]);
}

$conexao->close();
?>