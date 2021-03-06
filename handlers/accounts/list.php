<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db("accounts");

$accounts = $con->getData("SELECT id, CONCAT(firstname,' ',lastname) fullname, username, groups, username, DATE_FORMAT(date_added, '%M %d, %Y') date_added, unique_no FROM accounts");

foreach($accounts as $key => $acc){
	
	if ($acc['groups']==null) {
		$accounts[$key]['groups'] = array("id"=>0,"description"=>"");			
	} else {
		$groups = $con->getData("SELECT id, description FROM groups WHERE id = ".$acc['groups']);
		$accounts[$key]['groups'] = $groups[0];
	}
};

echo json_encode($accounts);

?>