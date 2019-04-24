<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

header("Content-Type: application/json");
$con = new pdo_db("articles");

if ($_POST['article']['id']) {
	

	$article = $con->updateObj($_POST['article'],'id');
	
} else {
	
	$article = $con->insertObj($_POST['article']);
	echo $con->insertId;

}


?>