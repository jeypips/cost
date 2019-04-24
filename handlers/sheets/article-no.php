<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("articles");

$insert = $con->insertData(array("article_no"=>""));

$id = $con->insertId;

$article_no = STR_PAD((string)$id,3,"0",STR_PAD_LEFT);

$article = array("id"=>$id,"article_no"=>$article_no);

echo json_encode($article);

?>