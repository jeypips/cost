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

$_POST['article']['date'] =  date("Y-m-d",strtotime($_POST['article']['date']));

$article_id = $_POST['article']['id'];
$orig_article_id = $_POST['article']['id'];

# update article to check for affected row
$article = $con->updateObj($_POST['article'],'id');
$article_modified = ($con->rows)?true:false;

# update children to check for affected rows
$modified_rows = [];

// fabric 
if (count($fabrics_dels)) {

	$con->table = "fabric";
	$delete = $con->deleteData(array("id"=>implode(",",$fabrics_dels)));
	$modified_rows[] = true;
	
}
if (count($fabrics)) {

	$con->table = "fabric";	
	
	foreach ($fabrics as $index => $value) {
			
		$fabric_row = $con->updateObj($fabrics[$index],'id');
		$modified_rows[] = ($con->rows)?true:false;
	
	}
	
};

// thread
if (count($threads_dels)) {

	$con->table = "thread";
	$delete = $con->deleteData(array("id"=>implode(",",$threads_dels)));
	$modified_rows[] = true;	
	
}
if (count($threads)) {

	$con->table = "thread";
	
	foreach ($threads as $index => $value) {
			
		$thread_row = $con->updateObj($threads[$index],'id');
		$modified_rows[] = ($con->rows)?true:false;		
	
	}
	
}

// accessory
if (count($accessories_dels)) {

	$con->table = "accessory";
	$delete = $con->deleteData(array("id"=>implode(",",$accessories_dels)));
	$modified_rows[] = true;	
	
}
if (count($accessories)) {

	$con->table = "accessory";
	
	foreach ($accessories as $index => $value) {
			
		$accessory_row = $con->updateObj($accessories[$index],'id');
		$modified_rows[] = ($con->rows)?true:false;		
	
	}
	
}

// labors
if (count($labors_dels)) {

	$con->table = "labor";
	$delete = $con->deleteData(array("id"=>implode(",",$labors_dels)));
	$modified_rows[] = true;	
	
}
if (count($labors)) {

	$con->table = "labor";

	foreach ($labors as $index => $value) {

		$labor_row = $con->updateObj($labors[$index],'id');
		$modified_rows[] = ($con->rows)?true:false;		

	}

}

$article_children_modified = (in_array(true,$modified_rows))?true:false;
$article_id = duplicate_article($con,$article_modified,$article_children_modified);


# duplicate picture
if (($article_modified) || ($article_children_modified)) {

	$picture = (file_exists("../../pictures/$orig_article_id.jpg"))?"../../pictures/$orig_article_id.jpg":"../../pictures/$orig_article_id.png";
	$duplicate_picture = PREG_REPLACE("/$orig_article_id/","$article_id",$picture);
	if (file_exists($picture)) copy($picture,$duplicate_picture);
}

echo $article_id;

function duplicate_article($con,$article_modified,$article_children_modified) {

	if ((!$article_modified) && (!$article_children_modified)) return $_POST['article']['id'];

	global $fabrics, $threads, $accessories, $labors;
		
	$old_article_no_revision = $_POST['article']['article_no_revision'];		
	
	# version no	
	if ($article_modified) {
		$fd = substr($old_article_no_revision,0,1);
		$ifd = intval($fd)+1;
		$new_article_no_revision = STR_PAD((string)$ifd,strlen((string)$ifd)+2,"0",STR_PAD_RIGHT);
		$_POST['article']['article_no_revision'] = $new_article_no_revision;		
	}
	
	# original no
	if ($article_children_modified) {
		$old_article_no_revision = $_POST['article']['article_no_revision'];
		$ld = substr($old_article_no_revision,strlen($old_article_no_revision)-2,2);
		$ild = intval($ld)+1;
		$new_article_no_revision = STR_PAD((string)$ild,(strlen((string)$ild)==1)?strlen((string)$ild)+1:strlen((string)$ild),"0",STR_PAD_LEFT);		
		$new_article_no_revision = substr($old_article_no_revision,0,1).$new_article_no_revision;
		$_POST['article']['article_no_revision'] = $new_article_no_revision;
	}

	$con->table = "articles";
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
	
	return $article_id;

}

?>