<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("descriptions");

$descriptions = $con->getData("SELECT * FROM descriptions");

echo json_encode($descriptions);

?>