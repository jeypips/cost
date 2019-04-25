<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

$con = new pdo_db();

$id = $_POST['id'];

$article = $con->getData("SELECT *, DATE_FORMAT(date, '%M %d, %Y') date FROM articles WHERE id = $_POST[id]");

$desc = $con->getData("SELECT * FROM descriptions WHERE id = ".$article[0]['description']);
$article[0]['description'] = $desc[0];

foreach ($article[0] as $i => $p) {
	
	if ($p == null) $article[0][$i] = ""; // pdf equals null
	
}

header("Content-Type: application/json");
echo json_encode($article[0]);

?>