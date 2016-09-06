angular.module('proximo-tren').controller('home', ['$scope', 'fact_railways', function ($scope, fact_railways) {
	console.log('Default'); 
	//$scope.agregar = function(){};
	$scope.numline = undefined; 
	$scope.numbranch = undefined; 
	$scope.numstation = undefined; 
	$scope.toggledLine = false; 
	$scope.selectedBranch = false; 
	$scope.selectedStation = false; 

	var globalbranch = 0;

	$scope.test = "Test"; 
	$scope.JSONdata = []; 
	fact_railways.railways(function(data) {
		$scope.JSONdata = data;
	});

	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	} else {
	    console.error("Geolocation is not supported by this browser.");
	}
	function showPosition(position) {
	    console.info("Latitude: " + position.coords.latitude +
	    " | Longitude: " + position.coords.longitude);
	}
	//-34.5812368,-58.5184446,17 

	$scope.unselectLine = function() {
		$scope.toggledLine = false;
		$scope.selected = null; 
	}
	$scope.unselectBranch = function() {
		$scope.definedBranch = false; 
	}

	$scope.selectLine = function (line) {
		console.log(line); 
		$scope.selectedLine = line; 
		$scope.JSONbranches = $scope.JSONdata[line].branch; 
		if ($scope.JSONdata[line].branch[0].name === "unique") {
			$scope.toggledLine = false;
			$scope.selectedBranch = 0;
			$scope.selectBranch(0); 
		} else {
			$scope.toggledLine = true;
			$scope.selectedBranch = line;
			$scope.unselectBranch(); 
		}
		console.log($scope.selectedBranch); 
	}
	$scope.selectBranch = function (branch) {
		console.log(branch); 
		$scope.selectedBranch = branch; 
		$scope.JSONstations = $scope.JSONbranches[branch].station; 
		$scope.definedBranch = true; 
	}
	$scope.selectStation = function (station) {
		console.log(station); 
		$scope.selectedStation = true; 
		$scope.isstation = false; 
		$scope.isterminal = false; 
		$("#md-station").modal("show"); 
		console.log($scope.JSONstations[station-1]); 
		$scope.station = $scope.JSONstations[station-1]; 
		if ($scope.JSONstations[station-1].platform !== undefined) {
			$scope.isterminal = true; 
			$scope.JSONstationdata = $scope.JSONstations[station-1].platform; 
			if (station === 1) {
				$scope.terminalbranched = $scope.selectedBranch + 1; 
			} else {
				$scope.terminalbranched = $scope.selectedBranch + 2; 
			}
		} else if ($scope.JSONbranches[0].name === "unique") {
			$scope.isstation = true; 
			$scope.JSONstationdata = $scope.JSONbranches[0].direction; 
			$scope.directionDes = $scope.JSONbranches[0].direction[0]; 
			$scope.directionAsc = $scope.JSONbranches[0].direction[1]; 
		} else {
			$scope.isstation = true; 
			$scope.JSONstationdata = $scope.JSONbranches[$scope.selectedBranch].direction; 
			$scope.directionDes = $scope.JSONbranches[$scope.selectedBranch].direction[0]; 
			$scope.directionAsc = $scope.JSONbranches[$scope.selectedBranch].direction[1]; 
		}
	}
}])