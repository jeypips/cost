<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$article = $con->getData("SELECT * FROM articles WHERE id = $_POST[id]");

/* $desc = $con->getData("SELECT * FROM descriptions WHERE id = ".$article[0]['description']);
$article[0]['description'] = $desc[0]; */

$fabrics = $con->getData("SELECT * FROM fabric WHERE articles_id = ".$article[0]['id']);

/* foreach($fabrics as $key => $f){
	
	$description = $con->getData("SELECT * FROM descriptions WHERE id = ".$f['description']);
	$fabrics[$key]['description'] = $description[0];
}
 */
$article[0]['fabrics'] = $fabrics;
$article[0]['fabrics_dels'] = [];

$threads = $con->getData("SELECT * FROM thread WHERE articles_id = ".$article[0]['id']);
/* foreach($threads as $key => $t){
	
	$description = $con->getData("SELECT * FROM descriptions WHERE id = ".$t['description']);
	$threads[$key]['description'] = $description[0];
} */
$article[0]['threads'] = $threads;
$article[0]['threads_dels'] = [];

$accessories = $con->getData("SELECT * FROM accessory WHERE articles_id = ".$article[0]['id']);
$article[0]['accessories'] = $accessories;
$article[0]['accessories_dels'] = [];

$labors = $con->getData("SELECT * FROM labor WHERE articles_id = ".$article[0]['id']);
/* foreach($labors as $key => $l){
	
	$department = $con->getData("SELECT * FROM departments WHERE id = ".$l['department']);
	$labors[$key]['department'] = $department[0];
} */
$article[0]['labors'] = $labors;
$article[0]['labors_dels'] = [];


// if ($article[0]['date'] != null) $article[0]['date'] = date("m/d/Y",strtotime($article[0]['date']));

echo json_encode($article[0]);

?>