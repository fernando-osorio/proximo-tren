/*javascript*/
var jsonList = {"Trenes" : [
					{	"id": 0, 
						"linea": "Sarmiento", 
						"ramales": [
							{"idRamal": 0, "ramal": "Once-Moreno", 
								"estacion": [
															{"id": 1, 	"nombre": "Once", "anden": [{"id": 1, "nombre": "Plaza Once - Andén 1"}, 
																																			{"id": 2, "nombre": "Plaza Once - Andén 2"}, 
																																			{"id": 3, "nombre": "Plaza Once - Andén 3"}, 
																																			{"id": 4, "nombre": "Plaza Once - Andén 4"}, 
																																			{"id": 5, "nombre": "Plaza Once - Andén 5"}, 
																																			{"id": 6, "nombre": "Plaza Once - Andén 6"}, 
																																			{"id": 11, "nombre": "Plaza Miserere - Andén 1"}, 
																																			{"id": 12, "nombre": "Plaza Miserere - Andén 1"} 
																]
															}, 
															{"id": 2, 	"nombre": "Caballito"}, 
															{"id": 3, 	"nombre": "Flores"}, 
															{"id": 4, 	"nombre": "Floresta"}, 
															{"id": 5, 	"nombre": "Villa Luro"}, 
															{"id": 6, 	"nombre": "Liniers"}, 
															{"id": 7, 	"nombre": "Ramos Mejía"}, 
															{"id": 8, 	"nombre": "Haedo"}, 
															{"id": 9, 	"nombre": "Morón"}, 
															{"id": 10, 	"nombre": "Castelar"}, 
															{"id": 11, 	"nombre": "Ituzaingó"}, 
															{"id": 12, 	"nombre": "San Antonio de Padua"}, 
															{"id": 13, 	"nombre": "Merlo"}, 
															{"id": 14, 	"nombre": "Paso del Rey"}, 
															{"id": 15, 	"nombre": "Moreno", "anden": [{"id": 1, "nombre": "Andén 1"}, 
																																			{"id": 2, "nombre": "Andén 2"}, 
																																			{"id": 3, "nombre": "Andén 3"}, 
																																			{"id": 4, "nombre": "Andén 4"}, 
																																			{"id": 5, "nombre": "Andén 5"}, 
																																			{"id": 6, "nombre": "Andén 6"} 
																]
															}
								], 
								"sentido": [	{"id": 	2, 	"estacion": "Once"},
															{"id": 	1, 	"estacion": "Moreno"}]
							}, 
							{"idRamal": 1, "ramal": "Merlo-Lobos", 
								"estacion": [
															{"id": 1, 	"nombre": "Merlo"}, 
															{"id": 2, 	"nombre": "Kilómetro 34"}, 
															{"id": 3, 	"nombre": "Agustín Ferrari"}, 
															{"id": 4, 	"nombre": "Mariano Acosta"}, 
															{"id": 5, 	"nombre": "Marcos Paz"}, 
															{"id": 6, 	"nombre": "Zamudio"}, 
															{"id": 7, 	"nombre": "General Hornos"}, 
															{"id": 8, 	"nombre": "General Las Heras"}, 
															{"id": 9, 	"nombre": "Speratti"}, 
															{"id": 10, 	"nombre": "Zapiola"}, 
															{"id": 11, 	"nombre": "Empalme Lobos"}, 
															{"id": 12, 	"nombre": "Lobos"} 
								], 
								"sentido": [	{"id": 	54, 	"estacion": "Merlo"},
															{"id": 	53, 	"estacion": "Lobos"}]
							}, 
							{"idRamal": 2, "ramal": "Moreno-Mercedes", 
								"estacion": [
															{"id": 1, 	"nombre": "Moreno"}, 
															{"id": 2, 	"nombre": "La Reja"}, 
															{"id": 3, 	"nombre": "Francisco Alvarez"}, 
															{"id": 4, 	"nombre": "Ingeniero P.P. Marín"}, 
															{"id": 5, 	"nombre": "Las Malvinas"}, 
															{"id": 6, 	"nombre": "General Rodríguez"}, 
															{"id": 7, 	"nombre": "La Fraternidad"}, 
															{"id": 8, 	"nombre": "Lezica y Torrezuri"}, 
															{"id": 9, 	"nombre": "Universidad de Luján"}, 
															{"id": 10, 	"nombre": "Luján"}, 
															{"id": 11, 	"nombre": "Jauregui"}, 
															{"id": 12, 	"nombre": "Olivera"}, 
															{"id": 13, 	"nombre": "Gowland"}, 
															{"id": 14, 	"nombre": "Mercedes"} 
								], 
								"sentido": [	{"id": 	52, 	"estacion": "Moreno"},
															{"id": 	51, 	"estacion": "Mercedes"}]
							}, 
					]},
					{	"id": 1, 
						"linea": "Mitre", 
						"ramales": [
							{"idRamal": 0, "ramal": "Retiro-Mitre"}, 
							{"idRamal": 1, "ramal": "Retiro-Bme.Mitre"}, 
							{"idRamal": 2, "ramal": "Retiro-J.L.Suárez"}, 
					]},
					{	"id": 2, 
						"linea": "Roca", 
						"ramales": [
							{"idRamal": 0, "ramal": "Constitución-La Plata"}
					]},
					{	"id": 3, 
						"linea": "Línea San Martín", 
						"ramales": [
							{"idRamal": 0, "ramal": "Retiro-José C. Paz/Pilar/Cabred", 
								"estacion": [
															{"id": 1, 	"nombre": "Retiro", "anden": [{"id": 1, "nombre": "Andén 1"}, 
																																			{"id": 2, "nombre": "Andén 2"}, 
																																			{"id": 3, "nombre": "Andén 3"}, 
																																			{"id": 4, "nombre": "Andén 4"}, 
																																			{"id": 5, "nombre": "Andén 5"}
																]
															}, 
															{"id": 2, 	"nombre": "Palermo"}, 
															{"id": 3, 	"nombre": "Chacarita"}, 
															{"id": 4, 	"nombre": "La Paternal"}, 
															{"id": 5, 	"nombre": "Villa del Parque"}, 
															{"id": 6, 	"nombre": "Devoto"}, 
															{"id": 7, 	"nombre": "Saenz Peña"}, 
															{"id": 8, 	"nombre": "Santos Lugares"}, 
															{"id": 9, 	"nombre": "Caseros"}, 
															{"id": 10, 	"nombre": "El Palomar"}, 
															{"id": 11, 	"nombre": "Hurlingham"}, 
															{"id": 12, 	"nombre": "William C. Morris"}, 
															{"id": 13, 	"nombre": "Bella Vista"}, 
															{"id": 14, 	"nombre": "Muñiz"}, 
															{"id": 15, 	"nombre": "San Miguel"}, 
															{"id": 16, 	"nombre": "José C. Paz"}, 
															{"id": 17, 	"nombre": "Sol y Verde"}, 
															{"id": 18, 	"nombre": "Presidente Derqui"}, 
															{"id": 19, 	"nombre": "Villa Astolfi"}, 
															{"id": 20, 	"nombre": "Pilar"}, 
															{"id": 21, 	"nombre": "Manzanares"}, 
															{"id": 22, 	"nombre": "Dr. Domingo Cabred", "anden": [{"id": 1, "nombre": "Andén 1"}, 
																																			{"id": 2, "nombre": "Andén 2"}, 
																																			{"id": 3, "nombre": "Andén 3"}, 
																																			{"id": 4, "nombre": "Andén 4"}, 
																																			{"id": 5, "nombre": "Andén 5"}, 
																																			{"id": 6, "nombre": "Andén 6"} 
																]
															}
								], 
								"sentido": [	{"id": 	32, 	"estacion": "Retiro"},
															{"id": 	31, 	"estacion": "José C. Paz/Pilar/Cabred"}]
							}, 
					]},
					{	"id": 4, 
						"linea": "Belgrano Norte (Beta)", 
						"ramales": [
							{"idRamal": 0, "ramal": "Diferencial", 
								"estacion": [
															{"id": 1, 	"nombre": "Retiro", "anden": [{"id": 1, "nombre": "Andén 1"}, 
																																			{"id": 2, "nombre": "Andén 2"}, 
																																			{"id": 3, "nombre": "Andén 3"}, 
																																			{"id": 4, "nombre": "Andén 4"}, 
																																			{"id": 5, "nombre": "Andén 5"}, 
																																			{"id": 6, "nombre": "Andén 6"} 
																]
															}, 
															{"id": 2, 	"nombre": "Saldías"}, 
															{"id": 3, 	"nombre": "Ciudad Universitaria"}, 
															{"id": 4, 	"nombre": ""}, 
															{"id": 5, 	"nombre": ""}, 
															{"id": 6, 	"nombre": ""}, 
															{"id": 7, 	"nombre": ""}, 
															{"id": 8, 	"nombre": ""}, 
															{"id": 9, 	"nombre": "Villa Adelina"}, 
															{"id": 10, 	"nombre": "Bouglone Sur"}, 
															{"id": 11, 	"nombre": "V. A. Montes"}, 
															{"id": 12, 	"nombre": "Don Torcuato"}, 
															{"id": 13, 	"nombre": "Sourdeaux"}, 
															{"id": 14, 	"nombre": "Villa de Mayo"}, 
															{"id": 15, 	"nombre": "Los Polvorines"}, 
															{"id": 16, 	"nombre": "Ingeniero Pablo Nogués"}, 
															{"id": 17, 	"nombre": "Grand Bourg"}, 
															{"id": 18, 	"nombre": "Tierras Altas"}, 
															{"id": 19, 	"nombre": "Tortuguitas"}, 
															{"id": 20, 	"nombre": "M. Alberti"}, 
															{"id": 21, 	"nombre": "Del Viso"}, 
															{"id": 22, 	"nombre": "Villa Rosa", "anden": [{"id": 1, "nombre": "Andén 1"}, 
																																			{"id": 2, "nombre": "Andén 2"}, 
																																			{"id": 3, "nombre": "Andén 3"}, 
																																			{"id": 4, "nombre": "Andén 4"}, 
																																			{"id": 5, "nombre": "Andén 5"}, 
																																			{"id": 6, "nombre": "Andén 6"} 
																]
															}
								], 
								"sentido": [	{"id": 	62, 	"estacion": "Retiro"},
															{"id": 	61, 	"estacion": "Villa rosa"}]
							}, 
					]},
				]}

