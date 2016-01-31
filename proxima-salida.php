<?php

//$ramal = 		1; 
//$estacion = 	5; 
//$cartel = 		0; 
//$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 

$ramal = 		$_GET['ramal'];
$anden = 		$_GET['anden'];
$cartel = 		0;
$key = 			"v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ"; 
$url = 'http://trenes.mininterior.gob.ar/v2_pg/lcd_public/ajax_arribos_andenes.php?ramal='.$ramal.'&anden='.$anden.'&cartel='.$cartel.'&rnd=&key='.$key;

// Parsea el sitio para luego usar los datos en javascript. 
$contenido = file_get_contents($url);
echo $contenido; 

?>