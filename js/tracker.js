var fn_tracking_soon = function(branch, station){
	$('#soon').modal('show');
};

var fn_tracking = function(branch, station, method) {
	inverse = false;
	console.log("fn_tracking: "+branch); 
	var branchnormalizer = function(brnch) {
		if (brnch === 1) {return 1;} 								// Sarmiento:   Plaza Once-Moreno
		else if (brnch === 2) {inverse = true; return 1;} 			// 				Moreno-Plaza Once
		else if ((brnch === 5) || (brnch === 6)) {return 5;} 		// Mitre: Retiro-Tigre 
		else if ((brnch === 7) || (brnch === 8)) {return 7;} 		// Mitre: Retiro-Bartolomé Mitre
		else if ((brnch === 9) || (brnch === 10)) {return 9;} 		// Mitre: Retiro-José León Suárez 
		else if ((brnch === 11) || (brnch === 12)) {return 11;} 	// Roca: Plaza Constitución-La Plata 
		else if (brnch === 31) {return 31;} 						// San Martín: 	Retiro-Dr. Cabred
		else if (brnch === 32) {inverse = true; return 31;} 		// 				Dr. Cabred-Retiro 
		else if ((brnch === 41) || (brnch === 42)) {return 41;} 	// Tren de la Costa 
		else if ((brnch === 51) || (brnch === 52)) {return 51;} 	// Sarmiento: Moreno-Mercedes 
		else if ((brnch === 53) || (brnch === 54)) {return 53;} 	// Sarmiento: Merlo-Lobos 
		else {return undefined;} 
	}
	console.info('Tracking: Active flag. ');
	console.log(branch); 
	if (branch === undefined) {
		$('#loading-section').modal('hide');
		clearInterval(interval); 
		console.error("Tracking: Branch not supported officialy by the API. :( \n\
Supported branches: \n\
- Sarmiento: \n\
-- Once-Moreno: 1, 2 \n\
-- Moreno-Mercedes: 51, 52 \n\
-- Merlo-Lobos: 53, 54. \n\
- Mitre:  \n\
-- Retiro-Mitre: 5, 6\n\
-- Retiro-Bartolomé Mitre: 7, 8\n\
-- Retiro-José León Suárez: 9, 10\n\
- Roca (Only Constitución-La Plata): 31, 32\n\
- San Martín: 31, 32\n\
- Tren de la Costa: 41, 42 "); 
		$('#tr-notsupported').modal('show');
		if (method === undefined) {
			loadSection('selector'); 
		} else if (method === "from_st") {
			loadSection('station'); 
		};
		return false; 
	}
	dataConverter(parseInt(branch)); 
	imgFooter(parseInt(branch)); 
	var tr_dir; 
	if (inverse) {
		if (JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].shortname === undefined) {
			tr_dir = JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].estacion; 
		} else {
			tr_dir = JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[0].shortname; 
		};
	} else {
		if (JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].shortname === undefined) {
			tr_dir = JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].estacion; 
		} else {
			tr_dir = JSONstations[lineinfo.id].ramales[lineinfo.branch].sentido[1].shortname; 
		};
	}; 
	$("#station-data #data_direction h1").text("Sentido a "+tr_dir); 
	$.get("php/tracker.php?branch="+branchnormalizer(parseInt(branch)), function(json, status, xhr){
	}).error(function() {
		$('#status-online').show()
						   .removeClass('alert-success').removeClass('alert-warning') 
						   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> No tenés conexión a Internet. Por favor reintentá de nuevo cuando encuentres mejor señal o conexión WiFi.').addClass('alert-danger'); 
		console.error('Tracking: No connection. Retrying... '); 
	}).success(function(data, status, xhr) {
		thisdata = xhr.getResponseHeader('Content-Length'); 
		console.log(datausedorig.tracking); 
		if (datausedorig.tracking === undefined) {
			datausedorig.tracking = 0; 
		}; 
		if (thisdata !== undefined) {
			datausedorig.tracking = datausedorig.tracking + parseInt(thisdata);
			dataused.tracking = sizeconverter(datausedorig.tracking); 
		} else {
			datausedorig.tracking = datausedorig.tracking + 0; 
		};
		console.log(thisdata); 
		console.log(datausedorig.tracking); 
		$('#loading-section').modal('hide');
		if (data[0] == "<") {
			$('#error-noapache').modal('show');
			clearInterval(interval); 
			return false; 
		}
		getHourData(); 
		$('#status-online').hide();
		$('#status-data').show(); 
		$('#status-data #date').text(lastUpdate.date); 
		$('#status-data #time').text(lastUpdate.time); 
		$('#status-data #data').text(dataused.tracking); 
		$('.main-container').removeClass('hidden'); 
		data_tracker = eval("("+data+")");
		//console.log(data_tracker.salidas); 
		if (data_tracker.salidas !== undefined) {
			//console.log(data_tracker.salidas[1].estado); 
		} else {console.info("Tracker: Terminal doesn't have any data.")}
		//console.log(data_tracker.intermedias); 
		$(".main-tracker #no-services").addClass("hidden"); 
		$(".main-tracker #now").removeClass("hidden"); 
		if (inverse) {
			console.log(station); 
			if (station < JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length) {
				if (station >= 2) {
					if (data_tracker.intermedias[station-2].min_4 >= 0) {
						$('#tr-start').addClass('hidden');
						$('#tr-stop').removeClass('hidden');
						$('#tr-finish').addClass('hidden'); 
						tracker.data.train = data_tracker.intermedias[station-2].chapa_4; 
						if ((tracker.back.train !== tracker.data.train)) {
							console.log("Different train"); 
							tracker.back.train = tracker.data.train; 
							if (flag) {
								if (inverse) {
									clearInterval(interval); 
									interval = setInterval(function() {fn_tracking(branch, station-1)}, parseInt(config.frequency)); 
									return false; 
								} else {
									interval = setInterval(function() {fn_tracking(branch, station+1)}, parseInt(config.frequency)); 
									return false; 
								}
							}
						} else {
							console.log("Same train"); 
						}; 

						if (data_tracker.intermedias[station-2].tren_4 === "-1") {
							service = "Servicio desconocido";
						} else {
							service = "Servicio N°" + data_tracker.intermedias[station-2].tren_4; 
						}; 
						if (data_tracker.intermedias[station-2].chapa_4 === "-1") {
							if (branch === 32) {
								formation = "Locomotora no especificada"; 
							} else {formation = "Formación no especificada"}
						} else {
							if (branch === 32) {
								formation = "Locomotora B" + data_tracker.intermedias[station-2].chapa_4; 
							} else if ((branch === 52) || (branch === 54)) {
								formation = "Locomotora " + data_tracker.intermedias[station-2].chapa_4; 
							} else {formation = "Formación " + data_tracker.intermedias[station-2].chapa_4}
						}; 

						if (data_tracker.intermedias[station-2].min_4 > 0) {
							mainline = "Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
							if (data_tracker.intermedias[station-2].min_4 == 60) {
								secondline = "Llegando en 1 hora."; 
							} else if (data_tracker.intermedias[station-2].min_4 > 1) {
								secondline = "Llegando en " + data_tracker.intermedias[station-2].min_4 + " minutos."; 
							} else if (data_tracker.intermedias[station-2].min_4 == 1) {
								secondline = "Llegando en 1 minuto."; 
							}; 
						}
						else if (data_tracker.intermedias[station-2].min_4 == 0) {
							mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
							if (data_tracker.intermedias[station-2].min_2 < 0) {
								secondline = "Próxima: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 2].nombre + " | Probablemente este tren sea el último del día. "; 
							} else {
								secondline = "Próxima: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 2].nombre + " | El tren de atrás vendrá en " + data_tracker.intermedias[station-2].min_5 + " minutos."; 
							}; 
						}; 
						dataTrain = service + " | " + formation; 	
						$("#now p.destiny").text(dataTrain); 
						$("#now p.now").text(mainline); 
						$("#now p.remaining").text(secondline); 
						flag = true;
					} else {
						icon = "&#xE2C1;"; 
						titleerror = "No hay servicios disponibles. "; 
						stringerror = "Probablemente haya pasado el último del día."; 
						if (flag) {
							$(".main-tracker #no-services").removeClass("hidden"); 
							$(".main-tracker #now").addClass("hidden"); 
						} else {
							$("#md-error").show(); 
							$("#md-error .modal-header h4.modal-title").html(titleerror); 
							$("#md-error .modal-body p").html(stringerror); 
							$("#md-error .modal-footer").html('<button type=button class="btn btn-secondary" data-dismiss="modal" onClick="loadSection(\'selector\')">Volver al selector</button>');
							return false; 
						};
						console.error("fn_tracking: No trains available. "); 
					}
				} else {
					console.error("Error");
				};
			} else if (station === JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length) {
				$('#tr-start').removeClass('hidden');
				$('#tr-stop').addClass('hidden');
				$('#tr-finish').addClass('hidden'); 
				mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre;
				$("#now p.now").text(mainline); 
				$("#now p.remaining").text("Inicio del recorrido."); 
				var nextst = station - 1; 
				var commands = "window.location.hash = '#tracking&brnch:" + parseInt(branch) + "&stat:" + parseInt(nextst) +"';\
								fn_tracking("+parseInt(branch)+", " + parseInt(nextst) + ");\
								interval = setInterval(function() {fn_tracking("+parseInt(branch)+", " + parseInt(nextst) + ")}, parseInt("+config.frequency+"));";
				$("#tr-start").attr("onClick", commands); 
				clearInterval(interval); 
			} else if (station === 1) {
				mainline = "Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
				$("#now p.now").text(mainline); 
				$("#now p.remaining").text("Final del recorrido."); 
				return false; 
			} else if (station === 0) {
				mainline = "Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station].nombre; 
				$("#now p.now").text(mainline); 
				$("#now p.remaining").text("Final del recorrido."); 
				return false; 
			} else {
				clearInterval(interval); 
				fn_tracking(branch, JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length);
				window.location.hash = "#tracking&brnch:" + branch + "&stat:" + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length;
			}
		} else {
			if (station < JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length) {
				if (station >= 2) {
					if (data_tracker.intermedias[station-2].min_1 >= 0) {
						tracker.data.train = data_tracker.intermedias[station-2].chapa_1; 
						if (tracker.back.train !== tracker.data.train) {
							console.log("Different train"); 
							tracker.back.train = tracker.data.train; 
							if (flag) {
								clearInterval(interval); 
								if (inverse) {
									interval = setInterval(function() {fn_tracking(branch, station-1)}, parseInt(config.frequency)); 
									return false; 
								} else {
									interval = setInterval(function() {fn_tracking(branch, station+1)}, parseInt(config.frequency)); 
									return false; 
								}
							}
						} else {
							console.log("Same train"); 
						}; 

						if (data_tracker.intermedias[station-2].tren_1 === "-1") {
							service = "Servicio desconocido";
						} else {
							service = "Servicio N°" + data_tracker.intermedias[station-2].tren_1; 
						}; 
						if (data_tracker.intermedias[station-2].chapa_1 === "-1") {
							if (branch === 31) {
								formation = "Locomotora no especificada"; 
							} else {formation = "Formación no especificada"}
						} else {
							if (branch === 31) {
								formation = "Locomotora B" + data_tracker.intermedias[station-2].chapa_1; 
							} else if ((branch === 51) || (branch === 53)) {
								formation = "Locomotora " + data_tracker.intermedias[station-2].chapa_1; 
							} else {formation = "Formación " + data_tracker.intermedias[station-2].chapa_1}
						}; 
						if (station >= 2) {
							if (data_tracker.intermedias[station-2].min_1 > 0) {
								mainline = "Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
								if (data_tracker.intermedias[station-2].min_1 == 60) {
									secondline = "Llegando en 1 hora."; 
								} else if (data_tracker.intermedias[station-2].min_1 > 1) {
									secondline = "Llegando en " + data_tracker.intermedias[station-2].min_1 + " minutos."; 
								} else if (data_tracker.intermedias[station-2].min_1 == 1) {
									secondline = "Llegando en 1 minuto."; 
								}; 
							}
							else if (data_tracker.intermedias[station-2].min_1 == 0) {
								mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
								if (data_tracker.intermedias[station-2].min_2 < 0) {
									secondline = "Próxima: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station].nombre + " | Probablemente este tren sea el último del día. "; 
								} else {
									secondline = "Próxima: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station].nombre + " | El tren de atrás vendrá en " + data_tracker.intermedias[station-2].min_2 + " minutos."; 
								}; 
							}; 
						} else if (station === 1) {
							mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
							secondline = "Inicio del recorrido | Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station].nombre; 
							return false; 
						} else if (station === JSONstations[lineinfo.id].ramales[lineinfo.branch].length) {
							mainline = "Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
							secondline = "Final del recorrido."; 
						};
						dataTrain = service + " | " + formation; 	
						$("#now p.destiny").text(dataTrain); 
						$("#now p.now").text(mainline); 
						$("#now p.remaining").text(secondline); 
						flag = true;
					} else if (station === 1) {
						mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
						secondline = "Inicio del recorrido | Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station + 1].nombre; 
						$("#now p.now").text(mainline); 
						$("#now p.remaining").text(secondline); 
						return false; 
					};
				} else if (station === JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length) {
					$('#tr-start').removeClass('hidden');
					$('#tr-stop').addClass('hidden');
					$('#tr-finish').addClass('hidden'); 
					mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre;
					$("#now p.now").text(mainline); 
					$("#now p.remaining").text("Inicio del recorrido."); 
					var nextst = station - 1; 
					var commands = "window.location.hash = '#tracking&brnch:" + parseInt(branch) + "&stat:" + parseInt(nextst) +"';\
									fn_tracking("+parseInt(branch)+", " + parseInt(nextst) + ");\
									interval = setInterval(function() {fn_tracking("+parseInt(branch)+", " + parseInt(nextst) + ")}, parseInt("+config.frequency+"));";
					$("#tr-start").attr("onClick", commands); 
					clearInterval(interval); 
				} else {
					clearInterval(interval); 
					fn_tracking(branch, JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length);
					window.location.hash = "#tracking&brnch:" + branch + "&stat:" + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion.length;
				}
			} else {
				$(".main-tracker #no-services").removeClass("hidden"); 
				$(".main-tracker #now").addClass("hidden"); 
				console.error("fn_tracking: No trains available. "); 
			}
		};
	});
}