// Funciones de selección. 
var lineaSeleccionada = ""; 
var ramalSeleccionado = ""; 
var estacionSeleccionada = ""; 
var estSeleccionada = ""; 
var andenSeleccionado = ""; 
var sentidoSeleccionado = ""; 
<<<<<<< HEAD
var sentidoId = ""; 
var idramal = ""; 

var nombreEstacion = ""; 
var nombreDestino = ""; 

var intervaloEstacion = ""; 
var intervaloAnden = ""; 
var intervaloSalidas = ""; 

var habilitar = function(){
	$('#selector-sentido').css('display', 'block');
	// Si toca el andén o el sentido muestra el botón. 
		$('input[type=radio][name=anden]').change(function() {
			sentidoSeleccionado = parseInt($(this).val());
			andenSeleccionado = parseInt($(this).val());
			$('#botonera-acceso').css('display', 'block')
			$('button#acceso').attr('onClick', 'mostrarAnden()'); 
			//ramal = sentidoSeleccionado; 
			//anden = andenSeleccionado; 
			estacion = estacionSeleccionada; 
		}); 
		$('input[type=radio][name=sentido]').change(function() {
			sentidoSeleccionado = parseInt($(this).val());
			sentidoId = parseInt($(this).attr('id'));
			$('#botonera-acceso').css('display', 'block')
			$('button#acceso').attr('onClick', 'mostrarEstacion()'); 
			//ramal = sentidoSeleccionado; 
			estacion = estacionSeleccionada; 
		}); 
}; 


