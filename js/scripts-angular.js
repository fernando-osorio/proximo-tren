var app = angular.module('proximo-tren', ['ngRoute', 'ngSanitize', 'angularMoment']);
var token = ""; 
var JSONstations = undefined; 

if (navigator.geolocation) {
	// do fancy stuff
	console.info("Geolocation enabled. This webapp can locate your closest station."); 
	getLocation(); 
}

function getLocation() {
   var geolocation = navigator.geolocation;
   alert(geolocation.getCurrentPosition(showLocation, errorHandler, {maximumAge: 75000}));
}

function showLocation( position ) {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
}
function errorHandler( err ) {
   if (err.code == 1) {
      // access is denied
   }
}

app
	//.run(function(amMoment) {
	//	amMoment.changeLocale('es');
	//})
	.config(function($routeProvider){
		$routeProvider
		.when('/',{ 
			templateUrl:'views/home.html',
			controller: 'home'
		})
		.when('/station',{ 
			redirectTo: '/'
		})
		.when('/station/:branch/:station',{ 
			templateUrl:'views/station.html',
			controller: 'station'
		})
		.when('/tracker/:branch/:station',{ 
			templateUrl:'views/tracker.html',
			controller: 'tracker'
		})
		.when('/terminal/:line/:station',{ 
			templateUrl:'views/terminal.html',
			controller: 'terminal'
		})
		.when('/platform/:branch/:station',{ 
			templateUrl:'views/station.html',
			controller: 'platform'
		})
		.when('/about',{ 
			templateUrl:'views/about.html'
		})
		//.when('/404',{ 
		//	templateUrl:'views/404.html' 
		//})
		.otherwise({
			//redirectTo: '/404'
			redirectTo: '/'
		});
	})

	.controller('home', ['$scope', 'fact_railways', function ($scope, fact_railways) {
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

	.controller('line', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
		var randomresult = undefined; 
		var onlyone = 0; 
		$scope.station = $routeParams.station; 
		$http.get('data/linea'+$routeParams.line+'.csv').success(function(allText, status, headers){
		});
	}])

	.factory('fact_railways', ['$http', function($http) {
		return {
			railways: function(callback) {
				$http.get('data/stations.json').success(function(data){
					callback(data);
				});
			}
		};
	}])

	.controller('railways', ['$scope', 'fact_railways', function ($scope, fact_railways) {
		$scope.test = "Test"; 
		$scope.JSONlines = []; 
		fact_railways.railways(function(data) {
			$scope.JSONlines = data;
		});
	}]); 