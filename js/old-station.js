var estacionesServEspecial = ""; 
var estacionesServEspecialBase = ""; 

var nexttrainstops = ""; 

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

var intentos=0;
var scroll = ''; 
var errorDBEstacion = false; 


var proximoTren = function(ramalEst, estacion) {
	console.info('proximoTren: Active flag.');
	$('#current-station').html('Estación ' + nombreEstacion); 
	$('#current-station-2').html(nombreEstacion); 
	imgFooter(station.direction); 
	if ((selector) && (verifEstacion)) {
		if (ramalEst>0 && estacion>0) {
			//var data='';
			$.get("php/station.php?linea="+ramalEst+"&estacion="+estacion, function(json, status, xhr){
			//$.get("http://plataforma5.16mb.com/proximo-tren/php/station.php?linea="+ramalEst+"&estacion="+estacion, function(json, status, xhr){
				//data = json;
			}).error(function() {
				errorDBEstacion = true; 
				intentos++;
				if (intentos < 10) {
					proximoTren(ramalEst, estacion); 
				} else {
					$('#status-online').show()
									   .removeClass('alert-success').removeClass('alert-warning') 
									   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> No tenés conexión a Internet. Por favor reintentá de nuevo cuando encuentres mejor señal o conexión WiFi.').addClass('alert-danger'); 
					console.log('10 intentos fallidos. Reintentando... '); 
				}
				$('.loading-container').addClass('hidden'); 
			}).success(function(data, status, xhr) {
				thisdata = xhr.getResponseHeader('Content-Length'); 
				datausedorig.station = datausedorig.station + parseInt(thisdata);
				dataused.station = sizeconverter(datausedorig.station); 
				$('#loading-section').modal('hide');
				if (data[0] == "<") {
					$('#error-noapache').modal('show');
					clearInterval(interval); 
					return false; 
				}
				errorDBEstacion = false; 
				if (data=='incorrect key') {
					$('main#cargando').css('display', 'none'); 
					$('main#offline').css('display', 'none'); 
					$('main#error-data-incorrecta').css('display', 'block'); 
					$('#status-online').show()
									   .removeClass('alert-success').removeClass('alert-warning')
									   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> Estación incorrecta. Esto es un error de programación. Mala mía. :(').addClass('alert-danger'); 
				}
				else if (data=='wait') {
					$('#status-online').show()
									   .removeClass('alert-success').removeClass('alert-danger')
									   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> Pausa desde el servidor de SOFSE. ').addClass('alert-warning'); 
					console.info('Pausa desde el server.'); 
					proximoTren(ramalEst, estacion); 
				}
				else {
					getHourData(); 
					$('#status-online').hide();
					$('#status-data').show(); 
					$('#status-data #date').text(lastUpdate.date); 
					$('#status-data #time').text(lastUpdate.time); 
					$('#status-data #data').text(dataused.station); 
					$('.main-container').removeClass('hidden'); 
					var datast = "("+data+")"; 
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
					nexttrainstops = respuesta.items['estaciones_1'];
					estaciones_2 = respuesta.items['estaciones_2'];
					estaciones_3 = respuesta.items['estaciones_3'];

					// Pasa los nombres de las estaciónes a minúsculas. 
					for (var i = 0; i < nexttrainstops.length; i++) {
					  var estEnMinusculas = nexttrainstops.toLowerCase();
					}
					nexttrainstops = estEnMinusculas;

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
						$('#first .card-block .destiny').html('El próximo hacia <span id="station-to" style="text-transform:capitalize;"></span> llega en');
						$('#first .card-block .destiny #station-to').text(stationConverter(stationto_1));
						$('#first .card-block .remaining').removeClass('hour').removeClass('hour-mins');
						$('.siguiente-tren').css('display', 'inherit'); 
						if (time_1 == 120) {$('#first .card-block .remaining').html('2 horas');}
						else if (time_1 > 120) {$('#first .card-block .remaining').html(time1_2hr).addClass('hour-mins');}
						else if (time_1 > 60) {$('#first .card-block .remaining').html(time1_1hr).addClass('hour');}
						else if (time_1 == 60) {$('#first .card-block .remaining').html('1 hora');}
						else if (time_1 == 1) {$('#first .card-block .remaining').html('1 minuto');}
						else if (time_1 == 0) {
							$('#first .card-block .destiny').html('La formación está en andén. <br/>Este tren finaliza en: ');
							$('#first .card-block .remaining').text(stationConverter(stationto_1));
						}
						else {$('#first .card-block .remaining').html(time_1+' minutos');}
					}
					else {$('#first .card-block .destiny').html('');$('#first .card-block .remaining').html('Sin datos');}; 

					if (time_2 >= 0) {
						$('#second .card-block .destiny').html('El siguiente viene en');
						$('#second .card-block .remaining').removeClass('hour').removeClass('hour-mins');
						$('#second').show(); 
						if (time_2 == 120) {$('#second .card-block .remaining').html('2 horas');}
						else if (time_2 > 120) {$('#second .card-block .remaining').html(time2_2hr).addClass('hour-mins');}
						else if (time_2 > 60) {$('#second .card-block .remaining').html(time2_1hr).addClass('hour');}
						else if (time_2 == 60) {$('#second .card-block .remaining').html('1 hora');}
						else if (time_2 == 1) {$('#second .card-block .remaining').html('1 minuto');}
						else if (time_2 == 0) {$('#second .card-block .remaining').html('En andén');}
						else {$('#second .card-block .remaining').html(time_2+' minutos');}
					}
					else {
						$('#second .card-block .destiny').html('');
						$('#second .card-block .remaining').html('Sin datos'); 
						$('#second').hide(); 
					};
					if (time_3 >= 0) {
						if (adRunning) {
							$('#third .card-block .destiny').html('Y el sub-siguiente en');
						} else {$('#third .card-block .destiny').html('Y el sub-siguiente en');}

						if (adRunning) {
							$('#second').removeClass('col-md-6').addClass('col-md-12'); 
							$('#third').removeClass('col-md-6').addClass('col-md-12').prop('hidden', ''); 
						} else {
							$('#second').addClass('col-md-6').removeClass('col-md-12'); 
							$('#third').addClass('col-md-6').removeClass('col-md-12').prop('hidden', ''); 
						}
						if (time_3 == 120) {$('#third .card-block .remaining').html('2 horas');}
						else if (time_3 >= 120) {$('#third .card-block .remaining').html(time3_2hr);}
						else if (time_3 > 60) {$('#third .card-block .remaining').html(time3_1hr);}
						else if (time_3 == 60) {$('#third .card-block .remaining').html('1 hora');}
						else if (time_3 == 1) {$('#third .card-block .remaining').html('1 minuto');}
						else if (time_3 == 0) {$('#third .card-block .remaining').html('En andén');}
						else {$('#third .card-block .remaining').html(time_3+' minutos');}; 
					}
					else {
						$('#third .card-block .destiny').html(''); 
						$('#third .card-block .remaining').html('Sin datos'); 
						$('#second').removeClass('col-md-6').addClass('col-md-12'); 
						$('#third').removeClass('col-md-6').removeClass('col-md-12').prop('hidden', true); 
					}
					// End time parsing. 

					// Set train type. 
					if (formacion_tipo_servicio_1 == "R") {
						$('#first .card-footer').show();
						$('#first .card-footer .type p').html('Servicio rápido');
						if (nexttrainstops != estacionesServEspecial) {
							estacionesServEspecial = nexttrainstops; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#first .card-footer .stations p').html(espacios+nexttrainstops);
						};
					}
					// Si es un especial
					else if (formacion_tipo_servicio_1 == "E") {
						$('#first .card-footer .type').addClass('special').removeClass('semi-rapido').removeClass('rapido');
						$('#first .card-footer').show();
						$('#first .card-footer .type p').html('Servicio especial');

						if (nexttrainstops != estacionesServEspecial) {
							estacionesServEspecial = nexttrainstops; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#first .card-footer .stations p').html(espacios+nexttrainstops);
						};
					}
					// Si es un semi-rápido
					else if (formacion_tipo_servicio_1 == "S") {
						$('#first .card-footer').show();
						$('#first .card-footer .type p').html('Servicio s-rápido');
						if (nexttrainstops != estacionesServEspecial) {
							estacionesServEspecial = nexttrainstops; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#first .card-footer .stations p').html(espacios+nexttrainstops);
						};
					}
					// If it's an additional service
					else if (formacion_tipo_servicio_1 == "A") {
						$('#first .card-footer').show();
						$('#first .card-footer .type p').html('Servicio adicional');
						if (nexttrainstops != estacionesServEspecial) {
							estacionesServEspecial = nexttrainstops; 
							var espacios='';
							for (n=0; n<75; n++) { espacios+='&nbsp;'; }
							$('#first .card-footer .stations p').html(espacios+nexttrainstops);
						};
					}
					// Servicio normal
					else  if (formacion_tipo_servicio_1 == "N") {
						$('#first .card-footer').hide();
					}

					// Ahora... el siguiente tren... 
					// Si es rápido
					if (formacion_tipo_servicio_2 == "R") {
						$('#second .card-footer').show(); 
						$('#second .card-footer .type').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#second .card-footer .type p').html('Servicio rápido');
						$('#third .card-footer').show().removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#third .card-footer .type p').html('Servicio normal');
					}
					else if (formacion_tipo_servicio_2 == "E") {
						$('#second .card-footer').show(); 
						$('#second .card-footer .type').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#second .card-footer .type p').html('Servicio especial');
						$('#third .card-footer').show().removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#third .card-footer .type p').html('Servicio normal');
					}
					// Si es semi-rapido
					else if (formacion_tipo_servicio_2 == "S") {
						$('#second .card-footer').show(); 
						$('#second .card-footer .type').removeClass('especial').addClass('semi-rapido').removeClass('rapido');
						$('#second .card-footer .type p').html('Servicio s-rápido');
						$('#third .card-footer').show().removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#third .card-footer .type p').html('Servicio normal');
					}
					// If it's an additional service
					else if (formacion_tipo_servicio_2 == "A") {
						$('#second .card-footer').show(); 
						$('#second .card-footer .type').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#second .card-footer .type p').html('Servicio adicional');
						$('#third .card-footer').show().removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#third .card-footer .type p').html('Servicio normal');
					}
					else if (formacion_tipo_servicio_2 == "N") {
						$('#second .card-footer .type').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						$('#second .card-footer .type p').html('Servicio normal');
						$('#third .card-footer').hide().removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
					}
							
					// Y finalmente... el sub-siguiente... 
					// Si es rápido
					if (formacion_tipo_servicio_3 == "R") {
						$('#second .card-footer').show(); 
						$('#third .card-footer').show().removeClass('special').removeClass('semi-rapido').addClass('rapido');
						$('#third .card-footer .type p').html('Servicio rápido');
					}
					else if (formacion_tipo_servicio_3 == "E") {
						$('#second .card-footer').show(); 
						$('#third .card-footer').show().addClass('special').removeClass('semi-rapido').removeClass('rapido');
						$('#third .card-footer .type p').html('Servicio especial');
					}
					else if (formacion_tipo_servicio_3 == "S") {
						$('#second .card-footer').show(); 
						$('#third .card-footer').show(); 
						$('#third .card-footer .type p').html('Servicio s-rápido');
					}
					else if (formacion_tipo_servicio_3 == "A") {
						$('#second .card-footer').show(); 
						$('#third .card-footer').show(); 
						$('#third .card-footer .type p').html('Servicio additional');
					}
					else if (formacion_tipo_servicio_3 == "N") {
						$('#second .card-footer').show(); 
						$('#third .card-footer').show(); 
						$('#third .card-footer .type p').html('Servicio normal');
						if (formacion_local_3 == "1") {
							$('#third .card-footer .type p').html('Servicio local');
							$('#third .card-footer').show();
						};
					}

					//Si los dos últimos son normales 
					if ((formacion_tipo_servicio_2 == "N") && (formacion_tipo_servicio_3 == "N")){
						$('#second .card-footer').hide(); 
						$('#third .card-footer').hide(); 
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
					console.log('Station: Start new marquee.'); 
					$('#first .card-footer .stations p').marquee({
						//speed in milliseconds of the marquee
						speed: 3500,
						//gap in pixels between the tickers
						gap: 3800,
						//gap in pixels between the tickers
						delayBeforeStart: 0,
						//'left' or 'right'
						direction: 'left'
					});
					estacionesServEspecialBase = nexttrainstops; 
				};
				if (scrollAlerta != scrollAlertaBase) {
					console.log('Station: Start alert marquee.'); 
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