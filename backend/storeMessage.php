<?php
session_start();
require_once "classes/Message.inc.php";
header("content-Type : application/json");

if(isset($_POST['message'])){
  $message = $_POST['message'];
  $sender = $_POST['sender'];
  $reciever = $_POST['reciever'];
  $msgtimestamp = $_POST['timestamp'];

  $msg = new Storemessage($message, $sender, $reciever, $msgtimestamp);
  $msg.$this->saveMessage();
}
else {
  echo json_encode($response['sucess']);

}
?>