<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

require_once 'classes.php';

header("Content-Type: application/json");
$con = new pdo_db("articles");

session_start();

$fabrics = $_POST['article']['fabrics'];
unset($_POST['article']['fabrics']);
unset($_POST['article']['fabrics_dels']);

$threads = $_POST['article']['threads'];
unset($_POST['article']['threads']);
unset($_POST['article']['threads_dels']);

$accessories = $_POST['article']['accessories'];
unset($_POST['article']['accessories']);
unset($_POST['article']['accessories_dels']);

$labors = $_POST['article']['labors'];
unset($_POST['article']['labors']);
unset($_POST['article']['labors_dels']);

// $_POST['article']['date'] = date("Y-m-d",strtotime($_POST['article']['date']));

$orig_article_id = $_POST['article']['id'];

$_POST['article']['pattern_by'] = $_SESSION['id'];
unset($_POST['article']['id']);
$_POST['article']['revision'] = "yes";
$_POST['article']['modified'] = null;
$article = $con->insertObj($_POST['article']);
$article_id = $con->insertId;

// fabric 
if (count($fabrics)) {

	$con->table = "fabric";
	
	foreach ($fabrics as $index => $value) {
		
		$fabrics[$index]['articles_id'] = $article_id;		
		
	}
	
	foreach ($fabrics as $index => $value) {
			
		unset($fabrics[$index]['id']);
		$fabric_row = $con->insertObj($fabrics[$index]);
	
	}
	
};

// thread                                  
if (count($threads)) {

	$con->table = "thread";
	
	foreach ($threads as $index => $value) {
		
		$threads[$index]['articles_id'] = $article_id;		
		
	}
	
	foreach ($threads as $index => $value) {

		unset($threads[$index]['id']);
		$thread_row = $con->insertObj($threads[$index]);

	}
	
};

// accessory                                  
if (count($accessories)) {

	$con->table = "accessory";
	
	foreach ($accessories as $index => $value) {
		
		$accessories[$index]['articles_id'] = $article_id;		
		
	}
	
	foreach ($accessories as $index => $value) {

		unset($accessories[$index]['id']);
		$accessory_row = $con->insertObj($accessories[$index]);

	}
	
};

// labors                         
if (count($labors)) {

	$con->table = "labor";
	
	foreach ($labors as $index => $value) {
		
		$labors[$index]['articles_id'] = $article_id;		
		
	}
	
	foreach ($labors as $index => $value) {
			
		unset($labors[$index]['id']);
		$labor_row = $con->insertObj($labors[$index]);
	
	}
	
};

$picture = (file_exists("../../pictures/$orig_article_id.jpg"))?"../../pictures/$orig_article_id.jpg":"../../pictures/$orig_article_id.png";
$duplicate_picture = PREG_REPLACE("/$orig_article_id/","$article_id",$picture);
if (file_exists($picture)) copy($picture,$duplicate_picture);

echo json_encode(viewArticle($con,$article_id));

function viewArticle($con,$id) {
	
$article = $con->getData("SELECT * FROM articles WHERE id = $id");

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

return $article[0];
	
};

?>