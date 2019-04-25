<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$description = $con->getData("SELECT * FROM descriptions WHERE id = $_POST[id]");

echo json_encode($description[0]);

?>