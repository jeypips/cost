<?php

session_start();

if (isset($_SESSION['id'])) unset($_SESSION['id']);

echo "Logout Successful";

header("location: ../../../login.html");

?>