var resetear = function(){
	$('#selector-ramal').css('display', 'none'); 
	$('#selector-estacion').css('display', 'none'); 
	$('#selector-sentido').css('display', 'none');
	$('#botonera-acceso').css('display', 'none'); 
}; 

var ocultarSecciones = function(){
	$('h1#tituloMismoDestino').css('display', 'none'); 
	$('.datos-estacion').css('display', 'none').removeClass('terminal'); 
	$('main#selector').css('display', 'none'); 
	$('main#cargando').css('display', 'none'); 
	$('main#offline').css('display', 'none'); 
	$('main#error-data-incorrecta').css('display', 'none'); 
	$('main#en-servicio').css('display', 'none'); 
	$('main#anden-en-servicio').css('display', 'none'); 
	$('main#terminal').css('display', 'none'); 
	$('main#fuera-de-servicio').css('display', 'none'); 
	$('#barra-mensaje-alerta').css('display', 'none'); 
	$('#barra-mensaje-alerta-terminal').css('display', 'none'); 
	$('#volver').attr('onClick', 'volverAlSelector()'); 
}

$(document).ready(function(){
	// Lista las líneas
		var listarLineas= ""; 
		for (var i = 0; i < jsonList.Trenes.length; i++){
			listarLineas+= "<label class='btnlinea btn btn-default' onClick='paso2("+jsonList.Trenes[i].id+")'>"+jsonList.Trenes[i].linea+"</label>";
		}
		$("#listaLineas").html(listarLineas);

		$('label.btnlinea').click(function() {
			$('label.btnlinea').removeClass('active'); 
			$(this).addClass('active'); 
		});
});	

