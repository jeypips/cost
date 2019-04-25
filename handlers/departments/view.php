<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$department = $con->getData("SELECT * FROM departments WHERE id = $_POST[id]");

echo json_encode($department[0]);

?>