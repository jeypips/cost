<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("articles");

$articles = $con->getData("SELECT * FROM articles");

echo json_encode($articles);

?>