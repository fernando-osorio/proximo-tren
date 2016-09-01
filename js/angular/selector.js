angular.module('proximo-tren').controller('home', ['$scope', 'fact_railways', function ($scope, fact_railways) {
	console.log('Default'); 
	//$scope.agregar = function(){};
	$scope.numline = undefined; 
	$scope.numbranch = undefined; 
	$scope.numstation = undefined; 
	$scope.toggledLine = false; 
	$scope.selectedBranch = false; 
	$scope.selectedStation = false; 

	$scope.test = "Test"; 
	$scope.JSONdata = []; 
	fact_railways.railways(function(data) {
		$scope.JSONdata = data;
	});

	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	} else {
	    alert("Geolocation is not supported by this browser.");
	}
	function showPosition(position) {
	    alert("Latitude: " + position.coords.latitude +
	    " | Longitude: " + position.coords.longitude);
	}
	//-34.5812368,-58.5184446,17 

	$scope.unselectLine = function() {
		$scope.toggledLine = false;
		$scope.selected = null; 
	}
	$scope.unselectBranch = function() {
		$scope.selectedBranch = false;
	}

	$scope.selectLine = function (line) {
		console.log(line); 
		$scope.selectedLine = line; 
		$scope.JSONbranches = $scope.JSONdata[line].branch; 
		if ($scope.JSONdata[line].branch[0].name === "unique") {
			$scope.toggledLine = false;
			$scope.selectedBranch = true;
			$scope.selectBranch(0); 
		} else {
			$scope.toggledLine = true;
			$scope.selectedBranch = false;
		}
	}
	$scope.selectBranch = function (branch) {
		console.log(branch); 
		$scope.selectedBranch = branch; 
		$scope.JSONstations = $scope.JSONbranches[branch].station; 
		$scope.selectedBranch = true; 
	}
	$scope.selectStation = function (station) {
		console.log(station); 
		$scope.selectedStation = true; 
		$("#md-station").modal("show"); 
		console.log($scope.JSONstations); 
		if ($scope.JSONstations.platform !== undefined) {
			$scope.JSONstationdata = $scope.JSONstations.platform; 
		} else {
			$scope.JSONstationdata = $scope.JSONbranches.direction; 
		}
	}
}])