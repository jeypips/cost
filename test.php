<?php

$old_article_no = "900";
$fd = substr($old_article_no,0,1);
$ifd = intval($fd)+1;
$new_article_no = STR_PAD((string)$ifd,strlen((string)$ifd)+2,"0",STR_PAD_RIGHT);

var_dump($new_article_no);

?>