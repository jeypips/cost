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

$fabrics = $con->getData("SELECT *, IFNULL(quality,'') quality, IFNULL(color,'') color, IFNULL(qty,'') qty, IFNULL(fabric_m,'') fabric_m, IFNULL(landed_cost,'') landed_cost, IFNULL(cost,'') cost,CONCAT(IFNULL(dimension_w,''),' x ',IFNULL(dimension_l,'')) dimension FROM fabric WHERE articles_id = ".$article[0]['id']);
foreach($fabrics as $key => $f){
	
	$description = $con->getData("SELECT * FROM descriptions WHERE id = ".$f['description']);
	$fabrics[$key]['description'] = $description[0];
	
};
$article[0]['datas']['fabrics'] = $fabrics;

$threads = $con->getData("SELECT *,CONCAT(IFNULL(initial_wt,''),' - ',IFNULL(net_wt,'')) intial_net, CONCAT(IFNULL(quality,''),' - ',IFNULL(color,'')) combination, IFNULL(total_weight,'') total_weight, IFNULL(landed_cost,'') landed_cost, IFNULL(cost,'') cost FROM thread WHERE articles_id = ".$article[0]['id']);
foreach($threads as $key => $t){
	
	$description = $con->getData("SELECT * FROM descriptions WHERE id = ".$t['description']);
	$threads[$key]['description'] = $description[0];
	
};
$article[0]['datas']['threads'] = $threads;

$accessories = $con->getData("SELECT *, IFNULL(item,'') item, IFNULL(color,'') color, IFNULL(size,'') size, IFNULL(consumption,'') consumption, IFNULL(landed_cost,'') landed_cost, IFNULL(cost,'') cost FROM accessory WHERE articles_id = ".$article[0]['id']);
$article[0]['datas']['accessories'] = $accessories;

$labors = $con->getData("SELECT *, CONCAT(IFNULL(hour,''),' - ',IFNULL(min,''),' - ',IFNULL(sec,'')) time, IFNULL(department,'') department, IFNULL(process,'') process, IFNULL(special_instruction,'') special_instruction, IFNULL(operator,'') operator, IFNULL(approved_time,'') approved_time, IFNULL(tl_min,'') tl_min FROM labor WHERE articles_id = ".$article[0]['id']);
foreach($labors as $key => $t){
	
	$department = $con->getData("SELECT * FROM departments WHERE id = ".$t['department']);
	$labors[$key]['department'] = $department[0];
	
};
$article[0]['datas']['labors'] = $labors;

$account = $con->getData("SELECT CONCAT(firstname,' ',lastname) fullname FROM accounts WHERE id = ".$article[0]['process_by']);
$article[0]['process_by'] = $account[0];

foreach ($article[0] as $i => $p) {
	
	if ($p == null) $article[0][$i] = ""; // pdf equals null
	
};

/* $array = array (
	0=>array(
		"quality" => $article[0]['datas']['fabrics'][0]['quality'],
		"color" => $article[0]['datas']['fabrics'][0]['color'],
		"qty" => $article[0]['datas']['fabrics'][0]['qty'],
		"dimension_w" => $article[0]['datas']['fabrics'][0]['dimension_w'],
		"dimension_l" => $article[0]['datas']['fabrics'][0]['dimension_l'],
		"fabric_m" => $article[0]['datas']['fabrics'][0]['fabric_m'],
		"landed_cost" => $article[0]['datas']['fabrics'][0]['landed_cost'],
		"cost" => $article[0]['datas']['fabrics'][0]['cost'],
		"dimension" => $article[0]['datas']['fabrics'][0]['dimension'],
	),
); */
// var_dump($array); exit();
/* $array = array (
	0=>array(
		"description"=>$article[0]['datas']['fabrics'][0]['description']['name'],
		"quality"=>$article[0]['datas']['fabrics'][0]['quality'],
		"color"=>$article[0]['datas']['fabrics'][0]['color'],
		"qty"=>$article[0]['datas']['fabrics'][0]['qty'],
		"dimension_w"=>$article[0]['datas']['fabrics'][0]['dimension_w'],
		"dimension_l"=>$article[0]['datas']['fabrics'][0]['dimension_l'],
		"fabric_m"=>$article[0]['datas']['fabrics'][0]['fabric_m'],
		"landed_cost"=>$article[0]['datas']['fabrics'][0]['landed_cost'],
		"cost"=>$article[0]['datas']['fabrics'][0]['cost'],
	),
	1=>array(
		"description"=>$article[0]['datas']['fabrics'][1]['description']['name'],
		"quality"=>$article[0]['datas']['fabrics'][1]['quality'],
		"color"=>$article[0]['datas']['fabrics'][1]['color'],
		"qty"=>$article[0]['datas']['fabrics'][1]['qty'],
		"dimension_w"=>$article[0]['datas']['fabrics'][1]['dimension_w'],
		"dimension_l"=>$article[0]['datas']['fabrics'][1]['dimension_l'],
		"fabric_m"=>$article[0]['datas']['fabrics'][1]['fabric_m'],
		"landed_cost"=>$article[0]['datas']['fabrics'][1]['landed_cost'],
		"cost"=>$article[0]['datas']['fabrics'][1]['cost'],
	),
	2=>array(
		"description"=>$article[0]['datas']['fabrics'][2]['description']['name'],
		"quality"=>$article[0]['datas']['fabrics'][2]['quality'],
		"color"=>$article[0]['datas']['fabrics'][2]['color'],
		"qty"=>$article[0]['datas']['fabrics'][2]['qty'],
		"dimension_w"=>$article[0]['datas']['fabrics'][2]['dimension_w'],
		"dimension_l"=>$article[0]['datas']['fabrics'][2]['dimension_l'],
		"fabric_m"=>$article[0]['datas']['fabrics'][2]['fabric_m'],
		"landed_cost"=>$article[0]['datas']['fabrics'][2]['landed_cost'],
		"cost"=>$article[0]['datas']['fabrics'][2]['cost'],
	),
	3=>array(
		"description"=>$article[0]['datas']['fabrics'][3]['description']['name'],
	),
); */


header("Content-Type: application/json");
echo json_encode($article[0]);

?>