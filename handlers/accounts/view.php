<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$account = $con->getData("SELECT * FROM accounts WHERE id = $_POST[id]");

$group = $con->getData("SELECT id, description FROM groups WHERE id = ".$account[0]['groups']);
$account[0]['groups'] = $group[0];	

echo json_encode($account[0]);

?>