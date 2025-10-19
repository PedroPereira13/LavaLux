<?php
$host = "localhost";
$user = "root";  // usuário padrão XAMPP
$password = "";  
$database = "lavalux-api";  // nome do seu banco

$conexao = new mysqli($host, $user, $password, $database);

if ($conexao->connect_error) {
    die("Connection failed: " . $conexao->connect_error);
}

// Definir charset para utf8
$conexao->set_charset("utf8mb4");
?>