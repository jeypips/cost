<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$session_user_id = $_SESSION['id'];	

if (!isset($_POST['username'])) $_POST['username'] = "";

$user = $con->getData("SELECT * FROM accounts WHERE id != $session_user_id AND username = '".$_POST['username']."'");	

$res = array("status"=>false);	
if (count($user)) $res = array("status"=>true);
	
header("Content-Type: application/json");
echo json_encode($res);

?>