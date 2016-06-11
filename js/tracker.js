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
	branch = branchnormalizer(parseInt(branch));
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
	$.get("php/tracker.php?branch="+branch, function(json, status, xhr){
	}).error(function() {
		$('#status-online').show()
						   .removeClass('alert-success').removeClass('alert-warning') 
						   .html('<strong><i class="material-icons">&#xE2C1;</i></strong> No tenés conexión a Internet. Por favor reintentá de nuevo cuando encuentres mejor señal o conexión WiFi.').addClass('alert-danger'); 
		console.error('Tracking: No connection. Retrying... '); 
	}).success(function(data, status, xhr) {
		thisdata = xhr.getResponseHeader('Content-Length'); 
		datausedorig.tracking = datausedorig.tracking + parseInt(thisdata);
		dataused.tracking = sizeconverter(datausedorig.tracking); 
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
		if (data_tracker.intermedias[station-2].min_1 >= 0) {
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
				} else {formation = "Formación " + data_tracker.intermedias[station-2].chapa_1}
			}
			if (branch === 31) {
				//dataTrain = "Finaliza en [destino]  | Servicio N°" + data_tracker.intermedias[station-2].tren_1 + " | Locomotora B" + data_tracker.intermedias[station-2].chapa_1; 
				dataTrain = service + " | " + formation; 
			} else {
				//dataTrain = "Finaliza en [destino] | Formación " + data_tracker.intermedias[station-2].chapa_1; 
				dataTrain = service + " | " + formation; 
			}; 
			if (data_tracker.intermedias[station-2].min_1 > 0) {
				mainline = "Próxima estación: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
				if (data_tracker.intermedias[station-2].min_1 == 60) {
					secondline = "Llegando en 1 hora."; 
				} else if (data_tracker.intermedias[station-2].min_1 > 1) {
					secondline = "Llegando en " + data_tracker.intermedias[station-2].min_1 + " minutos."; 
				} else if (data_tracker.intermedias[station-2].min_1 == 1) {
					secondline = "Llegando en 1 minuto."; 
				}
			}
			else if (data_tracker.intermedias[station-2].min_1 == 0) {
				mainline = "Estás en " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station - 1].nombre; 
				secondline = "Próxima: " + JSONstations[lineinfo.id].ramales[lineinfo.branch].estacion[station].nombre + " | El tren de atrás vendrá en " + data_tracker.intermedias[station-2].min_2 + " minutos."; 
			};
			$("#now p.destiny").text(dataTrain); 
			$("#now p.now").text(mainline); 
			$("#now p.remaining").text(secondline); 
		}
	});
}