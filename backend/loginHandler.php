<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

if(isset($_POST['userId']))
    $uid = htmlentities(strtolower($_POST['userId']));
$dsn = 'mysql:host=localhost;dbname=chatroom';
$dbuser = 'root';
$password = '';

$response = array();
$_SESSION['access'] = 'denied';
$response['access'] = 'denied';

$pdo = new PDO($dsn, $dbuser, $password);


$sql = "SELECT * FROM users WHERE username = :username OR email = :email";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':username', $uid);
$stmt->bindParam(':email', $uid);

$stmt->execute();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($row['username'] === $uid || $row['email'] === $uid) {
        $_SESSION['username'] = $row['username'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['userid'] = $row['id'];
        $_SESSION['access'] = 'granted';
        $response['access'] = 'granted';
    } 
}

header('Content-Type: application/json');
echo json_encode($response);
?>