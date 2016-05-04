var intentos=0;
var errorDBTerminal = false; 

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


function borrar(f1, f2, f3, f4, f5) {
	if (f1) {
		$('.next-train#serv1 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
		$('.next-train#serv1 .servicios-especiales').addClass('oculto');
		$('.next-train#serv1').addClass('sin-servicio');
		$('.next-train#serv1 .estado-mobile').html('');
		$('.next-train#serv1 .estado-anden').html('');
		$('.next-train#serv1 .anden-mobile').html('').css('display', 'none');
	}

	if (f2) {
		$('.next-train#serv2 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
		$('.next-train#serv2 .servicios-especiales').addClass('oculto');
		$('.next-train#serv2').addClass('sin-servicio');
		$('.next-train#serv2 .estado-mobile').html('');
		$('.next-train#serv2 .estado-anden').html('');
		$('.next-train#serv2 .anden-mobile').html('').css('display', 'none');
	}
	
	if (f3) {
		$('.next-train#serv3 .tipo-servicio').removeClass('oculto').removeClass('especial').removeClass('rapido').removeClass('semi-rapido');
		$('.next-train#serv3 .servicios-especiales').addClass('oculto');
		$('.next-train#serv3').addClass('sin-servicio').removeClass('confirmado').removeClass('enanden');
		$('.next-train#serv3 .estado-mobile').html('');
		$('.next-train#serv3 .estado-anden').html('');
		$('.next-train#serv3 .anden-mobile').html('').css('display', 'none');
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

function proximasSalidas(idramal, sentido, estdefault) {
	$('.loading-container').addClass('hidden'); 
	$('.main-container').removeClass('hidden'); 
	$('#estacion-actual').html('Estación ' + nombreEstacion); 
	$('#estacion-actual-2').html(nombreEstacion); 
	imgFooter(terminal.station); 
	if ((selector) && (verifTerminal)) {
		var datosTerminal='';
		if (estdefault == "mitre") {
			var urlget = "php/terminal-mitre.php?";
		} else {
			var urlget = "php/terminal.php?ramal="+idramal+"&sentido="+sentido+'&'; 
		}

		estacionPorDefecto = estdefault; 


		$.get(urlget+"cartel=&key=v%23v%23QTUtWp%23MpWRy80Q0knTE10I30kj%23FNyZ",function(jsonTerminal,status){
			datosTerminal=jsonTerminal;
			$('#loading-section').modal('hide');
		})
		.error(function() {
			errorDBTerminal = true; 
			intentos++;
			if (intentos>=10) {
				if (estdefault == "mitre") {borrar(1, 1, 1, 1, 1);} else {borrar(1, 1, 1);};
				ifError('offline'); 
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

			rows = respuesta.rows;

			var cantFilas = ""; 
			if (estdefault ==='mitre') {
				cantFilas = 5; 
			} else {cantFilas = 3}; 
			$('.next-train#serv1').addClass('hidden').removeClass('confirmed').removeClass('on-platform');
			$('.next-train#serv2').addClass('hidden').removeClass('confirmed').removeClass('on-platform');
			$('.next-train#serv3').addClass('hidden').removeClass('confirmed').removeClass('on-platform');
			$('.next-train#serv4').addClass('hidden').removeClass('confirmed').removeClass('on-platform');
			$('.next-train#serv5').addClass('hidden').removeClass('confirmed').removeClass('on-platform');

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
						//$('h1#sameDestiny').html('Próximos servicios a <span style="text-transform: capitalize;">'+destinoMinusculas+'</span>').removeClass('hidden'); 
						$('h1#sameDestiny').html('Próximos servicios a <span id="station-to"></span>').removeClass('hidden'); 
						$('#station-to').text(stationConverter(destinoMinusculas));
						$('.next-train#serv'+ n +' .destiny-timedeparture p.mobile').html('A las '+horaSalidaAMPM);
						$('.next-train#serv'+ n +' .destiny-timedeparture p.desktop').html(horaSalidaAMPM);
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
						$('h1#sameDestiny').addClass('hidden'); 
						$('.next-train#serv'+ n +' .destiny-timedeparture p.mobile').html('Próximo servicio a <span id="dest'+n+'" style="text-transform: capitalize;">'+stationConverter(destinoMinusculas)+'</span> a las '+horaSalidaAMPM);
						//$('.proximo-servicio#servicio'+ n +' .hora-mobile').html(row.salida_hora);
						$('.next-train#serv'+ n +' .destiny-timedeparture p.desktop').html('A <span id="dest'+n+'" style="text-transform: capitalize;">'+stationConverter(destinoMinusculas)+'</span>: '+horaSalidaAMPM);
						$('#dest'+n).text(stationConverter(destinoMinusculas));
						//$('#anden_'+n).html(row.salida_anden.toUpperCase());
					}

					if (row.salida_tipo_servicio_desc == "Normal") {
						$('.next-train#serv'+n+' .card-footer .train-type').addClass('hidden');
						$('.next-train#serv'+n+' .card-footer .stops').removeClass('col-md-8').addClass('col-md-12'); 
					} else {
						$('.next-train#serv'+n+' .card-footer .train-type').removeClass('hidden').removeClass('special').removeClass('rapido').removeClass('semi-rapido'); 
						$('.next-train#serv'+n+' .card-footer .train-type p').html('Servicio '+row.salida_tipo_servicio_desc);
						$('.next-train#serv'+n+' .card-footer .stops').addClass('col-md-8').removeClass('col-md-12'); 
						if (row.salida_tipo_servicio_desc == "Especial") {
							$('.next-train#serv'+n+' .card-footer .train-type').addClass('special');
							$('.next-train#serv'+n+' .card-footer .train-type p').html('Servicio especial');
						} else if (row.salida_tipo_servicio_desc == "Rapido") {
							$('.next-train#serv'+n+' .card-footer .train-type').addClass('rapido');
							$('.next-train#serv'+n+' .card-footer .train-type p').html('Servicio rápido');
						} else if (row.salida_tipo_servicio_desc == "Semi-rapido") {
							$('.next-train#serv'+n+' .card-footer .train-type').addClass('semi-rapido');
							$('.next-train#serv'+n+' .card-footer .train-type p').html('Servicio s-rapido');
						};
					}

					if (row.paradas.length>0) {
						$('#stops'+n).css('display','block');
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
								$('.card-footer #stops1').html(espacios+estaciones1);
							}; 
						} 
						else if (n == 2) {
							estaciones2 = paradas;
							if (estacionesback2 !== estaciones2) {
								$('.card-footer #stops2').html(espacios+estaciones2);
							}; 
						} 
						else if (n == 3) {
							estaciones3 = paradas;
							if (estacionesback3 !== estaciones3) {
								$('.card-footer #stops3').html(espacios+estaciones3);
							}; 
						}
						else if (n == 4) {
							estaciones4 = paradas;
							if (estacionesback4 === estaciones4) {
								console.log('Repite 4'); 
							} else {
								$('.card-footer #stops4').html(espacios+estaciones4);
							}; 
						}
						else if (n == 5) {
							estaciones5 = paradas;
							if (estacionesback5 === estaciones5) {
								console.log('Repite 5'); 
							} else {
								$('.card-footer #stops5').html(espacios+estaciones5);
							}; 
						}
					}
					else {
						$('#marquee_'+n).css('display','none');
						$('.card-footer .stops'+n).html('');
					}
					if (estdefault != "") {
						var attr = 'mostrarAnden('+ramal+', '+row.salida_anden+', '+sentido+', "'+estdefault+'")'; 
						$('.next-train#serv'+n).attr('onClick', attr); 
					} else {
						$('.next-train#serv'+n).attr('onClick', 'mostrarAnden('+ramal+', '+row.salida_anden+', '+sentido+')'); 
					};
					switch (Math.round(row.salida_estado)) {
					case 1:
						$('.next-train#serv'+n).removeClass('hidden').addClass('confirmed').removeClass('on-platform'); 
						$('.next-train#serv'+n+' .status-platform p').html('Confirmado por andén '+row.salida_anden);
						$('.next-train#serv'+n+' .card-footer').removeClass('hidden'); 
						break;
					case 2:
						$('.next-train#serv'+n).removeClass('hidden').addClass('confirmed').addClass('on-platform'); 
						$('.next-train#serv'+n+' .status-platform').html('Saldrá pronto por andén '+row.salida_anden);
						$('.next-train#serv'+n+' .card-footer').removeClass('hidden');
						break;
					case 3:
						$('.next-train#serv'+n).removeClass('hidden').removeClass('confirmed').removeClass('on-platform'); 
						$('.next-train#serv'+n+' .status-platform').html('Servicio a confirmar.');
						$('.proximo-servicio#servicio'+n+' .anden-mobile').html('').css('display', 'none');
						//$('.proximo-servicio#servicio'+n+' .servicios-especiales').addClass('oculto');
						if (row.salida_tipo_servicio_desc != "Normal") {
							$('.proximo-servicio#servicio'+n+' .tipo-servicio').addClass('oculto');
							$('.proximo-servicio#servicio'+n+' .servicios-especiales').removeClass('oculto');
						} else {
							$('.next-train#serv'+n+' .card-footer').addClass('hidden');
							$('.next-train#serv'+n+' .card-footer').addClass('hidden');
							$('.next-train#serv'+n+' .card-footer .stops').removeClass('col-md-8').addClass('col-md-12'); 
						}
						$('.next-train#serv'+n).attr('onClick', ''); 
						break;
					}
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



			if (errorDBTerminal === false) {
				if ((selector) && (verifTerminal)) {
					if(rows.length == 0){
						$(maindiv).html(showNoServices);
					}else{
						$('main#cargando').css('display', 'none'); 
						$('main#offline').css('display', 'none'); 
						$('main#error-data-incorrecta').css('display', 'none'); 
						$('main#fuera-de-servicio').css('display','none');
						$('main#terminal').css('display','block');
					}
				} else {
					$('main#cargando').css('display', 'none'); 
					$('main#offline').css('display', 'none'); 
					$('main#error-data-incorrecta').css('display', 'none'); 
					$('main#fuera-de-servicio').css('display','none');
					$('main#terminal').css('display','none');
					$('#barra-mensaje-alerta-terminal').css('display', 'none'); 
				}
			};

			if ((selector) && (verifTerminal)) {
				$('main#cargando').css('display', 'none'); 
				$('main#terminal').css('display', 'block'); 
				//verificarTerminal(); 
				//setTimeout("proximasSalidas("+idramal+", "+sentido+", '"+estdefault+"');", 10000);
			}; 
			if (mensaje !== mensajeback) {
				$('#barra-mensaje-alerta-terminal h1#normal').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				mensajeback = mensaje; 
			}; 
			if (estaciones1 !== estacionesback1) {
				$('.card-footer #stops1').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				estacionesback1 = estaciones1; 
			};
			if (estaciones2 !== estacionesback2) {
				$('.card-footer #stops2').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				estacionesback2 = estaciones2; 
			};
			if (estaciones3 !== estacionesback3) {
				$('.card-footer #stops3').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
				estacionesback3 = estaciones3; 
			};
			if (estacionPorDefecto == "mitre") {
				if (estaciones4 !== estacionesback4) {
					$('.card-footer #stops4').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
					estacionesback4 = estaciones4; 
				}; 
				if (estaciones5 !== estacionesback5) {
					$('.card-footer #stops5').marquee({speed: 4000, gap: 8000, delayBeforeStart: 0, direction: 'left'});
					estacionesback5 = estaciones5; 
				}; 
			}			
		});
		//.complete(function() {
			
		//});
	}
}