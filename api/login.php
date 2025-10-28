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

    $email = $data['email'] ?? '';
    $senha = $data['senha'] ?? '';

    if (empty($email) || empty($senha)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
        exit();
    }

   
    $sql = $conexao->prepare("SELECT id, nome, email, senha FROM usuarios WHERE email = ?");
    $sql->bind_param("s", $email);
    $sql->execute();
    $res = $sql->get_result();

    if ($res->num_rows > 0) {
        $user = $res->fetch_assoc();
        

        if (password_verify($senha, $user['senha'])) {
            echo json_encode([
                "success" => true, 
                "message" => "Login realizado com sucesso!",
                "user" => [
                    "id" => $user['id'],
                    "nome" => $user['nome'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Senha incorreta."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro no servidor: " . $e->getMessage()]);
}

$conexao->close();
?>