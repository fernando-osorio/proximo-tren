var app = angular.module('proximo-tren', ['ngRoute', 'ngSanitize', 'angularMoment', 'angular-marquee']);
var token = ""; 
var JSONstations = undefined; 

if (navigator.geolocation) {
	// do fancy stuff
	console.info("Geolocation enabled. This webapp can locate your closest station."); 
	getLocation(); 
}

function getLocation() {
   var geolocation = navigator.geolocation;
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