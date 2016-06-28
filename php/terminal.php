<?php

//$ramal = 		1; 
//$estacion = 	5; 
//$cartel = 		0; 
//$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 

$ramal = 		$_GET['ramal'];
$sentido = 		$_GET['sentido'];
$cartel = 		0;
//$key = 		"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 
//$key = 		"NRVQjcjTUF0I30EVFBDTqdWp%23"; 
$key = 			"NRVQjcjTUF0I30EVFBDTqdWp%23"; 
//$url = 		'http://trenes.mininterior.gob.ar/v2_pg/pantalla_led/ajax_resumen.php'; 
$url = 			'http://trenes.sofse.gob.ar/v2_pg/pantalla_led/ajax_resumen.php'; 
$key = 			"v%23v%23QTUNWp%23MpWR0wkj%23RhHTqVUM"; 

$content = $url.'?ramal='.$ramal.'&sentido='.$sentido.'&cartel='.$cartel.'&rnd=&key='.$key;

// Parsea el sitio para luego usar los datos en javascript. 
$contenido = file_get_contents($content);
echo $contenido; 

?>