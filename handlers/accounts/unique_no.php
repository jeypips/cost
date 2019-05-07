<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("accounts");

$insert = $con->insertData(array("unique_no"=>""));

$id = $con->insertId;

$date = DATE("Y");

$unique_no = STR_PAD((string)$id,8,"$date-00",STR_PAD_LEFT);;

$account = array("id"=>$id,"unique_no"=>$unique_no);

echo json_encode($account);

?>