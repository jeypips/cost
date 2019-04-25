<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

header("Content-Type: application/json");
$con = new pdo_db("descriptions");

if ($_POST['description']['id']) {
	

	$description = $con->updateObj($_POST['description'],'id');
	
} else {
	
	$description = $con->insertObj($_POST['description']);
	echo $con->insertId;

};


?>