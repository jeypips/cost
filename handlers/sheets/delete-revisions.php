<?php

include_once '../../db.php';

$con = new pdo_db("articles");

$articles = $con->query("DELETE FROM articles WHERE revision = 'yes' AND ISNULL(modified)");

?>