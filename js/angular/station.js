angular.module('proximo-tren').controller('station', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
	console.log($routeParams.branch); 
	console.log($routeParams.station); 
	$http({
		method : "GET",
		url : "http://sum1.lantalkswebmedia.xyz:8082/proximo-tren/station.php?branch="+$routeParams.branch+"&station="+$routeParams.station
	}).then(function mySucces(response) {
		$scope.train01 = true; 
		$scope.train02 = true; 
		$scope.train03 = true; 
		$scope.train01_status = ""; 
		$scope.train03_status = ""; 
		$scope.train03_status = ""; 
		$scope.train01_hasstations = false; 
		$scope.no_trains = false; 

		$scope.myWelcome = response.data;

		if (response.data !== undefined) {
			if (response.data.items.demora_formacion_1 !== undefined) {
				if(parseInt(response.data.items.demora_formacion_1) === 0){
					$scope.train01_destiny = "La formación está en andén. Finaliza en:"; 
					$scope.train01_time = stationParser(response.data.items.estacion_hasta_1, "station"); 
					$scope.train01_status = "arrived"; 
				} else if(parseInt(response.data.items.demora_formacion_1) === 1){
					$scope.train01_destiny = "El próximo hacia " + stationParser(response.data.items.estacion_hasta_1, "station") + " llega en"; 
					$scope.train01_time = "1 minuto"; 
				} else if (parseInt(response.data.items.demora_formacion_1) < 0) {
					$scope.train01_destiny = ""; 
					$scope.train01_time = "No hay próximo servicio"; 
					$scope.train01 = false; 
				} else if (parseInt(response.data.items.demora_formacion_1) > 1) {
					$scope.train01_destiny = "El próximo hacia " + stationParser(response.data.items.estacion_hasta_1, "station") + " llega en"; 
					$scope.train01_time = response.data.items.demora_formacion_1 + " minutos"; 
				}; 
				console.log(response.data.items.estaciones_1); 
				if ((response.data.items.estaciones_1 === undefined) || (response.data.items.estaciones_1 === "-")) {
					$scope.train01_hasstations = false; 
				} else {
					var spaces = ""; 
					for (n = 0; n < 75; n++) {spaces+='&nbsp;'}
					$scope.train_01_stations = (spaces + stationParser(response.data.items.estaciones_1, "marquee"));
					$('#first .card-footer .stations p').marquee({
						speed: 3500, gap: 3800, 
						delayBeforeStart: 0, direction: 'left'
					});
					$scope.train01_hasstations = true; 
					if (response.data.items.formacion_tipo_servicio_1 === "N") {
						$scope.train01_type = "Normal"; 
					} else if (response.data.items.formacion_tipo_servicio_1 === "S") {
						$scope.train01_type = "Semirrapido"; 
					} else if (response.data.items.formacion_tipo_servicio_1 === "R") {
						$scope.train01_type = "Rápido"; 
					} else if (response.data.items.formacion_tipo_servicio_1 === "E") {
						$scope.train01_type = "Especial"; 
					} else if (response.data.items.formacion_tipo_servicio_1 === "L") {
						$scope.train01_type = "Local"; 
					}
				}
			} else {
				$scope.train01 = false; 
			}
			
			if (response.data.items.demora_formacion_2 !== undefined) {
				if(parseInt(response.data.items.demora_formacion_2) === 0){
					$scope.train02_destiny = "La formación está en andén."; 
					$scope.train02_time = "En andén"; 
					$scope.train02_status = "arrived"; 
				} else if(parseInt(response.data.items.demora_formacion_2) === 1){
					$scope.train02_destiny = "El siguiente llega en"; 
					$scope.train02_time = "1 minuto"; 
				} else if (parseInt(response.data.items.demora_formacion_2) < 0) {
					$scope.train02_destiny = ""; 
					$scope.train02_time = "No hay próximo servicio"; 
					$scope.train02 = false; 
				} else if (parseInt(response.data.items.demora_formacion_2) > 1) {
					$scope.train02_destiny = "El siguiente llega en"; 
					$scope.train02_time = response.data.items.demora_formacion_2 + " minutos"; 
				}
			} else {
				$scope.train02 = false; 
			}

			if (response.data.items.demora_formacion_3 !== undefined) {
				if(parseInt(response.data.items.demora_formacion_3) === 0){
					$scope.train03_destiny = "La formación está en andén."; 
					$scope.train03_time = "En andén"; 
				} else if(parseInt(response.data.items.demora_formacion_3) === 1){
					$scope.train03_destiny = "El sub-siguiente llega en"; 
					$scope.train03_time = "1 minuto"; 
				} else if (parseInt(response.data.items.demora_formacion_3) < 0) {
					$scope.train03_destiny = ""; 
					$scope.train03_time = "No hay próximo servicio"; 
					$scope.train03 = false; 
				} else if (parseInt(response.data.items.demora_formacion_3) > 1) {
					$scope.train03_destiny = "El sub-siguiente llega en"; 
					$scope.train03_time = response.data.items.demora_formacion_3 + " minutos"; 
				}
			} else {
				$scope.train03 = false; 
			}

			if ((($scope.train01 === false) && ($scope.train02 === false)) && ($scope.train03 === false)) {
				$scope.no_trains = true; 
			}
		} else {
			$scope.error = true; 
		}

		console.log(response.data.items.demora_formacion_1); 
		console.log(response.data); 
	}, function myError(response) {
		$scope.myWelcome = response.statusText;
		console.log(response.statusText); 
	});
}])