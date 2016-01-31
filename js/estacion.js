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
				$('main#cargando').css('display', 'none'); 
				$('main#offline').css('display', 'none'); 
				$('main#error-data-incorrecta').css('display', 'none'); 
				$('main#en-servicio').css('display','none');
				$('main#fuera-de-servicio').css('display','block');
			}else{
				$('main#cargando').css('display', 'none'); 
				$('main#offline').css('display', 'none'); 
				$('main#error-data-incorrecta').css('display', 'none'); 
				$('main#fuera-de-servicio').css('display','none');
				$('main#en-servicio').css('display','block');
			}
		};
	};
}

var intentos=0;
var scroll = ''; 
var errorDBEstacion = false; 
	function proximoTren(ramalEst, estacion) {
		if ((selector) && (verifEstacion)) {
			if (ramalEst>0 && estacion>0) {
				var datosEstacion='';
				$.get("proximo-tren.php?linea="+ramalEst+"&estacion="+estacion,function(jsonEstacion,status){
					datosEstacion=jsonEstacion;
				})
				.error(function() {
					errorDBEstacion = true; 
					intentos++;
					if (intentos>=10) {
						//ocultar();
						$('main#cargando').css('display', 'none'); 
						$('main#offline').css('display', 'block'); 
						$('main#error-data-incorrecta').css('display', 'none'); 
						$('main#en-servicio').css('display', 'none'); 
						$('#barra-mensaje-alerta').css('display', 'none'); 
						console.log('10 intentos fallidos. Reintentando... '); 
					}
					proximoTren(ramalEst, estacion); 
				})
				.success(function() {
					errorDBEstacion = false; 
					if (datosEstacion=='incorrect key') {
						$('main#cargando').css('display', 'none'); 
						$('main#offline').css('display', 'none'); 
						$('main#error-data-incorrecta').css('display', 'block'); 
						$('main#en-servicio').css('display', 'none'); 
						$('#barra-mensaje-alerta').css('display', 'none'); 
					}
					else if (datosEstacion=='wait') {
						console.log('Pausa desde el server.'); 
						proximoTren(ramalEst, estacion); 
					}
					else {
						respuesta = eval("("+datosEstacion+")");
						var reload = respuesta.items['reload'];
						tiempo1 = respuesta.items['demora_formacion_1'];
						tiempo2 = respuesta.items['demora_formacion_2'];
						tiempo3 = respuesta.items['demora_formacion_3'];
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
						for (var i = 0; i < respuesta.items['estacion_hasta_1'].length; i++) {
						  var estHastaMinusculas = respuesta.items['estacion_hasta_1'].toLowerCase();
						}
						var estacion_hasta_1 = estHastaMinusculas;
						//alert(formacion_tipo_servicio_1+'-'+formacion_tipo_servicio_2+'-'+formacion_tipo_servicio_3);


						// Cuando el tiempo es superior a 59 minutos se parsea en horas y minutos
						var tiempo1_PreHorasMinutos = parseInt(tiempo1); 
						var tiempo1_HorasMinutos = moment.duration(tiempo1_PreHorasMinutos, "minutes").format("h [hora] m [min]");
						var tiempo1_HorasMinutos120 = moment.duration(tiempo1_PreHorasMinutos, "minutes").format("h [horas] m [min]");

						var tiempo2_PreHorasMinutos = parseInt(tiempo2); 
						var tiempo2_HorasMinutos = moment.duration(tiempo2_PreHorasMinutos, "minutes").format("h [hora] m [min]");
						var tiempo2_HorasMinutos120 = moment.duration(tiempo2_PreHorasMinutos, "minutes").format("h [horas] m [min]");

						var tiempo3_PreHorasMinutos = parseInt(tiempo3); 
						var tiempo3_HorasMinutos = moment.duration(tiempo3_PreHorasMinutos, "minutes").format("h [hora] m [min]");
						var tiempo3_HorasMinutos120 = moment.duration(tiempo3_PreHorasMinutos, "minutes").format("h [horas] m [min]");

						intentos=0;

						if (tiempo1>=10) {
							$('.destino#proximo').html('El próximo hacia <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span> llega en');
							$('.siguiente-tren').css('display', 'inherit'); 
							if (tiempo1>=120) {
								$('.num-tiempo#proximo').html(tiempo1_HorasMinutos120);
							}
							else if (tiempo1>=60) {
								$('.num-tiempo#proximo').html(tiempo1_HorasMinutos);
							}
							else {
								$('.num-tiempo#proximo').html(tiempo1+' minutos');
							}
						}
						else if (tiempo1==0) {
							$('.destino#proximo').html('La formación llegó a la estación. Sentido a: ');
							$('.num-tiempo#proximo').html('<span style="text-transform:capitalize;">'+estacion_hasta_1+'</span>'); 
						}
						else if (tiempo1==1) {
							$('.destino#proximo').html('El próximo hacia <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span> llega en');
							$('.num-tiempo#proximo').html('1 minuto'); 
						}
						else if (tiempo1>=0) {
							$('.destino#proximo').html('El próximo hacia <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span> llega en');
							$('.num-tiempo#proximo').html(tiempo1+' minutos'); 
						}
						else {
							$('.destino#proximo').html('');
							$('.num-tiempo#proximo').html('Sin datos'); 
						}
						if (tiempo2>=10) {
							$('.destino#siguiente').html('El siguiente viene en'); 
							$('.siguiente-tren').css('display', 'inherit'); 
							if (tiempo2>=120) {
								$('.num-tiempo#siguiente').html(tiempo2_HorasMinutos120);
							}
							else if (tiempo2>60) {
								$('.num-tiempo#siguiente').html(tiempo2_HorasMinutos);
							}
							else if (tiempo2==60) {
								$('.num-tiempo#siguiente').html('1 hora');
							}
							else {
								$('.num-tiempo#siguiente').html(tiempo2+' minutos');
							}
						}
						else if (tiempo2==1) {
							$('.destino#siguiente').html('El siguiente viene en');
							$('.num-tiempo#siguiente').html('1 minuto'); 
							$('.siguiente-tren').css('display', 'inherit'); 
						}
						else if (tiempo2>=0) {
							$('.destino#siguiente').html('El siguiente viene en');
							$('.num-tiempo#siguiente').html(tiempo2+' minutos'); 
							$('.siguiente-tren').css('display', 'inherit'); 
						}
						else {
							$('.destino#siguiente').html('');
							$('.num-tiempo#siguiente').html('Sin datos'); 
							$('.siguiente-tren').css('display', 'none'); 
						}
						if (tiempo3>=10) {
							$('.destino#sub-siguiente').html('Y el sub-siguiente en');
							$('.siguiente-tren').addClass('grid-50').addClass('push-50').removeClass('grid-100'); 
							$('.subsiguiente-tren').css('display', 'inherit'); 
							if (tiempo3>=120) {
								$('.num-tiempo#sub-siguiente').html(tiempo3_HorasMinutos120);
							}
							else if (tiempo3>60) {
								$('.num-tiempo#sub-siguiente').html(tiempo3_HorasMinutos);
							}
							else if (tiempo3==60) {
								$('.num-tiempo#sub-siguiente').html('1 hora');
							}
							else {
								$('.num-tiempo#sub-siguiente').html(tiempo3+' minutos');
							}; 
						}
						else if (tiempo3>=0) {
							$('.destino#sub-siguiente').html('Y el sub-siguiente en'); 
							$('.num-tiempo#sub-siguiente').html(tiempo3+' minutos'); 
							$('.siguiente-tren').addClass('grid-50').addClass('push-50').removeClass('grid-100'); 
							$('.subsiguiente-tren').css('display', 'inherit'); 
						}
						else {
							$('.destino#sub-siguiente').html(''); 
							$('.num-tiempo#sub-siguiente').html('Sin datos'); 
							$('.siguiente-tren').removeClass('grid-50').removeClass('push-50').addClass('grid-100'); 
							$('.subsiguiente-tren').css('display', 'none'); 
						}

						// Si es un rápido
						if (formacion_tipo_servicio_1 == "R")
						{
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
						else if (formacion_tipo_servicio_1 == "E")
						{
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
						else if (formacion_tipo_servicio_1 == "S")
						{
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
						else  if (formacion_tipo_servicio_1 == "N")
						{
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
						else if (formacion_tipo_servicio_3 == "E")
						{
							$('.bloque-servicios-especiales#siguiente').css('display','block');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#sub-siguiente').html('Servicio especial');
						}
						else if (formacion_tipo_servicio_3 == "S")
						{
							$('.bloque-servicios-especiales#siguiente').css('display','block');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block');
							$('p.tipo-servicio#sub-siguiente').html('Servicio s-rápido');
						}
						else if (formacion_tipo_servicio_3 == "N")
						{
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
						if ((formacion_tipo_servicio_2 == "N") && (formacion_tipo_servicio_3 == "N"))
						{
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
								$('#barra-mensaje-alerta').css('display','block');
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
										$('#barra-mensaje-alerta').css('display','block');
										$('h1#mensaje-alerta').html(scrollAlerta);
									};
								}; 
							} else {$('#barra-mensaje-alerta').css('display','none');}
						}
					}
				})
				.complete(function() {
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
			}
		}
	}