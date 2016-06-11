<?php
	$branch = 		$_GET['branch'];
	$cartel = 		0;
	//$key = 		"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 
	$key = 			"NRVQjcjTUF0I30EVFBDTqdWp%23"; 
	//$url = 		'http://trenes.mininterior.gob.ar/apps/api_tiempos_temp.php'; 
	$url = 			'https://trenes.sofse.gob.ar/apps/api_tiempos_temp.php'; 
	$content = $url.'?ramal='.$branch.'&rnd=&key='.$key;

	// Data parser to avoid the CORS error, like a custom proxy. :D 
	$parse = file_get_contents($content);
	echo $parse; 
?>