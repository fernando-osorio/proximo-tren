var fn_station = function(branch, station) {
	dataConverter(branch); 
	console.info('fn_station: Active flag.');
	if (station >= lineinfo.limit) {
		console.error("Fn_station: Station not valid for this branch."); 
		return false; 
	}; 
	dataConverter(parseInt(branch)); 
	imgFooter(parseInt(branch)); 
	$('#station-data #data_station h1').html('Estación ' + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre); 
	fav_name = ""; 
	fav_dir = ""; 
	if (JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].shortname === undefined) {
		fav_name = "Estación " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
	} else {
		fav_name = "Estación " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].shortname; 
	};
	console.log(branch); 
	if (lineinfo.desc) {
		if (JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].shortname === undefined) {
			fav_dir = "A " + JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].estacion; 
		} else {
			fav_dir = "A " + JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].shortname; 
		};
	} else {
		if (JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].shortname === undefined) {
			fav_dir = "A " + JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].estacion; 
		} else {
			fav_dir = "A " + JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].shortname; 
		};
	}
	for (var i = 0; i < config.favourite.length; i++) {
		if (config.favourite[i].param1 !== branch) {
			if (config.favourite[i].param2 !== station) {
				$("#nav-fav").show();
				$("#nav-fav a").attr('onClick', 'addfavourite("stat", station.direction, station.station, "' + fav_name + '", "' + "Línea " + JSONstations[lineinfo.id].linea + ' - ' + fav_dir + '")');
			}
		}
	}
	if ((branch > 0) && (station > 0)) {
		var st_attempts; 
		if (config.viewdataused === "show") {
			$('#status-data').removeClass('hidden'); 
		} else if (config.viewdataused === "hide") {
			$('#status-data').addClass('hidden'); 
		};
		//$.get("php/station.php?branch="+branch+"&station="+station, function(json, status, xhr){
		$.get("http://sum1.lantalkswebmedia.xyz:8082/proximo-tren/station.php?branch="+branch+"&station="+station, function(json, status, xhr){

		}).error(function() {
			st_attempts++; 
			if (st_attempts < 10) {
				fn_station(branch, station); 
			} else{
				if (window.navigator.onLine) {
					icon = "&#xE2C1;"; 
					titleerror = "Ocurrió un error con el servidor :( "; 
					stringerror = "Eso sí, hay una buena noticia: aún tenés internet. :)"; 
					if (flag) {
						$('#status-online').show()
										   .removeClass('alert-success').removeClass('alert-warning') 
										   .html('<strong><i class="material-icons">' + icon + '</i></strong> ' + titleerror + "<br/>" + stringerror).addClass('alert-danger'); 
						console.error("Fn_station: Maybe happened an 500 internal server error."); 
					} else {
						$("#md-error").show(); 
						$("#md-error .modal-header h4.modal-title").html(titleerror); 
						$("#md-error .modal-body p").html(stringerror); 
						$("#md-error .modal-footer").html('<button type=button class="btn btn-secondary" data-dismiss="modal" onClick="loadSection(\'selector\')">Volver al selector</button>');
						return false; 
					}
				} else {
					icon = "&#xE2C1;"; 
					titleerror = "No tenés conexión a Internet. "; 
					stringerror = "Por favor reintentá de nuevo cuando encuentres mejor señal o conexión WiFi."; 
					if (flag) {
						$('#status-online').show()
										   .removeClass('alert-success').removeClass('alert-warning') 
										   .html('<strong><i class="material-icons">' + icon + '</i></strong> ' + titleerror + "<br/>" + stringerror).addClass('alert-danger'); 
						console.error("Fn_station: You're offline."); 
					} else {
						$("#md-error").show(); 
						$("#md-error .modal-header h4.modal-title").html(titleerror); 
						$("#md-error .modal-body p").html(stringerror); 
						$("#md-error .modal-footer").html('<button type=button class="btn btn-secondary" data-dismiss="modal" onClick="loadSection(\'selector\')">Volver al selector</button>');
						return false; 
					}
					//$('#status-online').show()
					//				   .removeClass('alert-success').removeClass('alert-warning') 
					//				   .html('<strong><i class="material-icons">&#xE2C1;</i></strong>  ').addClass('alert-danger'); 
				}
			}
		}).success(function(data, status, xhr) {
			// Data used
			thisdata = xhr.getResponseHeader('Content-Length'); 
			if (thisdata !== undefined) {
				datausedorig.station = datausedorig.station + parseInt(thisdata);
				dataused.station = sizeconverter(datausedorig.station); 
			};
			// Hides loading modal 
			$('#loading-section').modal('hide'); 

			console.log(data[0]); 
			if (data[0] == "<") {
				$('#error-noapache').modal('show');
				clearInterval(interval); 
				return false; 
			} else if (data[0] == undefined) {
				icon = "&#xE2C1;"; 
				titleerror = "Ocurrió un error al intentar obtener los datos. "; 
				stringerror = "Probablemente tengas que revisar la conexión a Internet o, en caso de estar en una red WiFi, loguearte en la misma. "; 
				if (flag) {
					$('#status-online').show()
									   .removeClass('alert-success').removeClass('alert-warning') 
									   .html('<strong><i class="material-icons">' + icon + '</i></strong> ' + titleerror + "<br/>" + stringerror).addClass('alert-danger'); 
					console.error("Fn_station: Undefined value. Maybe you're offline or you must log in into the network."); 
				} else {
					$("#md-error").modal('show'); 
					$("#md-error .modal-header h4.modal-title").html(titleerror); 
					$("#md-error .modal-body p").html(stringerror); 
					$("#md-error .modal-footer").html('<button type=button class="btn btn-secondary" data-dismiss="modal" onClick="loadSection(\'selector\')">Volver al selector</button>');
					return false; 
				}
				//$('#status-online').show()
				//				   .removeClass('alert-success').removeClass('alert-warning') 
				//				   .html('<strong><i class="material-icons">&#xE2C1;</i></strong>  ').addClass('alert-danger'); 
				//return false; 
			}
			// if (data === "incorrect key") {
				//$('#status-online').show()
				//				   .removeClass('alert-success').removeClass('alert-warning')
				//				   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> Estación incorrecta. Esto es un error de programación. Mala mía. :(').addClass('alert-danger'); 
			//} 
			//else 
			if (data === "wait") {
				$('#status-online').show()
								   .removeClass('alert-success').removeClass('alert-danger')
								   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> Pausa desde el servidor de SOFSE. ').addClass('alert-warning'); 
				console.info('Fn_station: "wait" from SOFSE server.'); 
				fn_station(branch, station); 
			} else {
				flag = true; 
				getHourData(); 
				$('#status-online').hide();
				//$('#status-data').show(); 
				$('#status-data #date').text(lastUpdate.date); 
				$('#status-data #time').text(lastUpdate.time); 
				$('#status-data #data').text(dataused.station); 
				$('.main-container').removeClass('hidden'); 

				st = [{}, {}, {}]; 
				st_data = eval("("+data+")");
				// First
				st[0].time = st_data.items['demora_formacion_1']; 
				st[0].local = st_data.items['local_1']; 
				st[0].type = st_data.items['formacion_tipo_servicio_1']; 
				st[0].stops = st_data.items['estaciones_1']; 
				st[0].to = st_data.items['estacion_hasta_1']; 
				// Second
				st[1].time = st_data.items['demora_formacion_2']; 
				st[1].local = st_data.items['local_2']; 
				st[1].type = st_data.items['formacion_tipo_servicio_2']; 
				st[1].stops = st_data.items['estaciones_2']; 
				// Third
				st[2].time = st_data.items['demora_formacion_3'];
				st[2].local = st_data.items['local_3'];
				st[2].type = st_data.items['formacion_tipo_servicio_3'];
				st[2].stops = st_data.items['estaciones_3']; 
				// Alerts 
				st["alert"] = st_data.items['alerta']; 

				st_notrains = 0; 

				console.log(st[0].to);
				console.log(stationParser(st[0].to, "station"));

				for (var i = 0; i < st.length; i++) {
					if (i === 0) {target = "#first"} 
					else if (i === 1) {target = "#second"} 
					else if (i === 2) {target = "#third"}; 
					// Has trains? 
					if (st[i].time >= 0) {
						$("#no-services").hide(); 
						$(target).show(); 
						// Time remaining 
						if (st[i].time > 0) {
							$(target + " .card").removeClass("arrived"); 
							if (st[i].time > 120) {remaining = moment.duration(parseInt(st[i].time), "minutes").format("h [hora] m [min]");}
							else if (st[i].time == 120) {remaining = "2 horas"}
							else if (st[i].time > 60) {remaining = moment.duration(parseInt(st[i].time), "minutes").format("h [hora] m [min]");}
							else if (st[i].time == 60) {remaining = "1 hora"}
							else if (st[i].time > 1) {remaining = st[i].time + " minutos"}
							else if (st[i].time == 1) {remaining = "1 minuto"}
						} else {
							if (i === 0) {
								$(target + " .card").addClass("arrived"); 
								remaining = stationParser(st[0].to, "station"); 
							} else {
								$(target + " .card").addClass("arrived"); 
								remaining = "En andén"; 
							};
						};
						// Heading
						if (i === 0) {
							if (st[0].time > 0) {
								destiny = "El próximo hacia " + stationParser(st[0].to, "station") + " llega en"; 
							} else {
								destiny = "La formación está en andén. Finaliza en:"; 
							};
						} else if (i === 1) {
							destiny = "El siguiente viene en"; 
						} else if (i === 2) {
							destiny = "Y el sub-siguiente en"
						}; 
						// Type of service 
						if (st[i].type === "N") {
							typestring = "Servicio normal"; 
							typeclass = ""; 
							type = false; 
							if (i === 0) {
								st_stops_check = ""; 
								st_stops = ""; 
							}
						} else {
							type = true; 
							if (st[i].type === "R") {
								typestring = "Rápido"; 
								typeclass = "rapid"; 
							} else if (st[i].type === "E") {
								typestring = "Especial"; 
								typeclass = "special"; 
							} else if (st[i].type === "S") {
								typestring = "S-rápido"; 
								typeclass = "s-rapid"; 
							} else if (st[i].type === "A") {
								typestring = "Adicional"; 
								typeclass = "additional"; 
							} else if (st[i].type === "L") {
								typestring = "Local"; 
								typeclass = "local"; 
							}; 
						};

						// Let's parse everything! 
						//console.log(i + ": " + destiny + " " + remaining); 
						$('#first .card-block').attr('onClick', 'loadSection("tracking");fn_tracking('+branch+', '+station+', "from_st");'); 
						if (i === 3) {
							$("#second").addClass("col-md-6").removeClass("col-md-12");  
							$("#third").addClass("col-md-6").removeClass("col-md-12");  
						}
						$(target + " .card-block .destiny").html(destiny); 
						$(target + " .card-block .remaining").html(remaining); 
						if (type) {
							$(target + " .card-footer").show(); 
							$(target + " .card-footer .type").removeClass('special').removeClass('s-rapid').removeClass('rapid').addClass(typeclass);
							$(target + " .card-footer .type p .string").text(typestring);
						} else {
							$(target + " .card-footer").hide(); 
						};

					} else {
						if (i === 2) {
							$("#second").removeClass("col-md-6").addClass("col-md-12"); 
							$("#third").removeClass("col-md-6").addClass("col-md-12"); 
							//console.log("#2: None.");
						}
						else if (i === 3) {
							$("#second").removeClass("col-md-6").addClass("col-md-12"); 
							$("#third").removeClass("col-md-6").addClass("col-md-12"); 
							//console.log("#3: None.");
						};
						$(target).hide(); 
						st_notrains++; 
						if (st_notrains === 3) {
							console.error("Fn_station: No trains."); 
							$("#no-services").show(); 
						} else {
							$("#no-services").hide(); 
						}
					};
				}; 
				if (st[0].stops != st_stops_check) {
					var spaces = '';
					for (n = 0; n < 75; n++) {spaces+='&nbsp;'}
					$('#first .card-footer .stations p').html(spaces + stationParser(st[0].stops, "marquee"));
					//console.log('Fn_station: Start station marquee.'); 
					$('#first .card-footer .stations p').marquee({
						speed: 3500, gap: 3800, 
						delayBeforeStart: 0, direction: 'left'
					});
					st_stops_check = st[0].stops; 
				};
				if (st["alert"].mensaje !== "") {
					//console.log(stationParser(st["alert"].mensaje, "marquee")); 
					spaces = ""; 
					for (n = 0; n < 100; n++) {
						spaces += '&nbsp;'
					}
					if (st["alert"].mensaje != st_alert_check) {
						$('#alert-bar').show(); 
						$('#alert-bar h1').html(spaces + stationParser(st["alert"].mensaje, "marquee")); 
						console.log('Fn_station: Start alert marquee.'); 
						$('#alert-bar h1').marquee({
							speed: 5000, gap: 3800, 
							delayBeforeStart: 0, direction: 'left'
						});
						st_alert_check = st["alert"].mensaje; 
					};
				} else {
						$('#alert-bar').hide(); 
						$('#alert-bar h1').html(""); 
				}
			};
		});
	} else {
		console.error("Fn_station: The branch and station must be more than 0."); 
	}; 
}; 