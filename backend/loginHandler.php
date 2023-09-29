<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
$uid = htmlentities(strtolower($_POST['userId']));

$dsn = 'mysql:host=localhost;dbname=chatroom';
$dbuser = 'root';
$password = '';

$response = array();
$response['access'] = 'null';

$pdo = new PDO($dsn, $dbuser, $password);


$sql = "SELECT * FROM users WHERE username = :username OR email = :email";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':username', $uid);
$stmt->bindParam(':email', $uid);

$stmt->execute();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($row['username'] === $uid || $row['email'] === $uid) {
        $response['access'] = 'granted';
    } else {
        $response['access'] = 'denied';
    }
}

header('Content-Type: application/json');
echo json_encode($response);
