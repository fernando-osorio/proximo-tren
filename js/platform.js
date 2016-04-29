var estado_i=1;
var estado_v=1;
var mensaje='';

var arr = ""; 
var horaSalida = ""; 
var horaSalidaAMPM = ""; 

var estacionesAnden = ""; 
var estacionesAndenBack = ""; 

$(function(){

    $('#mensaje').marquee({
		//speed in milliseconds of the marquee
		speed: 28000,
		//gap in pixels between the tickers
		gap: 4000,
		//gap in pixels between the tickers
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left'
	});
});

var hora_actual=0;
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
function verificarAnden(){
	if (errorDBAnden === false) {
		if ((selector) && (verifAnden)) {
			if( ($('.salida#hora').html() == 'Sin datos'))
			{
				ifError(showNoServices); 
			}else{
				ifError('noerror'); 
			}
		};
	};
}
function mostrarAlerta()
{
    var espacios='';
    for (n=0; n<120; n++) { espacios+='&nbsp;'; }
    if(estado_i != 0) // muestra el cartel en esta estacion
    {   
            $('#mensaje').css('display','block');
            if(estado_v != 0)//muestro el mensaje para los dos sentidos
            {
                    $('#alertas').html(espacios+mensaje);
            }
            else//muestro el cartel con sentido al destino
            {
                    $('#alertas').html(espacios+'Sentido Cabred: '+mensaje);
            }
    }
    else//en sentido al destino no esta cargada esta estacion, chequeo la vuelta
    {
            if(estado_v != 0)//muestro el mensaje para la estacion origen
            {
                    $('#mensaje').css('display','block');
                    $('#alertas').html(espacios+'Sentido : '+mensaje);
            }
            else//no muestro el cartel de alerta
            {

                    $('#mensaje').css('display','none');
            }
    }
}
function mostrar_hora()
{
	if(hora_actual != 0) {
		$('#hora_actual').text(hora_actual);
	}
}
function setear_hora() {
	function hora_entera(hora) {
		var arr_hora = hora.split(':');
		return(parseInt(arr_hora[0]*60)+parseInt(arr_hora[1]));
	}
	$('.servicio-atrasado').css('display', 'none');
	if($('.salida#hora').text()!='Sin datos') {
		if( hora_entera(horaSalida) < hora_entera(hora_actual)) {
			var hsalida = moment(horaSalidaAMPM, "h:mma", 'es');
			var tiempoAtraso = moment(hsalida).fromNow(true);
			$('.salida#hora').text(horaSalidaAMPM);
			$('.servicio-atrasado').html('Atraso de '+tiempoAtraso).css('display', 'block');
		}
	}
}

