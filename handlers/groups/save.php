<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';
require_once '../../classes.php';

header("Content-Type: application/json");
$con = new pdo_db("groups");

$privileges = [];
if (isset($_POST['privileges'])) {
	
	$arrayHex = new ArrayHex();
		
	$privileges = $arrayHex->toHex(json_encode($_POST['privileges']));
	$_POST['group']['privileges'] = $privileges;
	
};

if ($_POST['group']['id']) {
	

	$group = $con->updateObj($_POST['group'],'id');
	
} else {
	
	$group = $con->insertObj($_POST['group']);
	echo $con->insertId;

};


?>