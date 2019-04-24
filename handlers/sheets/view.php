<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$article = $con->getData("SELECT * FROM articles WHERE id = $_POST[id]");

echo json_encode($article[0]);

?>