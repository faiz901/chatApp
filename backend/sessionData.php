<?php 
session_start();
header("Content-Type: application/json");

if (isset($_SESSION['access']) && $_SESSION['access'] == 'granted') {
    $sessionData = array();
    foreach ($_SESSION as $session => $value) {
        $sessionData[$session] = $value;
    }
    echo json_encode($sessionData);
} else {
    $response['access'] = "denied";
    echo json_encode($response);    
}
?>
