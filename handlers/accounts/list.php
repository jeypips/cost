<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("accounts");

$accounts = $con->getData("SELECT id, CONCAT(firstname,' ',lastname) fullname, username, groups, username, DATE_FORMAT(date_added, '%M %d, %Y') date_added FROM accounts");

echo json_encode($accounts);

?>