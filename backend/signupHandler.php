<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

$username = $_POST['username'];
$email = $_POST['email'];

$dsn = 'mysql:host=localhost;dbname=chatroom';
$dbuser = 'root';
$password = '';

$response = array();

$pdo = new PDO($dsn, $dbuser, $password);

$sql = "INSERT INTO users (username , email) VALUES(:username,:email)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':email', $email);

$success = $stmt->execute();

if ($success) {
  $response['registered'] = true;
} else {
  $response['registered'] = false;
}

header('Content-Type: application/json');
echo json_encode($response);
