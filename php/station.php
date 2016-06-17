<?php
$branch = 		$_GET['branch'];
$station = 		$_GET['station'];
$cartel = 		0;
//$key = 		"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 
//$url = 		'http://trenes.mininterior.gob.ar/v2_pg/lcd_public/ajax_get_datos_formaciones.php'; 
$key = 			"NRVQjcjTUF0I30EVFBDTqdWp%23"; 
$url = 			'http://trenes.sofse.gob.ar/v2_pg/lcd_public/ajax_get_datos_formaciones.php'; 
//$content = $url.'?ramal='.$linea.'&estacion='.$estacion.'&cartel='.$cartel.'&rnd=&key='.$key;
$content = $url.'?ramal='.$branch.'&estacion='.$station.'&rnd=&key='.$key;

// Parsea el sitio para luego usar los datos en javascript. 
$parse = file_get_contents($content);
echo $parse; 

?>