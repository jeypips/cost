<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();
header("Content-Type: application/json");
$con = new pdo_db("accounts");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));	


?>