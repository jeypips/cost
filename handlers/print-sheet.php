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

$desc = $con->getData("SELECT * FROM descriptions WHERE id = ".$article[0]['code']);
$article[0]['code'] = $desc[0];


$fabric_total = $con->getData("SELECT COUNT(id) total FROM fabric WHERE articles_id = ".$article[0]['id']);
$article[0]['fabric_total'] = $fabric_total[0];

$threads_total = $con->getData("SELECT COUNT(id) total FROM thread WHERE articles_id = ".$article[0]['id']);
$article[0]['thread_total'] = $threads_total[0];

$acce_total = $con->getData("SELECT COUNT(id) total FROM accessory WHERE articles_id = ".$article[0]['id']);
$article[0]['accessory_total'] = $acce_total[0];

$labor_total = $con->getData("SELECT COUNT(id) total FROM labor WHERE articles_id = ".$article[0]['id']);
$article[0]['labor_total'] = $labor_total[0];

$fabrics = $con->getData("SELECT *, IFNULL(quality,'') quality, IFNULL(color,'') color, IFNULL(qty,'') qty, IFNULL(fabric_m,'') fabric_m, IFNULL(landed_cost,'') landed_cost, IFNULL(cost,'') cost,CONCAT(IFNULL(dimension_w,''),' x ',IFNULL(dimension_l,'')) dimension FROM fabric WHERE articles_id = ".$article[0]['id']);
$article[0]['datas']['fabrics'] = $fabrics;

$threads = $con->getData("SELECT *,CONCAT(IFNULL(initial_wt,''),' - ',IFNULL(net_wt,'')) intial_net, CONCAT(IFNULL(quality,''),' - ',IFNULL(color,'')) combination, IFNULL(total_weight,'') total_weight, IFNULL(landed_cost,'') landed_cost, IFNULL(cost,'') cost FROM thread WHERE articles_id = ".$article[0]['id']);
$article[0]['datas']['threads'] = $threads;

$accessories = $con->getData("SELECT *, IFNULL(item,'') item, IFNULL(color,'') color, IFNULL(size,'') size, IFNULL(consumption,'') consumption, IFNULL(landed_cost,'') landed_cost, IFNULL(cost,'') cost FROM accessory WHERE articles_id = ".$article[0]['id']);
$article[0]['datas']['accessories'] = $accessories;

$labors = $con->getData("SELECT *, CONCAT(IFNULL(hour,''),' - ',IFNULL(min,''),' - ',IFNULL(sec,'')) time, IFNULL(department,'') department, IFNULL(process,'') process, IFNULL(special_instruction,'') special_instruction, IFNULL(operator,'') operator, IFNULL(approved_time,'') approved_time, IFNULL(tl_min,'') tl_min,IFNULL(multiplier,'') multiplier,IFNULL(cost,'') cost FROM labor WHERE articles_id = ".$article[0]['id']);
$article[0]['datas']['labors'] = $labors;

$account = $con->getData("SELECT CONCAT(firstname,' ',lastname) fullname FROM accounts WHERE id = ".$article[0]['pattern_by']);
$article[0]['pattern_by'] = $account[0];

$sum_labor = $con->getData("SELECT sum(cost) total, articles_id, id FROM labor WHERE articles_id = ".$_POST['id']);
$article[0]['grandtotal']['total_labor'] = $sum_labor[0];

$sum_fabrics = $con->getData("SELECT sum(cost) total, articles_id, id FROM fabric WHERE articles_id = ".$_POST['id']);
$article[0]['grandtotal']['total_fabric'] = $sum_fabrics[0];

$sum_thread = $con->getData("SELECT sum(cost) total, articles_id, id FROM thread WHERE articles_id = ".$_POST['id']);
$article[0]['grandtotal']['total_thread'] = $sum_thread[0];

$total_accessory = $con->getData("SELECT sum(cost) total, articles_id, id FROM accessory WHERE articles_id = ".$_POST['id']);
$article[0]['grandtotal']['total_accessory'] = $total_accessory[0];

$article[0]['grandtotal']['final_total'] = ($article[0]['grandtotal']['total_accessory']['total']+$article[0]['grandtotal']['total_labor']['total']+$article[0]['grandtotal']['total_fabric']['total']+$article[0]['grandtotal']['total_thread']['total']);

foreach ($article[0] as $i => $p) {
	
	if ($p == null) $article[0][$i] = ""; // pdf equals null
	
};


header("Content-Type: application/json");
echo json_encode($article[0]);

?>