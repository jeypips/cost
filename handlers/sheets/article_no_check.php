<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

// $session_user_id = $_SESSION['id'];	

if (!isset($_POST['article_no'])) $_POST['article_no'] = "";

$user = $con->getData("SELECT * FROM articles WHERE article_no = '".$_POST['article_no']."'");	

$res = array("status"=>false);	
if (count($user)) $res = array("status"=>true);
	
header("Content-Type: application/json");
echo json_encode($res);

?>