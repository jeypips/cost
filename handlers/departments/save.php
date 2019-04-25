<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

header("Content-Type: application/json");
$con = new pdo_db("departments");

if ($_POST['department']['id']) {
	

	$department = $con->updateObj($_POST['department'],'id');
	
} else {
	
	$department = $con->insertObj($_POST['department']);
	echo $con->insertId;

};


?>