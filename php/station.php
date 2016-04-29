<?php

//$ramal = 		1; 
//$estacion = 	5; 
//$cartel = 		0; 
//$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 

$linea = 		$_GET['linea'];
$estacion = 	$_GET['estacion'];
$cartel = 		0;
$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 

$url = 'http://trenes.mininterior.gob.ar/v2_pg/lcd_public/ajax_get_datos_formaciones.php?ramal='.$linea.'&estacion='.$estacion.'&cartel='.$cartel.'&rnd=&key='.$key;

// Parsea el sitio para luego usar los datos en javascript. 
$contenido = file_get_contents($url);
echo $contenido; 

?>