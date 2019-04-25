<?php

function uploadFiles($con,$uploads,$id,$path=null) {
	
	$ft = array(
		"jpeg"=>".jpg",
		"pdf"=>".pdf",
		"png"=>".png"
	);

	$con->table = "files";	

	# clear files table for document if there are any
	$con->deleteData(array("id"=>$id));
	#

	if (count($uploads["files"])) {
	
		$dir = "../../files";
		if ($path != null) $dir = $path;
		
		if (!folder_exist($dir)) mkdir($dir);		

		foreach ($uploads["files"] as $key => $f) {

			if ($f['file'] == "") continue;

			$imgData = str_replace(' ','+',$f['file']);
			$imgData =  substr($imgData,strpos($imgData,",")+1);
			$imgData = base64_decode($imgData);
			$fileName = "$barcode"."_$key".$ft[$f['type']];
			$filePath = "$dir/$fileName";
			$file = fopen($filePath, 'w');
			fwrite($file, $imgData);
			fclose($file);

			$data = array("id"=>$id,"file_name"=>$fileName);
			$con->insertData($data);

		};

	};

};

function deleteFiles($con,$files,$path=null) {
	
	$dir = "../../files";
	if ($path != null) $dir = $path;
	
	foreach ($files as $file) {
		
		if (file_exists($dir."/".$file)) unlink($dir."/".$file);	
		
	};
	
};

?>