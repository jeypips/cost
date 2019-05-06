<?php

$picture = "pictures/1.jpg";
$picture = PREG_REPLACE("/1/","2",$picture);

var_dump($picture);

?>