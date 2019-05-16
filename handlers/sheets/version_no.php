<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

// $session_user_id = $_SESSION['id'];	

if (!isset($_POST['article_no_revision'])) $_POST['article_no_revision'] = "";

$article_no_revision = $con->getData("SELECT * FROM articles WHERE article_no_revision = '".$_POST['article_no_revision']."'");	

$res = array("status"=>false);
if (count($article_no_revision)) $res = array("status"=>true);

header("Content-Type: application/json");
echo json_encode($res);

?>