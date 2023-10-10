<?php
    class message {
    protected $message;
    protected $sender;
    protected $reciever;
    protected $timestamp;
    protected $lastRequest;

    protected function __constructor($message,$sender, $reciever, $timestamp){
      $this->message = $message;
      $this->sender = $sender;
      $this->reciever = $reciever;
      $this->timestamp = $timestamp;
      $this->message = $_SESSION['lastRequest'];
    }
  }

  class Storemessage extends message {

    private $dsn = 'mysql:host=localhost;dbname=chatroom';
    private $dbuser = 'root';
    private $password = '';
    
    function __constructor($message, $sender, $reciever, $timestamp)
    {
      parent::__constructor($message, $sender, $reciever, $timestamp);
    }

    function saveMessage(){

      $pdo = new PDO($this->dsn,$this->dbuser,$this->password);
      
      $sql = "INSERT INTO chat (message, sender_id, reciever_id , sendTime) VALUES(:message, :sender_id, :reciever_id , :sendTime)";
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':message', parent::$message);
      $stmt->bindParam(':sender_id', parent::$sender);
      $stmt->bindParam(':reciever_id', parent::$reciever);
      $stmt->bindParam(':sendTime', parent::$timestamp);
      
      $success = $stmt->execute();
      
      if($success){
        return true; 
      }
      else {
        return false;
      }
    }
  }
?>