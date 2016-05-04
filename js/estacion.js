var estacionesServEspecial = ""; 
var estacionesServEspecialBase = ""; 

var estaciones_1 = ""; 

var scrollAlerta = ""; 
var scrollAlertaBase = ""; 


// Verifica si aún hay servicios corriendo, esto activa un main u otro. Sólo si está online, de lo contrario pasa de largo. 
function verificarEstacion() {
	if (errorDBEstacion === false) {
		if ((selector) && (verifEstacion)) {
			if( ($('.num-tiempo#proximo').html() == 'Sin datos') && ($('.num-tiempo#siguiente').html() == 'Sin datos') && ($('.num-tiempo#sub-siguiente').html() == 'Sin datos') )
			{
				ifError(showNoServices); 
			}else{
				ifError('noerror'); 
			}
		};
	};
}

var viajeEnVivo = function(ramalEst, estacion){
	//window.location.replace("[ sarazazá: después voy a liberar esto ;) ]#ramal:"+ramalEst+'&estacion:'+estacion);
	$('#soon').modal('show');
};

var intentos=0;
var scroll = ''; 
var errorDBEstacion = false; 


var proximoTren = function(ramalEst, estacion) {
	console.info('Corriendo función proximoTren');
	$('#current-station').html('Estación ' + nombreEstacion); 
	$('#current-station-2').html(nombreEstacion); 
	imgFooter(station.direction); 
	if ((selector) && (verifEstacion)) {
		if (ramalEst>0 && estacion>0) {
			var datosEstacion='';
			$.get("php/station.php?linea="+ramalEst+"&estacion="+estacion, function(jsonEstacion,status){
				datosEstacion = jsonEstacion;
				$('#loading-section').modal('hide');
			}).error(function() {
				errorDBEstacion = true; 
				intentos++;
				if (intentos < 10) {
					proximoTren(ramalEst, estacion); 
				} else {
					//ocultar();
					ifError('offline'); 
					$('#alert-bar').addClass('hidden'); 
					console.log('10 intentos fallidos. Reintentando... '); 
				}
				$('.loading-container').addClass('hidden'); 
			}).success(function() {
				$('#tiempo-proximo-tren').attr('onClick', 'viajeEnVivo('+ramalEst+', '+estacion+')'); 
				errorDBEstacion = false; 
				if (datosEstacion=='incorrect key') {
					$('main#cargando').css('display', 'none'); 
					$('main#offline').css('display', 'none'); 
					$('main#error-data-incorrecta').css('display', 'block'); 
					$('#alert-bar').addClass('hidden'); 
				}
				else if (datosEstacion=='wait') {
					console.log('Pausa desde el server.'); 
					proximoTren(ramalEst, estacion); 
				}
				else {
					$('.main-container').removeClass('hidden'); 
					var datast = "("+datosEstacion+")"; 
					respuesta = eval(datast);
					var reload = respuesta.items['reload'];
					time_1 = respuesta.items['demora_formacion_1'];
					time_2 = respuesta.items['demora_formacion_2'];
					time_3 = respuesta.items['demora_formacion_3'];
					formacion_local_1 = respuesta.items['local_1'];
					formacion_local_2 = respuesta.items['local_2'];
					formacion_local_3 = respuesta.items['local_3'];
					formacion_tipo_servicio_1 = respuesta.items['formacion_tipo_servicio_1'];
					formacion_tipo_servicio_2 = respuesta.items['formacion_tipo_servicio_2'];
					formacion_tipo_servicio_3 = respuesta.items['formacion_tipo_servicio_3'];
					estaciones_1 = respuesta.items['estaciones_1'];
					estaciones_2 = respuesta.items['estaciones_2'];
					estaciones_3 = respuesta.items['estaciones_3'];

					// Pasa los nombres de las estaciónes a minúsculas. 
					for (var i = 0; i < estaciones_1.length; i++) {
					  var estEnMinusculas = estaciones_1.toLowerCase();
					}
					estaciones_1 = estEnMinusculas;

					// Lo mismo con las estaciones de destino
					//for (var i = 0; i < respuesta.items['estacion_hasta_1'].length; i++) {
					//  var estHastaMinusculas = respuesta.items['estacion_hasta_1'].toLowerCase();
					//}
					//var estacion_hasta_1 = estHastaMinusculas;
					var stationto_1 = respuesta.items['estacion_hasta_1']; 
					//alert(formacion_tipo_servicio_1+'-'+formacion_tipo_servicio_2+'-'+formacion_tipo_servicio_3);


					// If time is more than 59 minutes, parse to hours and minutes. 
					var time1_pre = parseInt(time_1); 
					var time1_1hr = moment.duration(time1_pre, "minutes").format("h [hora] m [min]");
					var time1_2hr = moment.duration(time1_pre, "minutes").format("h [horas] m [min]");

					var time2_pre = parseInt(time_2); 
					var time2_1hr = moment.duration(time2_pre, "minutes").format("h [hora] m [min]");
					var time2_2hr = moment.duration(time2_pre, "minutes").format("h [horas] m [min]");

					var time3_pre = parseInt(time_3); 
					var time3_1hr = moment.duration(time3_pre, "minutes").format("h [hora] m [min]");
					var time3_2hr = moment.duration(time3_pre, "minutes").format("h [horas] m [min]");

					intentos=0;

					// Start time parsing. 
					if (time_1 >= 0) {
						//$('.destino#proximo').html('El próximo hacia <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span> llega en');
						$('.destino#proximo').html('El próximo hacia <span id="station-to" style="text-transform:capitalize;"></span> llega en');
						$('#station-to').text(stationConverter(stationto_1));
						$('.num-tiempo#proximo').removeClass('hour').removeClass('hour-mins');
						$('.siguiente-tren').css('display', 'inherit'); 
						if (time_1 == 120) {$('.num-tiempo#proximo').html('2 horas');}
						else if (time_1 > 120) {$('.num-tiempo#proximo').html(time1_2hr).addClass('hour-mins');}
						else if (time_1 > 60) {$('.num-tiempo#proximo').html(time1_1hr).addClass('hour');}
						else if (time_1 == 60) {$('.num-tiempo#proximo').html('1 hora');}
						else if (time_1 == 1) {$('.num-tiempo#proximo').html('1 minuto');}
						else if (time_1 == 0) {
							$('.destino#proximo').html('La formación está en andén. <br/>Este tren finaliza en: ');
							$('.num-tiempo#proximo').text(stationConverter(stationto_1));
						}
						else {$('.num-tiempo#proximo').html(time_1+' minutos');}
					}
					else {$('.destino#proximo').html('');$('.num-tiempo#proximo').html('Sin datos');}; 

					if (time_2 >= 0) {
						$('.destino#siguiente').html('El siguiente viene en');
						$('.num-tiempo#siguiente').removeClass('hour').removeClass('hour-mins');
						$('.siguiente-tren').prop('hidden', ''); 
						if (time_2 == 120) {$('.num-tiempo#siguiente').html('2 horas');}
						else if (time_2 > 120) {$('.num-tiempo#siguiente').html(time2_2hr).addClass('hour-mins');}
						else if (time_2 > 60) {$('.num-tiempo#siguiente').html(time2_1hr).addClass('hour');}
						else if (time_2 == 60) {$('.num-tiempo#siguiente').html('1 hora');}
						else if (time_2 == 1) {$('.num-tiempo#siguiente').html('1 minuto');}
						else if (time_2 == 0) {$('.num-tiempo#siguiente').html('En andén');}
						else {$('.num-tiempo#siguiente').html(time_2+' minutos');}
					}
					else {
						$('.destino#siguiente').html('');
						$('.num-tiempo#siguiente').html('Sin datos'); 
						$('.siguiente-tren').prop('hidden', true); 
					};
					if (time_3 >= 0) {
						$('.destino#sub-siguiente').html('Y el sub-siguiente en');
						$('.siguiente-tren').addClass('col-md-6').removeClass('col-md-12'); 
						$('.subsiguiente-tren').addClass('col-md-6').removeClass('col-md-12').prop('hidden', ''); 
						if (time_3 == 120) {$('.num-tiempo#sub-siguiente').html('2 horas');}
						else if (time_3 >= 120) {$('.num-tiempo#sub-siguiente').html(time3_2hr);}
						else if (time_3 > 60) {$('.num-tiempo#sub-siguiente').html(time3_1hr);}
						else if (time_3 == 60) {$('.num-tiempo#sub-siguiente').html('1 hora');}
						else if (time_3 == 1) {$('.num-tiempo#sub-siguiente').html('1 minuto');}
						else if (time_3 == 0) {$('.num-tiempo#sub-siguiente').html('En andén');}
						else {$('.num-tiempo#sub-siguiente').html(time_3+' minutos');}; 
					}
					else {
						$('.destino#sub-siguiente').html(''); 
						$('.num-tiempo#sub-siguiente').html('Sin datos'); 
						$('.siguiente-tren').removeClass('col-md-6').addClass('col-md-12'); 
						$('.subsiguiente-tren').removeClass('col-md-6').removeClass('col-md-12').prop('hidden', true); 
					}
					// End time parsing. 

					// Set train type. 
					if (formacion_tipo_servicio_1 == "R") {
						$('#bloque-servicios-especiales').css('display','block');
						$('p#tipo-servicio').html('Servicio rápido');
						if (estaciones_1 != estacionesServEspecial) {
							estacionesServEspecial = estaciones_1; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#estaciones-serv-especial').html(espacios+estaciones_1);
						};
					}
					// Si es un especial
					else if (formacion_tipo_servicio_1 == "E") {
						$('.cuadro-serv-especiales.tipo-serv#proximo').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('.bloque-servicios-especiales#proximo').css('display','block');
						$('p.tipo-servicio#proximo').html('Servicio especial');

						if (estaciones_1 != estacionesServEspecial) {
							estacionesServEspecial = estaciones_1; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#estaciones-serv-especial').html(espacios+estaciones_1);
						};
					}
					// Si es un semi-rápido
					else if (formacion_tipo_servicio_1 == "S") {
						$('.bloque-servicios-especiales#proximo').css('display','block');
						$('p.tipo-servicio#proximo').html('Servicio s-rápido');
						if (estaciones_1 != estacionesServEspecial) {
							estacionesServEspecial = estaciones_1; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#estaciones-serv-especial').html(espacios+estaciones_1);
						};
					}
					// Servicio normal
					else  if (formacion_tipo_servicio_1 == "N") {
						$('.bloque-servicios-especiales#proximo').css('display','none');
					}

					// Ahora... el siguiente tren... 
					// Si es rápido
					if (formacion_tipo_servicio_2 == "R")
					{
						$('.bloque-servicios-especiales#siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').addClass('rapido');
						$('p.tipo-servicio#siguiente').html('Servicio rápido');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
					}
					else if (formacion_tipo_servicio_2 == "E")
					{
						$('.bloque-servicios-especiales#siguiente').css('display','block').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('p.tipo-servicio#siguiente').html('Servicio especial');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
					}
					// Si es semi-rapido
					else if (formacion_tipo_servicio_2 == "S")
					{
						$('.bloque-servicios-especiales#siguiente').css('display','block').removeClass('especial').addClass('semi-rapido').removeClass('rapido');
						$('p.tipo-servicio#siguiente').html('Servicio s-rápido');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
					}
					else if (formacion_tipo_servicio_2 == "N")
					{
						$('p.tipo-servicio#siguiente').html('Servicio normal');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','none').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
					}
							
					// Y finalmente... el sub-siguiente... 
					// Si es rápido
					if (formacion_tipo_servicio_3 == "R")
					{
						$('.bloque-servicios-especiales#siguiente').css('display','block');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').addClass('rapido');
						$('p.tipo-servicio#sub-siguiente').html('Servicio rápido');
					}
					else if (formacion_tipo_servicio_3 == "E"){
						$('.bloque-servicios-especiales#siguiente').css('display','block');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','block').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('p.tipo-servicio#sub-siguiente').html('Servicio especial');
					}
					else if (formacion_tipo_servicio_3 == "S"){
						$('.bloque-servicios-especiales#siguiente').css('display','block');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','block');
						$('p.tipo-servicio#sub-siguiente').html('Servicio s-rápido');
					}
					else if (formacion_tipo_servicio_3 == "N"){
						$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
						if (formacion_local_3=="1") {
							$('p.tipo-servicio#sub-siguiente').html('Servicio local');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block');
						}
						else {
							$('.bloque-servicios-especiales#sub-siguiente').css('display','none');
						}
					}

					//Si los dos últimos son normales 
					if ((formacion_tipo_servicio_2 == "N") && (formacion_tipo_servicio_3 == "N")){
						$('.bloque-servicios-especiales#siguiente').css('display','none');
						$('.bloque-servicios-especiales#sub-siguiente').css('display','none');
					}

					var alerta = respuesta.items['alerta'];
					var estado_i = alerta['estado_i'];
					var estado_v = alerta['estado_v'];
					var sentido = alerta['sentido'];
					var mensaje = (alerta['mensaje']);
					var espacios='';

					// El mensaje va en minúsculas. 
					for (var i = 0; i < mensaje.length; i++) {
						if (i === 1) {
							var mensajeMinusculas = mensaje.toLowerCase();
						};
					}
					var mensaje = mensajeMinusculas;

					for (n=0; n<100; n++) { espacios+='&nbsp;'; }
					
					if(estado_i != 0 && sentido ==1) {   
						if (selector) {
							$('#alert-bar').removeClass('hidden');
						};
						if (estado_v != 0) {
							scrollAlerta = espacios+ ' ' +mensaje; 
							if (scrollAlerta != scrollAlertaBase) {
								$('h1#mensaje-alerta').html(scrollAlerta);
								console.log(scrollAlerta); 
							};
						} else{
							if (nombreDestino !== "") {
								scrollAlerta = espacios+'Las formaciónes hacia '+ nombreDestino +': '+mensaje; 
							} else {
								scrollAlerta = espacios+'Las formaciónes de este sentido: '+mensaje; 
							};
							if (scrollAlerta != scrollAlertaBase) {
								$('h1#mensaje-alerta').html(scrollAlerta);
							}; 
						}
					} else {
						if(estado_v != 0 && sentido ==2) {
							if (nombreDestino !== "") {
								scrollAlerta = espacios+'Las formaciónes hacia '+ nombreDestino +': '+mensaje; 
							} else {
								scrollAlerta = espacios+'Las formaciónes de este sentido: '+mensaje; 
							};
							if (scrollAlerta != scrollAlertaBase) {
								if (selector) {
									$('#addClass').removeClass('hidden');
									$('h1#mensaje-alerta').html(scrollAlerta);
								};
							}; 
						} else {$('#alert-bar').addClass('hidden');}
					}
				}

				verificarEstacion();
				if (estacionesServEspecial != estacionesServEspecialBase) {
					$('#estaciones-serv-especial').marquee({
						//speed in milliseconds of the marquee
						speed: 3500,
						//gap in pixels between the tickers
						gap: 3800,
						//gap in pixels between the tickers
						delayBeforeStart: 0,
						//'left' or 'right'
						direction: 'left'
					});
					estacionesServEspecialBase = estaciones_1; 
				};
				if (scrollAlerta != scrollAlertaBase) {
					console.log('Arranca scroll'); 
					$('#mensaje-alerta').marquee({
						//speed in milliseconds of the marquee
						speed: 5000,
						//gap in pixels between the tickers
						gap: 3800,
						//gap in pixels between the tickers
						delayBeforeStart: 0,
						//'left' or 'right'
						direction: 'left'
					});
					scrollAlertaBase = scrollAlerta; 
				};
			});
			//.complete(function() {
			//});
		}
	}
}