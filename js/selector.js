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

var listaEstaciones = function(){
	resetear(); 
	$('#selector-ramal').css('display', 'block'); 
	// Después de seleccionar el ramal
		$('input[type=radio][name=ramal]').change(function() {
			ramalSeleccionado = parseInt($(this).val());

			var estacionesLinea = ""; 
			for (var k = 0; k < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion.length; k++){
				estacionesLinea+= "<input type='radio' name='estacion' value='" + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[k].id + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[k].nombre;
			}
			console.log(estacionesLinea); 
			$("#estacionesLinea").html(estacionesLinea); 

			sentidos(); 
		});
}; 

var sentidos = function(){
	resetear(); 
	$('#selector-ramal').css('display', 'block'); 
	$('#selector-estacion').css('display', 'block');
	// Después de seleccionar la estación 
		$('input[type=radio][name=estacion]').change(function() {
			estacionSeleccionada = parseInt($(this).val());

			var sentidos = "<h2>Sentido a</h2>"; 
			for (var k = 0; k < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido.length; k++){
				sentidos+= "<input type='radio' name='sentido' value='" + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].id + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].sentido[k].estacion;
			}
			//console.log(sentidos); 
			$("#sentidos").html(sentidos); 

			estSeleccionada = estacionSeleccionada - 1; 
			var checkTerminal = jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden; 
			if (checkTerminal !== undefined) {
				var sentidos = "<h2>Seleccioná el andén</h2>"; 
				for (var l = 0; l < jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden.length; l++){
					sentidos+= "<input type='radio' name='anden' value='" + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].id + "'/>"+jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].anden[l].nombre;
				}
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

var mostrarDatos = function(){
	$('.datos-estacion').css('display', 'block'); 
	$('main#selector').css('display', 'none'); 
	$('main#en-servicio').css('display', 'none'); 
	$('main#fuera-de-servicio').css('display', 'none'); 
	$('#estacion-actual').html('Estación ' + jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].nombre); 
	$('#estacion-actual-2').html(jsonList.Trenes[lineaSeleccionada].ramales[ramalSeleccionado].estacion[estSeleccionada].nombre); 
	selector = true; 
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
}