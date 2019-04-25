<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("articles");

$articles = $con->getData("SELECT *,DATE_FORMAT(date, '%M %d, %Y') date FROM articles");

$desc = $con->getData("SELECT * FROM descriptions WHERE id = ".$articles[0]['description']);
$articles[0]['description'] = $desc[0];

echo json_encode($articles);

?>