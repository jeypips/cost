<?php

define('system_privileges', array(
	array(
		"id"=>"dashboard",
		"description"=>"Dashboard",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Dashboard","value"=>false),
		),
	),
	array(
		"id"=>"sheets",
		"description"=>"Sheets",
		"privileges"=>array(
			array("id"=>1,"description"=>"Show Sheets","value"=>false),
			array("id"=>2,"description"=>"Add Sheets","value"=>false),
			array("id"=>3,"description"=>"Edit Sheets","value"=>false),
			array("id"=>4,"description"=>"Delete Sheets","value"=>false),
		),
	),
	array(
		"id"=>"maintenance",
		"description"=>"Maintenance",
		"privileges"=>array(
			array("id"=>1,"description"=>"Show Maintenance","value"=>false),
		),
	),
));

?>