<?php

//$ramal = 		1; 
//$estacion = 	5; 
//$cartel = 		0; 
//$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 

$ramal = 		$_GET['ramal'];
$sentido = 		$_GET['sentido'];
$cartel = 		0;
$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 
$url = 'http://trenes.mininterior.gob.ar/v2_pg/pantalla_led/ajax_resumen.php?ramal='.$ramal.'&sentido='.$sentido.'&cartel='.$cartel.'&rnd=&key='.$key;

// Parsea el sitio para luego usar los datos en javascript. 
$contenido = file_get_contents($url);
echo $contenido; 

?>