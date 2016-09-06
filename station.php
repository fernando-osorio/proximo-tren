<?php
//$key =                "v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ";
//$url =                'http://trenes.mininterior.gob.ar/v2_pg/lcd_public/ajax_get_datos_formaciones.php';
//$content = $url.'?ramal='.$linea.'&estacion='.$estacion.'&cartel='.$cartel.'&rnd=&key='.$key;
$branch =               $_GET['branch'];
$station =              $_GET['station'];
$cartel =               0;
$key1 =                  "NRVQjcjTUF0I30EVFBDTqdWp%23";
$key2 =                  "v%23v%23QTUNWp%23MpWR0wkj%23RhHTqVUM";
$url =                  'http://trenes.sofse.gob.ar/v2_pg/lcd_public/ajax_get_datos_formaciones.php';

// Parsea el sitio para luego usar los datos en javascript.

header("Access-Control-Allow-Origin: *");

$parse1 = file_get_contents($url.'?ramal='.$branch.'&estacion='.$station.'&rnd=&key='.$key1);
$parse2 = file_get_contents($url.'?ramal='.$branch.'&estacion='.$station.'&rnd=&key='.$key2);


if ($parse1 !== "incorrect key") {
	$parse = $parse1; 
} else if ($parse2 !== "incorrect key") {
	$parse = $parse2; 
} else {
	$parse = "incorrect key";
}

echo $parse;
?>