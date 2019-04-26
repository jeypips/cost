<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$sheets = $con->getData("SELECT count(*) total_sheet FROM articles");
$account = $con->getData("SELECT count(*) total_account FROM accounts");
$department = $con->getData("SELECT count(*) total_department FROM departments");
$description = $con->getData("SELECT count(*) total_description FROM descriptions");
$fabric = $con->getData("SELECT count(*) fabric FROM fabric");
$thread = $con->getData("SELECT count(*) thread FROM thread");
$access = $con->getData("SELECT count(*) access FROM accessory");
$labor = $con->getData("SELECT count(*) labor FROM labor");

$dashboard = array(
	"total_sheet"=>(count($sheets))?$sheets[0]['total_sheet']:0,
	"total_account"=>(count($account))?$account[0]['total_account']:0,
	"total_department"=>(count($department))?$department[0]['total_department']:0,
	"total_description"=>(count($description))?$description[0]['total_description']:0,
	"fabric"=>(count($fabric))?$fabric[0]['fabric']:0,
	"thread"=>(count($thread))?$thread[0]['thread']:0,
	"access"=>(count($access))?$access[0]['access']:0,
	"labor"=>(count($labor))?$labor[0]['labor']:0,
);

echo json_encode($dashboard);

?>