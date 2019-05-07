<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("articles");

$articles = $con->getData("SELECT * FROM articles");
 
foreach($articles as $key => $ar){
	
	
	
	if ($ar['description']==null) {
		$articles[$key]['description'] = array("id"=>0,"name"=>"");			
	} else {
		$desc = $con->getData("SELECT * FROM descriptions WHERE id = ".$ar['description']);
		$articles[$key]['description'] = $desc[0];
	};
	
	if ($ar['process_by']==null) {
		$articles[$key]['process_by'] = array("id"=>0,"fullname"=>"");			
	} else {
	$fullname = $con->getData("SELECT CONCAT(firstname,' ',lastname) fullname FROM accounts WHERE id = ".$ar['process_by']);
	$articles[$key]['process_by'] = $fullname[0];
	};
};

echo json_encode($articles);

?>