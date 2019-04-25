<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("departments");

$departments = $con->getData("SELECT * FROM departments");

echo json_encode($departments);

?>