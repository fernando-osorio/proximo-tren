// Funciones de selección. 
var lineaSeleccionada = ""; 
var ramalSeleccionado = ""; 
var estacionSeleccionada = ""; 
var estSeleccionada = ""; 
var andenSeleccionado = ""; 
var sentidoSeleccionado = ""; 
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
			}
			//console.log(estacionesLinea); 
			$("#estacionesLinea").html(estacionesLinea); 
			$('#selector-estacion').css('display', 'block');
		//});
}; 

var paso4 = function(estacion){
	//resetear(); 
	//$('#selector-ramal').css('display', 'block'); 
	// Después de seleccionar la estación 
		//$('input[type=radio][name=estacion]').change(function() {
			estacionSeleccionada = parseInt(estacion);

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
			}
			//console.log(sentidos); 
			$("#sentidos").html(sentidos); 

			estSeleccionada = estacionSeleccionada - 1; 
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
				//console.log(sentidos); 
				$("#sentidos").html(sentidos); 
			};
			//habilitar(); 
			$('#selector-sentido').css('display', 'block');
		//}); 
}; 



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

	selector = true; 
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
}