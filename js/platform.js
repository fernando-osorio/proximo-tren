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
	$('#service-info .card-footer .delayed').css('display', 'none');
	if($('.salida#hora').text()!='Sin datos') {
		if( hora_entera(horaSalida) < hora_entera(hora_actual)) {
			var hsalida = moment(horaSalidaAMPM, "h:mma", 'es');
			var tiempoAtraso = moment(hsalida).fromNow(true);
			$('#service-info .card-block .departure').text(horaSalidaAMPM);
			$('#service-info .card-footer .delayed').html('Atraso de '+tiempoAtraso).css('display', 'block');
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
function proximaSalida(branch, anden) {
	dataConverter(parseInt(branch)); 
	imgFooter(parseInt(branch)); 
	if (lineinfo.desc) {
		$('#station-data #data_station h1').html('Estación ' + JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].estacion); 
	} else {$('#station-data #data_station h1').html('Estación ' + JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].estacion); }
	$('.loading-container').addClass('hidden'); 
	//$('#current-station').html('Estación ' + nombreEstacion); 
	//$('#current-station-2').html(nombreEstacion); 
	var datosAnden=''; 
	var cartel= '';
	
	//$.get("php/platform.php?ramal="+branch+"&anden="+anden+"&cartel="+cartel ,function(datosAndenOrigen,status){
	$.get("http://sum1.lantalkswebmedia.xyz:8082/proximo-tren/platform.php?ramal="+branch+"&anden="+anden+"&cartel="+cartel ,function(datosAndenOrigen,status){
		datosAnden=datosAndenOrigen;
		$('#loading-section').modal('hide'); 
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
		proximaSalida(branch, anden); 
	})
	.success(function() {
		$('#scr-platform.main-container').removeClass('hidden'); 
		errorDBAnden = false; 
		arr=datosAnden.split("_");
		if (arr.length > 0) {

			if (arr[0]=='ok') {
				$('#platform-data').removeClass('hidden'); 
				$("#no-services").hide(); 
				horaSalida = arr[1];
				horaSalidaAMPM = moment(arr[1], ["HH:mm"]).format("hh:mma");
				$('#service-info .departure').html(horaSalidaAMPM); 
				$('#platform-info .number').html(arr[2]); 
				//$('.anden#mobile').html('Desde el andén '+arr[2]); 
				
				if (arr[6]=='1') {
					//parent.refresh();
				}

				var estacionesMinusculas = arr[5].toLowerCase(); 
				estacionesAnden = estacionesMinusculas; 
				
				if (arr[3] != '1') {
					var ultimaEstacion = arr[5].slice(arr[5].lastIndexOf(' - ') + 3).toLowerCase(); 
					$('#service-info .card-block .destiny').html('Sale hacia <span style="text-transform: capitalize;">' + stationParser(ultimaEstacion, "station") + '</span> a las');

					$('#service-info .card-footer .type').removeClass('rapido').removeClass('semi-rapido').removeClass('special'); 
					$('#service-info .card-footer').show(); 
					if (arr[3]=='2') {
						$('#service-info .card-footer .type .string').html('Rápido'); 
						$('.servicio-especial#salida').css('display','block')
						$('.cuadro-serv-especiales.tipo-serv#salida').addClass('rapido'); 
						$('#estaciones').css('display','block'); 
						var espacios='';
						for (n=0; n<50; n++) { espacios+='&nbsp;'; }
						if (estacionesAndenBack != estacionesAnden) {
							$('#service-info .card-footer .stations p').html(espacios+estacionesAnden);
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
							$('#service-info .card-footer .stations p').html(espacios+estacionesAnden);
						};
					}
					else if (arr[3]=='3') {
						$('#service-info .card-footer .type .string').html('Especial'); 
						$('#service-info .card-footer .type').show();
						$('#service-info .card-footer .type').addClass('special'); 
						$('#estaciones').css('display','block'); 
						var espacios='';
						for (n=0; n<50; n++) { espacios+='&nbsp;'; }
						if (estacionesAndenBack != estacionesAnden) {
							$('#service-info .card-footer .stations p').html(espacios+estacionesAnden);
						};
					};

					if (estacionesAndenBack != estacionesAnden) {
						$('#service-info .card-footer .stations p').marquee({
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
				} else {
					$('#service-info .card-footer .type .string').html('Normal'); 
					$('.servicio-especial#salida').css('display','none'); 
					$('#service-info .card-footer').hide(); 
					$('#estaciones').css('display','block'); 
					var espacios='';
					for (n=0; n<50; n++) { espacios+='&nbsp;'; }
					$('#service-info .card-block .destiny').html('Sale hacia <span style="text-transform: capitalize;">' + stationParser(estacionesAnden, "station") + '</span> a las');
				}
				
				estado_i = arr[7];
				estado_v = arr[8];
				mensaje = arr[9];
				hora_actual = arr[4];
				mostrar_hora();
				setear_hora()
			}
			else {
				$('#platform-data').addClass('hidden'); 
				$("#no-services").show(); 
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

		mostrarAlerta();
	});
		//.complete(function() {
			
			//setTimeout("proximaSalida("+branch+", "+anden+");", 1500);
		//});
}