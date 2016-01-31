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
$(function(){
	$('#marquee_pie').marquee({
		//speed in milliseconds of the marquee
		speed: 30000,
		//gap in pixels between the tickers
		gap: 4500,
		//gap in pixels between the tickers
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left'
	});				
});	
var intentos=0;
var errorDBTerminal = false; 
var parpadear = Array();

parpadear[1]=0;
var parpadear_estado_1=0;
parpadear[2]=0;
var parpadear_estado_2=0;
parpadear[3]=0;
var parpadear_estado_3=0;
var parpadear_pie=0;
var parpadear_estado_pie=0;
var str_anden_1='';
var str_anden_2='';
var str_anden_3='';
var origen_anden_1='';
var origen_anden_2='';
var origen_anden_3='';
var fade_1='';
var fade_2='';
var fade_3='';

var rows = ""; 
var estacionPorDefecto = ""; 

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

var destino1 = ""; 
var destino2 = ""; 
var destino3 = ""; 
var destino4 = ""; 
var destino5 = ""; 

var mensaje = ""; 
var mensajeback = ""; 

function func_parpadear() {
	if (parpadear[1]==1) {
		if (parpadear[2]==1) {
			parpadear_estado_2=parpadear_estado_1;
		}
		if (parpadear[3]==1) {
			parpadear_estado_3=parpadear_estado_1;
		}
		if (parpadear_estado_1==0) {
			$('#estado_1').fadeIn(400);
			parpadear_estado_1=1;
		}
		else {
			$('#estado_1').fadeOut(1000);
			parpadear_estado_1=0;
		}
	}
	else {
		$('#estado_1').css('display','block');
	}
	if (parpadear[2]==1) {
		if (parpadear_estado_2==0) {
			$('#estado_2').fadeIn(400);
		}
		else {
			$('#estado_2').fadeOut(1000);
		}
	}
	else {
		$('#estado_2').css('display','block');
	}
	if (parpadear[3]==1) {
		if (parpadear_estado_3==0) {
			$('#estado_3').fadeIn(400);
		}
		else {
			$('#estado_3').fadeOut(1000);
		}
	}
	else {
		$('#estado_3').css('display','block');
	}
	setTimeout("func_parpadear()", 1000);
}
function borrar(f1, f2, f3, f4, f5) {
	if (f1) {
		$('.proximo-servicio#servicio1 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
		$('.proximo-servicio#servicio1 .servicios-especiales').addClass('oculto');
		$('.proximo-servicio#servicio1').addClass('sin-servicio');
		$('.proximo-servicio#servicio1 .estado-mobile').html('');
		$('.proximo-servicio#servicio1 .estado-anden').html('');
		$('.proximo-servicio#servicio1 .anden-mobile').html('').css('display', 'none');
	}

	if (f2) {
		$('.proximo-servicio#servicio2 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
		$('.proximo-servicio#servicio2 .servicios-especiales').addClass('oculto');
		$('.proximo-servicio#servicio2').addClass('sin-servicio');
		$('.proximo-servicio#servicio2 .estado-mobile').html('');
		$('.proximo-servicio#servicio2 .estado-anden').html('');
		$('.proximo-servicio#servicio2 .anden-mobile').html('').css('display', 'none');
	}
	
	if (f3) {
		$('.proximo-servicio#servicio3 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
		$('.proximo-servicio#servicio3 .servicios-especiales').addClass('oculto');
		$('.proximo-servicio#servicio3').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
		$('.proximo-servicio#servicio3 .estado-mobile').html('');
		$('.proximo-servicio#servicio3 .estado-anden').html('');
		$('.proximo-servicio#servicio3 .anden-mobile').html('').css('display', 'none');
	}

	if (estacionPorDefecto == "mitre") {
		if (f4) {
			$('.proximo-servicio#servicio4 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
			$('.proximo-servicio#servicio4 .servicios-especiales').addClass('oculto');
			$('.proximo-servicio#servicio4').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
			$('.proximo-servicio#servicio4 .estado-mobile').html('');
			$('.proximo-servicio#servicio4 .estado-anden').html('');
			$('.proximo-servicio#servicio4 .anden-mobile').html('').css('display', 'none');
		}
		if (f5) {
			$('.proximo-servicio#servicio5 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
			$('.proximo-servicio#servicio5 .servicios-especiales').addClass('oculto');
			$('.proximo-servicio#servicio5').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
			$('.proximo-servicio#servicio5 .estado-mobile').html('');
			$('.proximo-servicio#servicio5 .estado-anden').html('');
			$('.proximo-servicio#servicio5 .anden-mobile').html('').css('display', 'none');
		}
	};
}
function destino(ramal) {
	var salida='';
	if (ramal==12) salida='PLAZA C.';
	return salida;
}
function func_fadeIn(n) {
	$('#hora_'+n).fadeIn(1000);
	$('#destino_'+n).fadeIn(1000);
	$('#anden_'+n).fadeIn(1000);
	$('#servicio_'+n).fadeIn(1000);
	$('#estado_'+n).fadeIn(1000);
}

// Verifica si aún hay servicios corriendo, esto activa un main u otro. 
function verificarTerminal() {
	if (errorDBTerminal === false) {
		if ((selector) && (verifTerminal)) {
			if(rows.length == 0)
			{
				$('main#cargando').css('display', 'none'); 
				$('main#offline').css('display', 'none'); 
				$('main#error-data-incorrecta').css('display', 'none'); 
				$('main#en-servicio').css('display','none');
				$('main#terminal').css('display','none');
				$('main#fuera-de-servicio').css('display','block');
			}else{
				$('main#cargando').css('display', 'none'); 
				$('main#offline').css('display', 'none'); 
				$('main#error-data-incorrecta').css('display', 'none'); 
				$('main#fuera-de-servicio').css('display','none');
				$('main#terminal').css('display','block');
			}
		};
	};
}

function proximasSalidas(idramal, sentido, estdefault) {
	//console.log(idramal+"-"+sentido+"-"+estdefault); 
	if ((selector) && (verifTerminal)) {
		var datosTerminal='';
		//parent.update_refresh();
		if (estdefault == "mitre") {
			var urlget = "proximos-terminal-mitre.php?";
		} else {
			var urlget = "proximos-terminal.php?ramal="+idramal+"&sentido="+sentido+'&'; 
		}

		estacionPorDefecto = estdefault; 


		$.get(urlget+"cartel=&key=v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ",function(jsonTerminal,status){
			datosTerminal=jsonTerminal;
			//setTimeout("proximasSalidas();", 5000);
		})
		.error(function() {
			errorDBTerminal = true; 
			intentos++;
			if (intentos>=10) {
				if (estdefault == "mitre") {borrar(1, 1, 1, 1, 1);} else {borrar(1, 1, 1);};
				$('main#cargando').css('display', 'none'); 
				$('main#offline').css('display', 'block'); 
				$('main#error-data-incorrecta').css('display', 'none'); 
				$('main#en-servicio').css('display','none');
				$('main#terminal').css('display','none');
				$('main#fuera-de-servicio').css('display','none');
			}
			proximasSalidas(idramal, sentido, estdefault);
		})
		.success(function() {
			errorDBTerminal = false; 
			if (datosTerminal=='incorrect key') {
				document.location.href=document.location.href;
			}

			var respuesta = eval("("+datosTerminal+")");
			var hora_actual = respuesta.hora_actual;
			var estacion_nombre = "Estación "+ respuesta.estacion_nombre;
			
			//if ($('#hora').html() != hora_actual) {
			//	$('#hora').fadeOut(500, function () {
			//		$('#hora').html(hora_actual);
			//		$('#hora').fadeIn(500);
			//	});
			//}

			rows = respuesta.rows;

			var cantFilas = ""; 
			if (estdefault ==='mitre') {
				cantFilas = 5; 
			} else {cantFilas = 3}; 
			$('.proximo-servicio#servicio1').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
			$('.proximo-servicio#servicio2').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
			$('.proximo-servicio#servicio3').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
			$('.proximo-servicio#servicio4').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
			$('.proximo-servicio#servicio5').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');

			for (var n=1; n<=cantFilas; n++) {
				if (rows.length>=n) {
					var row = rows[n-1];
					//$('#hora_'+n).html(row.salida_hora);
					if ($('#destino_'+n).html() != row.salida_destino.toUpperCase() || $('#anden_'+n).html() != row.salida_anden.toUpperCase() || $('#servicio_'+n).html() != row.salida_tipo_servicio_desc.toUpperCase()) {
						$('#hora_'+n).fadeOut(1000);
						$('#destino_'+n).fadeOut(1000);
						$('#anden_'+n).fadeOut(1000);
						$('#servicio_'+n).fadeOut(1000);
						$('#estado_'+n).fadeOut(1000);
						setTimeout("func_fadeIn("+n+")",1000);
					}

					//$('#destino_'+n).html(row.salida_destino.toUpperCase());
					$('.proximo-servicio#servicio'+n).removeClass('sin-servicio'); 
					$('.proximo-servicio#servicio'+n+' .tipo-servicio').removeClass('semi-rapido'); 
					
					// Adapta horarios a 12hs. 
					var horaSalidaAMPM = moment(row.salida_hora, ["HH:mm"]).format("hh:mma");
					// Estaciónes en minúsculas. 
					for (var i = 0; i < row.salida_destino.length; i++) {
						var destinoMinusculas = row.salida_destino.toLowerCase();
					}
					var destino = destinoMinusculas;

					for (var o = 1; o <= rows.length ; o++) {
							if (o === 1) {
								destino1 = rows[0].salida_destino; 
							}
							else if (o === 2) {
								destino2 = rows[1].salida_destino; 
						}
							else if (o === 3) {
								destino3 = rows[2].salida_destino; 
						}
							else if (o === 4) {
								destino4 = rows[3].salida_destino; 
						}
							else if (o === 5) {
								destino5 = rows[4].salida_destino; 
						};
					}; 

					var mismoDestino = function(){
						//console.log('Mismo destino'); 
						$('h1#tituloMismoDestino').html('Próximos servicios a <span style="text-transform: capitalize;">'+destinoMinusculas+'</span>').css('display', 'block'); 
						$('.proximo-servicio#servicio'+ n +' .destino-mobile').html('A las '+horaSalidaAMPM);
						$('.proximo-servicio#servicio'+ n +' .destino-hora').html(horaSalidaAMPM);
					}

					if (((destino1 === destino2) && (destino2 === destino3)) && ((destino3 === destino4) && (destino4 === destino5))) {
						mismoDestino(); 
					} else if (((destino1 === destino2) && (destino2 === destino3)) && (destino3 === destino4)) {
						mismoDestino(); 
					} else if ((destino1 === destino2) && (destino2 === destino3)) {
						mismoDestino(); 
					} else if (destino1 === destino2) {
						mismoDestino(); 
					} else {
						$('h1#tituloMismoDestino').css('display', 'none'); 
						$('.proximo-servicio#servicio'+ n +' .destino-mobile').html('Próximo servicio a <span style="text-transform: capitalize;">'+destinoMinusculas+'</span> a las '+horaSalidaAMPM);
						//$('.proximo-servicio#servicio'+ n +' .hora-mobile').html(row.salida_hora);
						$('.proximo-servicio#servicio'+ n +' .destino-hora').html('A <span style="text-transform: capitalize;">'+destinoMinusculas+'</span>: '+horaSalidaAMPM);
						//$('#anden_'+n).html(row.salida_anden.toUpperCase());
					}

					if (row.salida_tipo_servicio_desc == "Normal") {
						$('.proximo-servicio#servicio'+n+' .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
						$('.proximo-servicio#servicio'+n+' .servicios-especiales').addClass('oculto');
					} else {
						$('.proximo-servicio#servicio'+n+' .tipo-servicio').addClass('oculto'); 
						//$('.proximo-servicio#servicio'+n+' .servicios-especiales').removeClass('oculto');
						//$('.proximo-servicio#servicio'+n+' .tipo-servicio').html('Servicio '+row.salida_tipo_servicio_desc);
						$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').html('Servicio '+row.salida_tipo_servicio_desc);
						if (row.salida_tipo_servicio_desc == "Especial") {
							$('.proximo-servicio#servicio'+n+' .tipo-servicio').addClass('especial'); 
							$('.proximo-servicio#servicio'+n+' .servicios-especiales').removeClass('oculto');
							$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').addClass('especial'); 
							$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').html('Servicio especial');
						} else if (row.salida_tipo_servicio_desc == "Rapido") {
							$('.proximo-servicio#servicio'+n+' .tipo-servicio').addClass('rapido'); 
							$('.proximo-servicio#servicio'+n+' .servicios-especiales').removeClass('oculto');
							$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').addClass('rapido'); 
							$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').html('Servicio rápido');
						} else if (row.salida_tipo_servicio_desc == "Semi-rapido") {
							$('.proximo-servicio#servicio'+n+' .tipo-servicio').addClass('semi-rapido'); 
							$('.proximo-servicio#servicio'+n+' .servicios-especiales').removeClass('oculto');
							$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').addClass('semi-rapido'); 
							$('.proximo-servicio#servicio'+n+' .servicios-especiales .tipo').html('Servicio s-rapido');
						};
					}

					if (row.paradas.length>0) {
						$('#estaciones'+n).css('display','block');
						var paradas='';
						for (var i=0; i<row.paradas.length; i++) {
							paradas = paradas + row.paradas[i].toLowerCase();
							if (i+1 < row.paradas.length) {
								paradas = paradas + ' - ';
							}
						}
						var espacios='';
						for (e=0; e<120; e++) { espacios+='&nbsp;'; }
						//$('#estaciones'+n).html(espacios+paradas);


						if (n == 1) {
							estaciones1 = paradas;
							if (estacionesback1 !== estaciones1) {
								$('.tipo-servicio #estaciones1').html(espacios+estaciones1);
								$('.servicios-especiales #estaciones1').html(espacios+estaciones1);
							}; 
						} 
						else if (n == 2) {
							estaciones2 = paradas;
							if (estacionesback2 !== estaciones2) {
								$('.tipo-servicio #estaciones2').html(espacios+estaciones2);
								$('.servicios-especiales #estaciones2').html(espacios+estaciones2);
							}; 
						} 
						else if (n == 3) {
							estaciones3 = paradas;
							if (estacionesback3 !== estaciones3) {
								$('.tipo-servicio #estaciones3').html(espacios+estaciones3);
								$('.servicios-especiales #estaciones3').html(espacios+estaciones3);
							}; 
						}
						else if (n == 4) {
							estaciones4 = paradas;
							if (estacionesback4 === estaciones4) {
								console.log('Repite 4'); 
							} else {
								$('.tipo-servicio #estaciones4').html(espacios+estaciones4);
								$('.servicios-especiales #estaciones4').html(espacios+estaciones4);
							}; 
						}
						else if (n == 5) {
							estaciones5 = paradas;
							if (estacionesback5 === estaciones5) {
								console.log('Repite 5'); 
							} else {
								$('.tipo-servicio #estaciones5').html(espacios+estaciones5);
								$('.servicios-especiales #estaciones5').html(espacios+estaciones5);
							}; 
						}
					}
					else {
						$('#marquee_'+n).css('display','none');
						$('.tipo-servicio #estaciones'+n).html('');
						$('.servicios-especiales #estaciones'+n).html('');
					}
					if (estdefault != "") {
						var atributos = 'mostrarAnden('+ramal+', '+row.salida_anden+', '+sentido+', "'+estdefault+'")'; 
						$('.proximo-servicio#servicio'+n).attr('onClick', atributos); 
					} else {
						$('.proximo-servicio#servicio'+n).attr('onClick', 'mostrarAnden('+ramal+', '+row.salida_anden+', '+sentido+')'); 
					};
					switch (Math.round(row.salida_estado)) {
					case 1:
						$('.proximo-servicio#servicio'+n).addClass('confirmado').removeClass('enanden'); 
						$('.proximo-servicio#servicio'+n+' .estado-mobile').html('Confirmado por andén '+row.salida_anden);
						$('.proximo-servicio#servicio'+n+' .estado-anden').html('Confirmado por andén '+row.salida_anden);
						break;
					case 2:
						$('.proximo-servicio#servicio'+n).removeClass('confirmado').addClass('enanden'); 
						$('.proximo-servicio#servicio'+n+' .estado-mobile').html('Saldrá pronto por andén '+row.salida_anden);
						$('.proximo-servicio#servicio'+n+' .estado-anden').html('Está en andén '+row.salida_anden);
						break;
					case 3:
						$('.proximo-servicio#servicio'+n).removeClass('confirmado').removeClass('enanden'); 
						$('.proximo-servicio#servicio'+n+' .estado-mobile').html('Servicio a confirmar.');
						$('.proximo-servicio#servicio'+n+' .estado-anden').html('Servicio a confirmar');
						$('.proximo-servicio#servicio'+n+' .anden-mobile').html('').css('display', 'none');
						//$('.proximo-servicio#servicio'+n+' .servicios-especiales').addClass('oculto');
						if (row.salida_tipo_servicio_desc != "Normal") {
							$('.proximo-servicio#servicio'+n+' .tipo-servicio').removeClass('oculto');
							$('.proximo-servicio#servicio'+n+' .servicios-especiales').addClass('oculto');
						} else {
							$('.proximo-servicio#servicio'+n+' .tipo-servicio').addClass('oculto');
							$('.proximo-servicio#servicio'+n+' .servicios-especiales').removeClass('oculto');
						}
						$('.proximo-servicio#servicio'+n).attr('onClick', ''); 
						break;
					}
					parpadear[n]=row.parpadear;
				}
				else {
					$('main#cargando').css('display', 'none'); 
					$('main#fuera-de-servicio').css('display', 'block'); 
					if (estdefault == "mitre") {
						if (n==1) borrar(1, 1, 1, 1, 1);
						if (n==2) borrar(0, 1, 1, 1, 1);
						if (n==3) borrar(0, 0, 1, 1, 1);
						if (n==4) borrar(0, 0, 0, 1, 1);
						if (n==5) borrar(0, 0, 0, 0, 1);
					} else {
						if (n==1) borrar(1, 1, 1);
						if (n==2) borrar(0, 1, 1);
						if (n==3) borrar(0, 0, 1);
					}
				}
			}
			if (respuesta.mensaje != '') {
				$('#barra-mensaje-alerta-terminal').css('display', 'block'); 
				mensaje = respuesta.mensaje;
				var espacios='';
				for (n=0; n<120; n++) { espacios+='&nbsp;'; }
				$('#marquee_pie').css("font-size","43px");
				$('#marquee_pie').css("top","705px");
				$('#pie_fondo').css('display','block');

				// El mensaje va en minúsculas. 
				for (var i = 0; i < mensaje.length; i++) {
					if (i === 1) {
						var mensajeMinusculas = mensaje.toLowerCase();
					};
				}
				mensaje = espacios + mensajeMinusculas;
				if (mensaje !== mensajeback) {
					$('#barra-mensaje-alerta-terminal h1#normal').html(mensaje);
					$('#barra-mensaje-alerta-terminal h1#responsive').html(mensajeMinusculas);
				};
			}
			else {
				$('#barra-mensaje-alerta-terminal').css('display', 'none'); 
				$('#pie_fondo').css('display','none');
				var espacios = ""; 
				for (n=0; n<75; n++) {espacios+='&nbsp;'; }
				$('#pie').html(espacios+'EL TREN ES TUYO, CUIDALO&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;MINISTERIO DEL INTERIOR Y TRANSPORTE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;PRESIDENCIA DE LA NACI&Oacute;N');
				$('#marquee_pie').css("font-size","42px");
				$('#marquee_pie').css("top","708px");
			};
		})
		.complete(function() {
			if ((selector) && (verifTerminal)) {
				$('main#cargando').css('display', 'none'); 
				$('main#terminal').css('display', 'block'); 
				verificarTerminal(); 
				//setTimeout("proximasSalidas("+idramal+", "+sentido+", '"+estdefault+"');", 10000);
			}; 
			if (mensaje !== mensajeback) {
				$('#barra-mensaje-alerta-terminal h1#normal').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				mensajeback = mensaje; 
			}; 
			if (estaciones1 !== estacionesback1) {
				$('.tipo-servicio #estaciones1').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				$('.servicios-especiales #estaciones1').marquee({
					//speed in milliseconds of the marquee
					speed: 4000,
					//gap in pixels between the tickers
					gap: 8000,
					//gap in pixels between the tickers
					delayBeforeStart: 0,
					//'left' or 'right'
					direction: 'left'
				});
				estacionesback1 = estaciones1; 
			};
			if (estaciones2 !== estacionesback2) {
				$('.tipo-servicio #estaciones2').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				$('.servicios-especiales #estaciones2').marquee({
					//speed in milliseconds of the marquee
					speed: 4000,
					//gap in pixels between the tickers
					gap: 8000,
					//gap in pixels between the tickers
					delayBeforeStart: 0,
					//'left' or 'right'
					direction: 'left'
				});
				estacionesback2 = estaciones2; 
			};
			if (estaciones3 !== estacionesback3) {
				$('.tipo-servicio #estaciones3').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				$('.servicios-especiales #estaciones3').marquee({
					//speed in milliseconds of the marquee
					speed: 4000,
					//gap in pixels between the tickers
					gap: 8000,
					//gap in pixels between the tickers
					delayBeforeStart: 0,
					//'left' or 'right'
					direction: 'left'
				});
				estacionesback3 = estaciones3; 
			};
			if (estacionPorDefecto == "mitre") {
				if (estaciones4 !== estacionesback4) {
					$('.tipo-servicio #estaciones4').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
					$('.servicios-especiales #estaciones4').marquee({
						//speed in milliseconds of the marquee
						speed: 4000,
						//gap in pixels between the tickers
						gap: 8000,
						//gap in pixels between the tickers
						delayBeforeStart: 0,
						//'left' or 'right'
						direction: 'left'
					});
					estacionesback4 = estaciones4; 
				}; 
				if (estaciones5 !== estacionesback5) {
					$('.tipo-servicio #estaciones5').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
					$('.servicios-especiales #estaciones5').marquee({
						//speed in milliseconds of the marquee
						speed: 4000,
						//gap in pixels between the tickers
						gap: 8000,
						//gap in pixels between the tickers
						delayBeforeStart: 0,
						//'left' or 'right'
						direction: 'left'
					});
					estacionesback5 = estaciones5; 
				}; 
			}
		});
	}
}