var paso2 = function(linea){
	resetear(); 
	$('#selector-ramal').css('display', 'block'); 
	lineaSeleccionada = parseInt(linea);
	var listarRamales= ""; 
	for (var j = 0; j < jsonList.Trenes[lineaSeleccionada].ramales.length; j++){
		listarRamales+= "<label class='btnramal btn btn-default' onClick='paso3(" + jsonList.Trenes[lineaSeleccionada].ramales[j].idRamal + ")'>"+jsonList.Trenes[lineaSeleccionada].ramales[j].ramal+"</label>";
	}
	if ((jsonList.Trenes[lineaSeleccionada].ramales[0].ramal == "Unico") || (jsonList.Trenes[lineaSeleccionada].ramales[0].ramal == "Único")) {
		paso3(0); 
		$('#selector-ramal').css('display', 'none'); 
	};
	if (lineaSeleccionada === 1) {
		var stronClick = 'mostrarTerminal(5, 0,"mitre")'; 
		listarRamales += "<div><button class='btn btn-default' onClick='"+stronClick+"'>Ver próximos servicios desde Retiro</button></div>"; 
	};

	$("#listaRamales").html(listarRamales); 

	$('label.btnramal').click(function() {
		$('label.btnramal').removeClass('active'); 
		$(this).addClass('active'); 
	});
}; 

