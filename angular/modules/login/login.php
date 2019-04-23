<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$username = (isset($_POST['username']))?$_POST['username']:"";
$password = (isset($_POST['password']))?$_POST['password']:"";

$con = new pdo_db();
$sql = "SELECT id FROM accounts WHERE username = '$username' AND password = '$password'";
$account = $con->getData($sql);
if (($con->rows) > 0) {
	session_start();
	$_SESSION['id'] = $account[0]['id'];
	echo json_encode(array("login"=>true));
} else {
	echo json_encode(array("login"=>false));
}

?>