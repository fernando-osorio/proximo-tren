<?php
$cartel = 		0;
//$key = 		"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 
$key = 			"NRVQjcjTUF0I30EVFBDTqdWp%23"; 
//$url = 		'http://trenes.mininterior.gob.ar/v2_pg/pantalla_led/ajax_resumen_mitre.php'; 
$url = 			'http://trenes.sofse.gob.ar/v2_pg/pantalla_led/ajax_resumen_mitre.php'; 
$content = $url.'?cartel='.$cartel.'&rnd=&key='.$key;

// Parsea el sitio para luego usar los datos en javascript. 
$contenido = file_get_contents($content);
echo $contenido; 

?>