var paso3 = function(ramal){ 
	resetear(); 
	$('#selector-ramal').css('display', 'block'); 
	// Después de seleccionar el ramal
		//$('input[type=radio][name=ramal]').change(function() {
			ramalSeleccionado = parseInt(ramal);

			var escalarCajaEstaciones = function(){
				var responsive = Modernizr.mq('(max-width: 800px)');
				if (responsive) {
					$('#contenedorEstacionesLinea').css('overflow-x', 'scroll').css('text-align', 'left');
					// Sarmiento
					if (lineaSeleccionada == 0) {
						$('#estacionesLinea').css('width', '525px'); 
						if (ramalSeleccionado == 1) {
							$('#estacionesLinea').css('width', '450px'); 
						};
					}
					// Mitre
					else if (lineaSeleccionada == 1) {
						$('#estacionesLinea').css('width', '565px'); 
						if (ramalSeleccionado == 1) {
							$('#estacionesLinea').css('width', '410px'); 
						};
					}
					// Roca
					else if (lineaSeleccionada == 2) {
						$('#estacionesLinea').css('width', '645px'); 
						if (ramalSeleccionado == 1) {
							$('#estacionesLinea').css('width', '350px'); 
						} else if (ramalSeleccionado == 2) {
							$('#estacionesLinea').css('width', '400px'); 
						} else if (ramalSeleccionado == 3) {
							$('#estacionesLinea').css('width', '510px'); 
						} else if (ramalSeleccionado == 4) {
							$('#estacionesLinea').css('width', '750px'); 
						} else if (ramalSeleccionado == 5) {
							$('#estacionesLinea').css('width', '350px'); 
						};
					}
					// San Martín o Urquiza
					else if ((lineaSeleccionada == 4) || (lineaSeleccionada == 3)) {
						$('#estacionesLinea').css('width', '725px'); 
					}
					// Belgrano Norte
					else if (lineaSeleccionada == 5) {
						$('#estacionesLinea').css('width', '750px'); 
					}
					// Belgrano Sur
					else if (lineaSeleccionada == 6) {
						$('#estacionesLinea').css('width', '650px'); 
						if (ramalSeleccionado == 1) {
							$('#estacionesLinea').css('width', '525px'); 
						};
					} 
					// Tren de la Costa
					else if (lineaSeleccionada == 7) {
						$('#estacionesLinea').css('width', '400px'); 
					} 
					// Otra línea
					else {
						$('#estacionesLinea').css('width', 'inherit'); 
					}
				} else { $('#estacionesLinea').css('width', 'inherit').css('text-align', 'center'); $('#contenedorEstacionesLinea').css('overflow', 'hidden'); }
			}

			escalarCajaEstaciones(); 
			$(window).resize(function() {
				escalarCajaEstaciones(); 
			});

			var estacionesLinea = ""; 
			for (var k = 0; k < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion.length; k++){
				estacionesLinea+= "<div class='estacion'><input type='radio' name='estacion'  onClick='paso4("+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[k].id+")' /> "+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[k].nombre+"</div>";
=======

var listaEstaciones = function(){
	resetear(); 
	$('#selector-ramal').css('display', 'block'); 
	// Después de seleccionar el ramal
		$('input[type=radio][name=ramal]').change(function() {
			ramalSeleccionado = parseInt($(this).val());

			var estacionesLinea = ""; 
			for (var k = 0; k < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion.length; k++){
				estacionesLinea+= "<input type='radio' name='estacion' value='" + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[k].id + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[k].nombre;
>>>>>>> b2afb38... [v1.x.x] Primera versión.
			}
			console.log(estacionesLinea); 
			$("#estacionesLinea").html(estacionesLinea); 

			sentidos(); 
		});
}; 

<<<<<<< HEAD
var paso4 = function(estacion){
	//resetear(); 
	//$('#selector-ramal').css('display', 'block'); 
=======
var sentidos = function(){
	resetear(); 
	$('#selector-ramal').css('display', 'block'); 
	$('#selector-estacion').css('display', 'block');
>>>>>>> b2afb38... [v1.x.x] Primera versión.
	// Después de seleccionar la estación 
		$('input[type=radio][name=estacion]').change(function() {
			estacionSeleccionada = parseInt($(this).val());

<<<<<<< HEAD
			$('section#selector-sentido h1').html('Sentido a').css('display', 'block'); 
			$('section#selector-sentido #acceso-terminal').css('display', 'none'); 
			var sentidos = ""; 
			for (var k = 0; k < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido.length; k++){

				if (k === 1) {
					if ((((lineaSeleccionada === 1) && (ramalSeleccionado === 1)) && ((estacionSeleccionada > 0) && (estacionSeleccionada <= 5))) || (((lineaSeleccionada === 1) && (ramalSeleccionado === 2))) && ((estacionSeleccionada > 0) && (estacionSeleccionada <= 5))) {
						sentidos+= "<label class='btnanden btn btn-default' id='"+k+"' onClick='mostrarEstacion("+k+"," + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].id + ")'>J.L.Suárez/Bme.Mitre</label>";
					} else if ((((lineaSeleccionada === 6) && (ramalSeleccionado === 0)) && ((estacionSeleccionada > 0) && (estacionSeleccionada <= 8))) || (((lineaSeleccionada === 6) && (ramalSeleccionado === 1))) && ((estacionSeleccionada > 0) && (estacionSeleccionada <= 8))) {
						sentidos+= "<label class='btnanden btn btn-default' id='"+k+"' onClick='mostrarEstacion("+k+"," + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].id + ")'>M.C.G.Belgrano/G.Catán</label>";
					} else {
						sentidos+= "<label class='btnanden btn btn-default' id='"+k+"' onClick='mostrarEstacion("+k+"," + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].id + ")'>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].estacion+"</label>";
					}; 
				} else {
					sentidos+= "<label class='btnanden btn btn-default' id='"+k+"' onClick='mostrarEstacion("+k+"," + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].id + ")'>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].estacion+"</label>";
				}; 
=======
			var sentidos = "<h2>Sentido a</h2>"; 
			for (var k = 0; k < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido.length; k++){
				sentidos+= "<input type='radio' name='sentido' value='" + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].id + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].estacion;
>>>>>>> b2afb38... [v1.x.x] Primera versión.
			}
			//console.log(sentidos); 
			$("#sentidos").html(sentidos); 

			estSeleccionada = estacionSeleccionada - 1; 
<<<<<<< HEAD
			nombreEstacion = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].nombre; 
			
			var checkTerminal = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden; 
			if (checkTerminal !== undefined) {
				var sentidos = ""; 
				$('section#selector-sentido h1').html('').css('display', 'none'); 
				$('#selector-sentido #acceso-terminal').html("<button id='acceso-terminal' class='btn btn-default' onClick='mostrarTerminal("+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].idTerminal+", "+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].sentido+")'>Ver servicios programados</button>").css('display', 'block'); 
				if (jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[0].id != 0) {
					$('#selector-sentido h1').html('O seleccioná el andén').css('display', 'block'); 
					for (var l = 0; l < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden.length; l++){
						sentidos+= "<label class='btnanden btn btn-default' onClick='mostrarAnden("+ jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].idTerminal +", " + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].id + ")'>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].nombre+"</label>";
					}
				};
