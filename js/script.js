var estacionesServEspecial = ""; 
var estacionesServEspecialBase = ""; 

var estaciones_1 = ""; 

var scrollAlerta = ""; 
var scrollAlertaBase = ""; 

$(window).resize(function() {
	console.log('Redimensionado'); 
});

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 16;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

// Verifica si aún hay servicios corriendo, esto activa un main u otro. 
function verificadorServicio() {
	if (selector) {
		if( ($('.num-tiempo#proximo').html() == 'Sin datos') && ($('.num-tiempo#siguiente').html() == 'Sin datos') && ($('.num-tiempo#sub-siguiente').html() == 'Sin datos') )
		{
			$('main#en-servicio').css('display','none');
			$('main#fuera-de-servicio').css('display','block');
		}else{
			$('main#fuera-de-servicio').css('display','none');
			$('main#en-servicio').css('display','block');
		}
	};
}

var intentos=0;
var scroll = ''; 
		function actualizarDatos() {
				if ((((ramal === 1) || (ramal === 2)) || ((ramal === 51) || (ramal === 52))) || ((ramal === 53) || (ramal === 54))) {
					console.log(ramal); 
					$('#linea').prop('src', 'img/lineas/Sarmiento.png').attr('width', "75%");  
				} 
				else if ((((ramal === 5) || (ramal === 6)) || ((ramal === 7) || (ramal === 8))) || ((ramal === 9) || (ramal === 10))) {
					console.log(ramal); 
					$('#linea').prop('src', 'img/lineas/Mitre.png').attr('width', "50%");  
				} 
				else if ((ramal === 11) || (ramal === 12)) {
					console.log(ramal); 
					$('#linea').prop('src', 'img/lineas/Roca.png').attr('width', "70%"); 
				}
				else if ((ramal === 31) || (ramal === 32)) {
					console.log(ramal); 
					$('#linea').prop('src', 'img/lineas/SanMartin.png').attr('width', "85%"); 
				}
				else if ((ramal === 41) || (ramal === 42)) {
					console.log(ramal); 
					$('#linea').prop('src', 'img/lineas/TrenDeLaCosta.png').attr('width', "65%"); 
				};


			//parent.update_refresh();
			if (ramal>0 && estacion>0) {
				var data='';
				$.get("proximo-tren.php?linea="+ramal+"&estacion="+estacion,function(data2,status){
					data=data2;

					// console.log(data);

					//setTimeout("actualizarDatos();", 10000);
				})
				.error(function() {
					intentos++;
					if (intentos>=10) {
						//ocultar();
						console.log('Más de 10 intentos'); 
					}
					//setTimeout("actualizarDatos();", 10000);
				})
				.success(function() {
					if (data=='incorrect key') {
						ocultar();
						document.location.href=document.location.href;
					}
					else if (data=='wait') {
					}
					else {
						respuesta = eval("("+data+")");
						//parent.update_refresh_placa();
						var reload = respuesta.items['reload'];
						//if (reload=='1') {
						//	parent.refresh();
						//}
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

						//console.log(tiempo1 +'|'+tiempo1_HorasMinutos); 
						//console.log(tiempo2 +'|'+tiempo2_HorasMinutos); 
						//console.log(tiempo3 +'|'+tiempo3_HorasMinutos); 



						intentos=0;
						// Sentido de trenes
						if (respuesta.items['estacion_hasta_1']!='') {
							$('#trenes-a').html('Trenes a <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span>');
							// Próximo servicio hacia... 
							$('.destino#proximo').html('El próximo hacia <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span> llega en');
							if (tiempo1==0) {
								$('.destino#proximo').html('La formación llegó a la estación. Sentido a: ');
							}
						}; 

						if (tiempo1>=10) {
							if (tiempo1>=120) {
								$('.destino#proximo').html('Y el sub-siguiente en');
								$('.num-tiempo#proximo').html(tiempo2_HorasMinutos120);
								$('.siguiente-tren').css('display', 'inherit'); 
							}
							else if (tiempo1>=60) {
								$('.destino#proximo').html('Y el sub-siguiente en');
								$('.num-tiempo#proximo').html(tiempo2_HorasMinutos);
								$('.siguiente-tren').css('display', 'inherit'); 
							}
							else {
								$('.destino#proximo').html('El próximo hacia <span style="text-transform:capitalize;">'+estacion_hasta_1+'</span> llega en');
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
							if (tiempo2>=120) {
								$('.destino#siguiente').html('Y el siguiente viene en');
								$('.num-tiempo#siguiente').html(tiempo2_HorasMinutos120);
								$('.siguiente-tren').css('display', 'inherit'); 
							}
							else if (tiempo2>=60) {
								$('.destino#siguiente').html('El siguiente viene en');
								$('.num-tiempo#siguiente').html(tiempo2_HorasMinutos);
								$('.siguiente-tren').css('display', 'inherit'); 
							}
							else {
								$('.destino#siguiente').html('El siguiente viene en');
								$('.num-tiempo#siguiente').html(tiempo2+' minutos');
								$('.siguiente-tren').css('display', 'inherit'); 
							}
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
							if (tiempo3>=120) {
								$('.destino#sub-siguiente').html('Y el sub-siguiente en');
								$('.num-tiempo#sub-siguiente').html(tiempo3_HorasMinutos120);
								$('.siguiente-tren').addClass('grid-50').addClass('push-50').removeClass('grid-100'); 
								$('.subsiguiente-tren').css('display', 'inherit'); 
							}
							if (tiempo3>=60) {
								$('.destino#sub-siguiente').html('Y el sub-siguiente en');
								$('.num-tiempo#sub-siguiente').html(tiempo3_HorasMinutos);
								$('.siguiente-tren').addClass('grid-50').addClass('push-50').removeClass('grid-100'); 
								$('.subsiguiente-tren').css('display', 'inherit'); 
							}
							else {
								$('.destino#sub-siguiente').html('Y el sub-siguiente en'); 
								$('.num-tiempo#sub-siguiente').html(tiempo3+' minutos');
								$('.siguiente-tren').addClass('grid-50').addClass('push-50').removeClass('grid-100'); 
								$('.subsiguiente-tren').css('display', 'inherit'); 
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
						if (formacion_tipo_servicio_1 == "R")//es rapido tengo estaciones cargadas
						{
							//console.log('Próximo: Servicio rápido');
							$('#bloque-servicios-especiales').css('display','block');
							$('p#tipo-servicio').html('Servicio rápido');
							if (estaciones_1 != estacionesServEspecial) {
								estacionesServEspecial = estaciones_1; 
								var espacios='';
								for (n=0; n<75; n++) { espacios+='&nbsp;'; }
								$('#estaciones-serv-especial').html(espacios+estaciones_1);//le agrego las estaciones al marquee.
							};
						}
						// Si es un especial
						else if (formacion_tipo_servicio_1 == "E")//es especial tengo estaciones cargadas
						{
							//console.log('Próximo: Servicio especial');
							$('.cuadro-serv-especiales.tipo-serv#proximo').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('.bloque-servicios-especiales#proximo').css('display','block');
							$('p.tipo-servicio#proximo').html('Servicio especial');

							if (estaciones_1 != estacionesServEspecial) {
								estacionesServEspecial = estaciones_1; 
								var espacios='';
								for (n=0; n<75; n++) { espacios+='&nbsp;'; }
								$('#estaciones-serv-especial').html(espacios+estaciones_1);//le agrego las estaciones al marquee.
							};
						}
						// Si es un semi-rápido
						else if (formacion_tipo_servicio_1 == "S")//es semirapido tengo estaciones cargadas
						{
							//console.log('Próximo: Servicio semi-rapido');
							$('.bloque-servicios-especiales#proximo').css('display','block');
							$('p.tipo-servicio#proximo').html('Servicio s-rápido');
							if (estaciones_1 != estacionesServEspecial) {
								estacionesServEspecial = estaciones_1; 
								var espacios='';
								for (n=0; n<75; n++) { espacios+='&nbsp;'; }
								$('#estaciones-serv-especial').html(espacios+estaciones_1);//le agrego las estaciones al marquee.
							};
						}
						// Servicio normal
						else  if (formacion_tipo_servicio_1 == "N")//es normal
						{
							$('.bloque-servicios-especiales#proximo').css('display','none');
						}

					// Ahora... el siguiente tren... 
						// Si es rápido
						if (formacion_tipo_servicio_2 == "R")//es rapido tengo estaciones cargadas
						{
							//console.log('Siguiente: Servicio rápido');
							$('.bloque-servicios-especiales#siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').addClass('rapido');
							$('p.tipo-servicio#siguiente').html('Servicio rápido');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
						}
						else if (formacion_tipo_servicio_2 == "E")//es rapido tengo estaciones cargadas
						{
							//console.log('Siguiente: Servicio especial');
							$('.bloque-servicios-especiales#siguiente').css('display','block').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#siguiente').html('Servicio especial');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
						}
						// Si es semi-rapido
						else if (formacion_tipo_servicio_2 == "S")//es rapido tengo estaciones cargadas
						{
							//console.log('Siguiente: Servicio semi-rapido');
							$('.bloque-servicios-especiales#siguiente').css('display','block').removeClass('especial').addClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#siguiente').html('Servicio s-rápido');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#sub-siguiente').html('Servicio normal');
						}
						else if (formacion_tipo_servicio_2 == "N")//es rapido tengo estaciones cargadas
						{
							$('p.tipo-servicio#siguiente').html('Servicio normal');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','none').removeClass('especial').removeClass('semi-rapido').removeClass('rapido');
						}
								
					// Y finalmente... el sub-siguiente... 
						// Si es rápido
						if (formacion_tipo_servicio_3 == "R")//es rapido tengo estaciones cargadas
						{
							//console.log('Subsiguiente: Servicio rápido');
							$('.bloque-servicios-especiales#siguiente').css('display','block');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block').removeClass('especial').removeClass('semi-rapido').addClass('rapido');
							$('p.tipo-servicio#sub-siguiente').html('Servicio rápido');
						}
						else if (formacion_tipo_servicio_3 == "E")
						{
							//console.log('Subsiguiente: Servicio especial');
							$('.bloque-servicios-especiales#siguiente').css('display','block');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block').addClass('especial').removeClass('semi-rapido').removeClass('rapido');
							$('p.tipo-servicio#sub-siguiente').html('Servicio especial');
						}
						else if (formacion_tipo_servicio_3 == "S")
						{
							//console.log('Subsiguiente: Servicio semi-rapido');
							$('.bloque-servicios-especiales#siguiente').css('display','block');
							$('.bloque-servicios-especiales#sub-siguiente').css('display','block');
							$('p.tipo-servicio#sub-siguiente').html('Servicio s-rápido');
						}
						else if (formacion_tipo_servicio_3 == "N")
						{
							//console.log('Subsiguiente: Servicio normal');
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
						//for (n=0; n<120; n++) { espacios+='&nbsp;'; }
						
						if(estado_i != 0 && sentido ==1) // muestra el cartel en esta estacion
						{   
							$('#barra-mensaje-alerta').css('display','block');
							if(estado_v != 0)//muestro el mensaje para los dos sentidos
							{
								scrollAlerta = espacios+ ' ' +mensaje; 
								if (scrollAlerta != scrollAlertaBase) {
									$('h1#mensaje-alerta').html(scrollAlerta);
									console.log(scrollAlerta); 
								};
							}
							else//muestro el cartel con sentido al destino
							{
								scrollAlerta = espacios+'Las formaciones con destino a '+$('#destino').text()+': '+mensaje; 
								if (scrollAlerta != scrollAlertaBase) {
									$('h1#mensaje-alerta').html(scrollAlerta);
									console.log(scrollAlerta); 
								}; 
							}
						}
						else//en sentido al destino no esta cargada esta estacion, chequeo la vuelta
						{
							if(estado_v != 0 && sentido ==2)//muestro el mensaje para la estacion origen
							{
								scrollAlerta = espacios+'Las formaciónes de este sentido: '+mensaje; 
								if (scrollAlerta != scrollAlertaBase) {
									$('#barra-mensaje-alerta').css('display','block');
									$('h1#mensaje-alerta').html(scrollAlerta);
								}; 
							}
							else//no muestro el cartel de alerta
							{
								
								$('#barra-mensaje-alerta').css('display','none');
							}
						}
					}
				})
				.complete(function() {
					verificadorServicio();
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
							speed: 3500,
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

var mostrarHora = function(){
	var horaactual = moment().format("hh:mma"); 
	var strHoraActual = '<i class="material-icons" style="font-size: 40px; vertical-align: top;">&#xE192;</i> ' + horaactual; 
	$('#horaactual').html(strHoraActual); 
	$('#horaactual-msj').html(strHoraActual); 
}; 

$(document).ready(function(){
	mostrarHora(); 
	setInterval(function(){mostrarHora();}, 60); 
}); 