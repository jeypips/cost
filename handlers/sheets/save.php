<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

require_once 'classes.php';

header("Content-Type: application/json");
$con = new pdo_db("articles");

session_start();

$fabrics = $_POST['article']['fabrics'];
unset($_POST['article']['fabrics']);

$fabrics_dels = $_POST['article']['fabrics_dels'];
unset($_POST['article']['fabrics_dels']);

$threads = $_POST['article']['threads'];
unset($_POST['article']['threads']);

$threads_dels = $_POST['article']['threads_dels'];
unset($_POST['article']['threads_dels']);

$accessories = $_POST['article']['accessories'];
unset($_POST['article']['accessories']);

$accessories_dels = $_POST['article']['accessories_dels'];
unset($_POST['article']['accessories_dels']);

$labors = $_POST['article']['labors'];
unset($_POST['article']['labors']);

$labors_dels = $_POST['article']['labors_dels'];
unset($_POST['article']['labors_dels']);

// $_POST['article']['date'] = date("Y-m-d",strtotime($_POST['article']['date']));

if ($_POST['article']['id']) {
	
	$_POST['article']['pattern_by'] = $_SESSION['id'];
	$article = $con->updateObj($_POST['article'],'id');
	$article_id = $_POST['article']['id'];
	
} else {
	
	$_POST['article']['pattern_by'] = $_SESSION['id'];
	$article = $con->insertObj($_POST['article']);
	$article_id = $con->insertId;
	echo $con->insertId;

};

//fabric 
if (count($fabrics_dels)) {

	$con->table = "fabric";
	$delete = $con->deleteData(array("id"=>implode(",",$fabrics_dels)));		
	
}
 

if (count($fabrics)) {

	$con->table = "fabric";
	
	foreach ($fabrics as $index => $value) {
		
		$fabrics[$index]['articles_id'] = $article_id;		
		
		$fabrics[$index]['fabric_m'] = ($fabrics[$index]['qty']*((($fabrics[$index]['dimension_l']/100)*($fabrics[$index]['dimension_w']/100))*1.1));
		
		$fabrics[$index]['cost'] = ($fabrics[$index]['fabric_m']*$fabrics[$index]['landed_cost']);
	}
	
	foreach ($fabrics as $index => $value) {

		if ($value['id']) {
			
			$fabric_row = $con->updateObj($fabrics[$index],'id');
			
		} else {
			
			unset($fabrics[$index]['id']);
			$fabric_row = $con->insertObj($fabrics[$index]);
			
		}
	
	}
	
};

//thread
if (count($threads_dels)) {

	$con->table = "thread";
	$delete = $con->deleteData(array("id"=>implode(",",$threads_dels)));		
	
}
                                    
if (count($threads)) {

	$con->table = "thread";
	
	foreach ($threads as $index => $value) {
		
		$threads[$index]['articles_id'] = $article_id;
		
		$threads[$index]['total_weight'] = (round($threads[$index]['initial_wt']-$threads[$index]['net_wt']));
		
		$threads[$index]['cost'] = ($threads[$index]['landed_cost']*$threads[$index]['total_weight']);
	}
	
	foreach ($threads as $index => $value) {

		if ($value['id']) {
			
			$thread_row = $con->updateObj($threads[$index],'id');
			
		} else {
			
			unset($threads[$index]['id']);
			$thread_row = $con->insertObj($threads[$index]);
			
		}
	
	}
	
};

//accessory
if (count($accessories_dels)) {

	$con->table = "accessory";
	$delete = $con->deleteData(array("id"=>implode(",",$accessories_dels)));		
	
}
                                    
if (count($accessories)) {

	$con->table = "accessory";
	
	foreach ($accessories as $index => $value) {
		
		$accessories[$index]['articles_id'] = $article_id;	
		
		$accessories[$index]['cost'] = ($accessories[$index]['consumption']*$accessories[$index]['landed_cost']);
		
	}
	
	foreach ($accessories as $index => $value) {

		if ($value['id']) {
			
			$accessory_row = $con->updateObj($accessories[$index],'id');
			
		} else {
			
			unset($accessories[$index]['id']);
			$accessory_row = $con->insertObj($accessories[$index]);
			
		}
	
	}
	
};

//labors
if (count($labors_dels)) {

	$con->table = "labor";
	$delete = $con->deleteData(array("id"=>implode(",",$labors_dels)));		
	
}
                                    
if (count($labors)) {

	$con->table = "labor";
	
	foreach ($labors as $index => $value) {
		
		$labors[$index]['articles_id'] = $article_id;	

		$labors[$index]['cost'] = ($labors[$index]['tl_min']*$labors[$index]['multiplier']);		
		
	}
	
	foreach ($labors as $index => $value) {

		if ($value['id']) {
			
			$labor_row = $con->updateObj($labors[$index],'id');
			
		} else {
			
			unset($labors[$index]['id']);
			$labor_row = $con->insertObj($labors[$index]);
			
		}
	
	}
	
};


?>