=======
			var checkTerminal = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden; 
			if (checkTerminal !== undefined) {
				var sentidos = "<h2>Seleccioná el andén</h2>"; 
				for (var l = 0; l < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden.length; l++){
					sentidos+= "<input type='radio' name='anden' value='" + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].id + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].nombre;
				}
>>>>>>> b2afb38... [v1.x.x] Primera versión.
				//console.log(sentidos); 
				$("#sentidos").html(sentidos); 
			};
			habilitar(); 
		}); 
}; 

var habilitar = function(){
	$('#selector-sentido').css('display', 'block');
	// Si toca el andén o el sentido muestra el botón. 
		$('input[type=radio][name=anden]').change(function() {
			andenSeleccionado = parseInt($(this).val());
			$('#botonera-acceso').css('display', 'block'); 
		}); 
		$('input[type=radio][name=sentido]').change(function() {
			sentidoSeleccionado = parseInt($(this).val());
			$('#botonera-acceso').css('display', 'block'); 
			ramal = sentidoSeleccionado; 
			estacion = estacionSeleccionada; 
		}); 
}; 

var resetear = function(){
	$('#selector-ramal').css('display', 'none'); 
	$('#selector-estacion').css('display', 'none'); 
	$('#selector-sentido').css('display', 'none');
	$('#botonera-acceso').css('display', 'none'); 
}

<<<<<<< HEAD
var mostrarEstacion = function(numeroEst, sentido){
	//sentidoSeleccionado = sentido;
	//sentidoId = numeroEst;

	nombreDestino = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[numeroEst].estacion; 

	//ramal = sentidoSeleccionado; 
	//anden = andenSeleccionado; 
	estacion = estacionSeleccionada; 

	ocultarSecciones(); 
	$('.datos-estacion').css('display', 'block'); 
	$('main#cargando').css('display', 'block'); 
	$('#estacion-actual').html('Estación ' + nombreEstacion); 
	$('#estacion-actual-2').html(nombreEstacion); 
	
	selector = true; 
	paginaInicialVisible = false; 
	verifEstacion = true; 
	verifAnden = false; 
	verifTerminal = false; 

	imgFooter(sentido);

	clearInterval(intervaloEstacion); 
	intervaloEstacion = setInterval(function() {proximoTren(sentido, estacion)}, 1500);
};

var mostrarAnden = function(idTerminal, idanden, sentidoTerminal, estDefaultTerminal){
	andenSeleccionado = idanden;
	if (idTerminal == 5) {
		nombreEstacion = "Retiro"; 
	} else {
		nombreEstacion = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].nombre; 
		estacion = estacionSeleccionada; 
	}
	//ramal = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[andenSeleccionado - 1].idTerminal; 
	//nombreDestino = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[sentidoId].estacion; 

	//ramal = idTerminal; 
	//anden = andenSeleccionado; 

	ocultarSecciones(); 
	$('.datos-estacion').css('display', 'block'); 
	$('main#cargando').css('display', 'block'); 
	$('#estacion-actual').html('Estación ' + nombreEstacion); 
	$('#estacion-actual-2').html(nombreEstacion); 
	
	if (estDefaultTerminal == "mitre") {
		$('#volver').attr('onClick', 'mostrarTerminal('+idTerminal+', '+sentidoTerminal+', "'+estDefaultTerminal+'")'); 
	} else if (sentidoTerminal != "") {
		$('#volver').attr('onClick', 'mostrarTerminal('+idTerminal+', '+sentidoTerminal+')'); 
	}; 

	selector = true; 
	paginaInicialVisible = false; 
	verifEstacion = false; 
	verifAnden = true; 
	verifTerminal = false; 

	imgFooter(idTerminal); 

	clearInterval(intervaloAnden); 
	intervaloAnden = setInterval(function() {proximaSalida(idTerminal, idanden);}, 1500);
	//setInterval(function() {proximaSalida();}, 1500);
};

