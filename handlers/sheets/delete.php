<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db("articles");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));

foreach ($_POST['id'] as $id) {
		
		$file = "../../pictures/".$id."."."jpg";
		if (file_exists($file)) unlink($file);
		
	
};

?>