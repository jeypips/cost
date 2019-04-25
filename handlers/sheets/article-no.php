<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("articles");

$insert = $con->insertData(array("article_no"=>""));

$id = $con->insertId;

// STR_PAD((string)$id,5,"/ 00",STR_PAD_LEFT);
$article_no_revision = "000";

$article = array("id"=>$id,"article_no_revision"=>$article_no_revision);

echo json_encode($article);

?>