function ultimaEstacion(frase) {
	var fraseentera = frase.split(" - ");
	var ultimapalabra = fraseentera[fraseentera.length - 1]; 
	console.log('Ultima: '+ultimapalabra);
}
var intentos=0;
var errorDBAnden = false; 
function proximaSalida(numRamal, anden) {
	$('.loading-container').addClass('hidden'); 
	$('.main-container').removeClass('hidden'); 
	$('#current-station').html('Estación ' + nombreEstacion); 
	$('#current-station-2').html(nombreEstacion); 
	imgFooter(platform.station); 
	if ((selector) && (verifAnden)) {
		var datosAnden=''; 
		var cartel= '';
		
		$.get("php/platform.php?ramal="+numRamal+"&anden="+anden+"&cartel="+cartel ,function(datosAndenOrigen,status){					
			datosAnden=datosAndenOrigen;
		})
		.error(function() {
			errorDBAnden = true; 
			intentos++;
			if (intentos>=10) {
				$('main#cargando').css('display', 'none'); 
				$('main#offline').css('display', 'block'); 
				$('main#error-data-incorrecta').css('display', 'none'); 
				$('main#anden-en-servicio').css('display', 'none'); 
				$('main#fuera-de-servicio').css('display', 'none'); 
				$('#barra-mensaje-alerta').css('display', 'none'); 
			}
			proximaSalida(numRamal, anden); 
		})
		.success(function() {
			errorDBAnden = false; 
			arr=datosAnden.split("_");
			if (arr.length > 0) {

				if (arr[0]=='ok') {
					horaSalida = arr[1];
					horaSalidaAMPM = moment(arr[1], ["HH:mm"]).format("hh:mma");
					$('.salida#hora').html(horaSalidaAMPM); 
					$('.anden#numero').html(arr[2]); 
					$('.anden#mobile').html('Desde el andén '+arr[2]); 
					
					if (arr[6]=='1') {
						//parent.refresh();
					}

					var estacionesMinusculas = arr[5].toLowerCase(); 
					estacionesAnden = estacionesMinusculas; 
					
					if (arr[3] != '1') {
						var ultimaEstacion = arr[5].slice(arr[5].lastIndexOf(' - ') + 3).toLowerCase(); 
						$('.salida#texto').html('El tren sale hacia <span style="text-transform: capitalize;">' + ultimaEstacion + '</span> a las');


						$('.cuadro-serv-especiales.tipo-serv#salida').removeClass('rapido').removeClass('semi-rapido').removeClass('especial'); 
						$('.card .card-footer').removeClass('hidden'); 
						if (arr[3]=='2') {
							$('.tipo-servicio#salida').html('Rápido'); 
							$('.servicio-especial#salida').css('display','block')
							$('.cuadro-serv-especiales.tipo-serv#salida').addClass('rapido'); 
							$('#estaciones').css('display','block'); 
							var espacios='';
							for (n=0; n<50; n++) { espacios+='&nbsp;'; }
							if (estacionesAndenBack != estacionesAnden) {
								$('.salida#estaciones').html(espacios+estacionesAnden);
							};
						}
						else if (arr[3]=='4') {
							$('.tipo-servicio#salida').html('Semirrápido'); 
							$('.servicio-especial#salida').css('display','block');
							$('.cuadro-serv-especiales.tipo-serv#salida').addClass('semi-rapido'); 
							$('#estaciones').css('display','block'); 
							var espacios='';
							for (n=0; n<50; n++) { espacios+='&nbsp;'; }
							if (estacionesAndenBack != estacionesAnden) {
								$('.salida#estaciones').html(espacios+estacionesAnden);
							};
						}
						else if (arr[3]=='3') {
							$('.tipo-servicio#salida').html('Especial'); 
							$('.servicio-especial#salida').css('display','block')
							$('.cuadro-serv-especiales.tipo-serv#salida').addClass('especial'); 
							$('#estaciones').css('display','block'); 
							var espacios='';
							for (n=0; n<50; n++) { espacios+='&nbsp;'; }
							if (estacionesAndenBack != estacionesAnden) {
								$('.salida#estaciones').html(espacios+estacionesAnden);
							};
						}
					} else {
						$('.tipo-servicio#salida').html('Normal'); 
						$('.servicio-especial#salida').css('display','none'); 
						$('.card .card-footer').addClass('hidden'); 
						$('#estaciones').css('display','block'); 
						var espacios='';
						for (n=0; n<50; n++) { espacios+='&nbsp;'; }
						$('.salida#texto').html('El tren sale hacia <span style="text-transform: capitalize;">' + estacionesAnden + '</span> a las');
					}
					
					estado_i = arr[7];
					estado_v = arr[8];
					mensaje = arr[9];
					hora_actual = arr[4];
					mostrar_hora();
					setear_hora()
				}
				else {
	                estado_i = arr[1];
	                estado_v = arr[2];
	                mensaje = arr[3];
					$('.salida#hora').html('Sin datos');
					$('#link2').html('');
					$('#link3').html('');
					$('#estaciones').css('display','none'); 
					$('#lblEstaciones').css('display','none'); 
					$('#texto').html('');
					if (arr[4]=='1') {
						//parent.refresh();
					}
				}
			}
			else {
	            estado_i = arr[1];
	            estado_v = arr[2];
	            mensaje = arr[3];
				$('.salida#hora').html('Sin datos');
				$('#link2').html('1');
				$('#link3').html(' ');
				$('#estaciones').css('display','none'); 
				$('#lblEstaciones').css('display','none'); 
				$('#texto').html('');
			}

			verificarAnden();
			mostrarAlerta();
			if ((selector) && (verifAnden)) {
				if (estacionesAndenBack != estacionesAnden) {
					$('.salida#estaciones').marquee({
						//speed in milliseconds of the marquee
						speed: 3000,
						//gap in pixels between the tickers
						gap: 4000,
						//gap in pixels between the tickers
						delayBeforeStart: 0,
						//'left' or 'right'
						direction: 'left'
					});
					estacionesAndenBack = estacionesAnden; 
				};
			};
		});
		//.complete(function() {
			
			//setTimeout("proximaSalida("+numRamal+", "+anden+");", 1500);
		//});
	}
}