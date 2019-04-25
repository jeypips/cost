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


$_POST['article']['date'] =  date("Y-m-d",strtotime($_POST['article']['date']));
	
# article no
$old_article_no_revision = $_POST['article']['article_no_revision'];
$fd = substr($old_article_no_revision,0,1);
$ifd = intval($fd)+1;
$new_article_no_revision = STR_PAD((string)$ifd,strlen((string)$ifd)+2,"0",STR_PAD_RIGHT);
$_POST['article']['article_no_revision'] = $new_article_no_revision;
#	

unset($_POST['article']['id']);
$_POST['article']['process_by'] = $_SESSION['id'];
$article = $con->insertObj($_POST['article']);
$article_id = $con->insertId;

//fabric 
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

//thread                   
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

//accessory                                   
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

//labors                                   
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

echo $article_id;

?>