var mostrarTerminal = function(idTerminal, numsentido, estdefault){
	//idramal = idTerminal; 
	//sentido = numsentido;
	var estacionTerminal = estdefault; 
	if (estacionTerminal == "mitre") {
		nombreEstacion = "Retiro"; 
	} else {estacionTerminal = undefined;}
	ramal = idTerminal; 

	ocultarSecciones(); 
	$('.datos-estacion').css('display', 'block').addClass('terminal'); 
	$('main#cargando').css('display', 'block'); 
	$('#estacion-actual').html('Estación ' + nombreEstacion); 
	$('#estacion-actual-2').html(nombreEstacion); 
=======
$(document).ready(function(){
	// Lista las líneas
		var listarLineas= ""; 
		for (var i = 0; i < jsonList.Trenes.length; i++){
			listarLineas+= "<input type='radio' name='linea' value='" + jsonList.Trenes[i].id + "'/>"+jsonList.Trenes[i].linea;
		}
		$("#listaLineas").html(listarLineas);

	// Después de selecciionar la línea
		$('input[type=radio][name=linea]').change(function() {
			resetear(); 
			$('#selector-ramal').css('display', 'block'); 
			lineaSeleccionada = parseInt($(this).val());

			var listarRamales= ""; 
			for (var j = 0; j < jsonList.Trenes[lineaSeleccionada].ramales.length; j++){
				listarRamales+= "<input type='radio' name='ramal' value='" + jsonList.Trenes[lineaSeleccionada].ramales[j].idRamal + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[j].ramal;
			}
			$("#listaRamales").html(listarRamales); 
			listaEstaciones();
		});
});	
>>>>>>> b2afb38... [v1.x.x] Primera versión.

var mostrarDatos = function(){
	$('.datos-estacion').css('display', 'block'); 
	$('main#selector').css('display', 'none'); 
	$('main#en-servicio').css('display', 'none'); 
	$('main#fuera-de-servicio').css('display', 'none'); 
	$('#estacion-actual').html('Estación ' + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].nombre); 
	$('#estacion-actual-2').html(jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].nombre); 
	selector = true; 
<<<<<<< HEAD
	paginaInicialVisible = false; 
	verifEstacion = false; 
	verifAnden = false; 
	verifTerminal = true; 

	var estaciones1 = ""; 
	var estaciones2 = ""; 
	var estaciones3 = ""; 
	var estaciones4 = ""; 
	var estaciones5 = ""; 
	var estacionesback1 = ""; 
	var estacionesback2 = ""; 
	var estacionesback3 = ""; 
	var estacionesback4 = ""; 
	var estacionesback5 = ""; 

	imgFooter(idTerminal); 

	clearInterval(intervaloSalidas); 
	intervaloSalidas = setInterval(function() {proximasSalidas(idTerminal, numsentido, estacionTerminal);}, 1500);
	//setInterval(function() {proximasSalidas(estdefault, idTerminal, numsentido);}, 1500);
};

var volverAlSelector = function(){
	clearInterval(intervaloEstacion); 
	clearInterval(intervaloAnden); 
	clearInterval(intervaloSalidas); 
	$('.btnlinea').removeClass('active'); 
	$('.btnramal').removeClass('active'); 
	$('#volver').addClass('ocultarVolver').addClass('oculto'); 
	selector = false; 
	paginaInicialVisible = true; 
	verifEstacion = false; 
	verifAnden = false; 
	verifTerminal = false; 
	resetear(); 
	ocultarSecciones(); 
	$('main#selector').css('display', 'block'); 
	ocultarSecciones(); 
	$('main#selector').css('display', 'block'); 
	ocultarSecciones(); 
	$('main#selector').css('display', 'block'); 
	ocultarSecciones(); 
	$('main#selector').css('display', 'block'); 
=======
	actualizarDatos(); 
	setInterval(function() {actualizarDatos();}, 4000);
};

var volverAlSelector = function(){
	$('.datos-estacion').css('display', 'none'); 
	$('main#selector').css('display', 'block'); 
	$('main#en-servicio').css('display', 'none'); 
	$('main#fuera-de-servicio').css('display', 'none'); 
	selector = false; 
	resetear(); 
>>>>>>> b2afb38... [v1.x.x] Primera versión.
}