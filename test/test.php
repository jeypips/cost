<?php

$images = array(".jpg");

$pdf = new Imagick($images);
$pdf->setImageFormat('pdf');
$pdf->writeImages('combined.pdf', true); 



?>