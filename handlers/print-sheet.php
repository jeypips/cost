<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

$con = new pdo_db();

$id = $_POST['id'];

$article = $con->getData("SELECT *, DATE_FORMAT(date, '%M %d, %Y') date FROM articles WHERE id = $_POST[id]");

$dir = "../pictures/";
$picture = (file_exists($dir.$article[0]['id'].".jpg"))?$dir.$article[0]['id'].".jpg":$dir.$article[0]['id'].".png";

if (file_exists($picture)) {
	
	$picture = (file_exists($dir.$article[0]['id'].".jpg"))?$dir.$article[0]['id'].".jpg":$dir.$article[0]['id'].".png";
    
} else {
    $picture = "../pictures/default.jpg";
}

// var_dump($picture);
// Read image path, convert to base64 encoding
$dir_file_data = base64_encode(file_get_contents($picture));

// Format the image SRC:  data:{mime};base64,{data};
$type = mime_content_type($picture);

$file = 'data:'.$type.';base64,'.$dir_file_data;

$file_type = explode("/",$type);

$article[0]['picture'] = $file;

$desc = $con->getData("SELECT * FROM descriptions WHERE id = ".$article[0]['description']);
$article[0]['description'] = $desc[0];

$fabrics = $con->getData("SELECT *,CONCAT(dimension_w,' x ',dimension_l) dimension FROM fabric WHERE articles_id = ".$article[0]['id']);
foreach($fabrics as $key => $f){
	
	$description = $con->getData("SELECT * FROM descriptions WHERE id = ".$f['description']);
	$fabrics[$key]['description'] = $description[0];
	
};
$article[0]['datas']['fabrics'] = $fabrics;

$threads = $con->getData("SELECT *,CONCAT(initial_wt,' - ',net_wt) intial_net, CONCAT(quality,' - ',color) combination FROM thread WHERE articles_id = ".$article[0]['id']);
foreach($threads as $key => $t){
	
	$description = $con->getData("SELECT * FROM descriptions WHERE id = ".$t['description']);
	$threads[$key]['description'] = $description[0];
	
};
$article[0]['datas']['threads'] = $threads;

$accessories = $con->getData("SELECT * FROM accessory WHERE articles_id = ".$article[0]['id']);
$article[0]['datas']['accessories'] = $accessories;

$labors = $con->getData("SELECT *, CONCAT(hour,' - ',min,' - ',sec) time FROM labor WHERE articles_id = ".$article[0]['id']);
foreach($labors as $key => $t){
	
	$department = $con->getData("SELECT * FROM departments WHERE id = ".$t['department']);
	$labors[$key]['department'] = $department[0];
	
};
$article[0]['datas']['labors'] = $labors;

$account = $con->getData("SELECT CONCAT(firstname,' ',lastname) fullname FROM accounts WHERE id = ".$article[0]['process_by']);
$article[0]['process_by'] = $account[0];

foreach ($article[0] as $i => $p) {
	
	if ($p == null) $article[0][$i] = ""; // pdf equals null
	
}

header("Content-Type: application/json");
echo json_encode($article[0]);

?>