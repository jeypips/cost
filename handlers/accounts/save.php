<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

header("Content-Type: application/json");
$con = new pdo_db("accounts");

if ($_POST['account']['id']) {
	

	$account = $con->updateObj($_POST['account'],'id');
	
} else {
	
	$account = $con->insertObj($_POST['account']);
	echo $con->insertId;

}


?>