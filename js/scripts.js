// Code written by Fermoto5HD. 

// Which container will the main content appear?
var maindiv = "main#main"; 
var mainsel = "main#selector"; 

// Loading & error screens 

var showLoading = '<div class="card card-status col-sm-12 bg-inverse">\
					<div class="card-block">\
						<i class="material-icons">&#xE2C0;</i>\
						<h1>Cargando...</h1>\
						<progress class="progress progress-striped progress-animated" value="100" max="100">Cargando...</progress>\
					</div>\
				</div>'; 

var showLoadingData = '<div class="card card-status col-sm-12 bg-inverse">\
					<div class="card-block">\
						<div class="col-xs-3"><i class="material-icons">&#xE2C0;</i></div>\
						<div class="col-xs-9">\
							<h1>Cargando información de los próximos trenes...</h1>\
						</div>\
						<div class="col-xs-12"><progress class="progress progress-striped progress-animated" value="100" max="100">Cargando...</progress></div>\
					</div>\
				</div>';

var showError = '<div class="card card-status col-sm-12 bg-inverse text-xs-left text-md-center">\
					<div class="card-block">\
						<i class="material-icons">&#xE2C0;</i>\
						<h1>Ocurrió un error al intentar mostrar esta sección. </h1>\
						<button class="btn btn-primary" id="tryagain">Reintentar</button>\
					</div>\
				</div>'; 

var showOffline = '<div class="card card-status col-sm-12 bg-inverse text-xs-left text-md-center">\
					<div class="card-block">\
						<i class="material-icons">&#xE2C1;</i>\
						<h1>No hay conexión a la base de datos.</h1>\
						<h2>Reintentando de nuevo...</h2>\
					</div>\
				</div>'; 

var showDatabaseError = '<div class="container text-xs-left text-md-center">\
				<div class="card card-status col-sm-12 bg-inverse">\
					<div class="card-block">\
						<i class="material-icons">&#xE2C1;</i>\
						<h1>No hay conexión a la base de datos.</h1>\
						<h2>Reintentando de nuevo...</h2>\
					</div>\
				</div>\
			</div>'; 

var showNoServices = '<div class="card card-status col-sm-12 bg-inverse text-xs-left text-md-center">\
					<div class="card-block">\
						<div class="col-xs-1 col-md-12"><i class="material-icons">&#xE533;</i></div>\
						<div class="col-xs-11 col-md-12">\
							<h1>No hay información de los próximos servicios.</h1>\
							<h2>Consultá la cartelera para más información.</h2>\
						</div>\
					</div>\
				</div>'; 

// Vars 
var template = [station = undefined, terminal = undefined, platform = undefined, tracking = undefined, selector = undefined, datastats = undefined]; 
var datausedorig = [station = 0, terminal = 0, platform = 0, tracking = 0]; 
var dataused = [station = 0, terminal = 0, platform = 0, tracking = 0]; 
var terminal = [station = undefined, defaultstation = undefined, direction = undefined, namestation = undefined]; 
var platform = [station = undefined, platform = undefined]; 
var station = [direction = undefined, station = undefined]; 
var tracker = [data = undefined, back = undefined]; 
	tracker.data = [dir = undefined, st = undefined, service = undefined, train = undefined]; 
	tracker.back = [dir = undefined, st = undefined, service = undefined, train = undefined]; 
var lineinfo = [id = undefined, branch = undefined, limit = undefined, desc = undefined]; 
var config = [brand = undefined, linebrands = undefined, font = undefined, viewdataused = undefined,  frequency = undefined, favourite = undefined]; 
var interval = undefined; 
var autoupdate = false; 
var internet = undefined; 
var lastUpdate = [date = 0, time = 0]; 
var flag = false;

var JSONstations; 

var adRunning = false; 

// From Fn_stations
var st_stops = ""; 
var st_stops_check = ""; 
var st_alert = ""; 
var st_alert_check = ""; 

// Loads config 
config.brand = localStorage.getItem("brand"); 
if (config.brand === null) {
	localStorage.setItem("brand", "TAOP"); 
	config.brand = localStorage.getItem("brand"); 
};
config.linebrands = localStorage.getItem("linebrands"); 
if (config.linebrands === null) {
	localStorage.setItem("linebrands", "lines"); 
	config.linebrands = localStorage.getItem("linebrands"); 
};
config.font = localStorage.getItem("font"); 
if (config.font === null) {
	localStorage.setItem("font", "gotham"); 
	config.font = localStorage.getItem("font");
};
config.viewdataused = localStorage.getItem("viewdataused"); 
if (config.viewdataused === null) {
	localStorage.setItem("viewdataused", "hide"); 
	config.viewdataused = localStorage.getItem("viewdataused");
};
config.frequency = localStorage.getItem("updfrequency"); 
if (config.frequency === null) {
	localStorage.setItem("updfrequency", "1000"); 
	config.frequency = localStorage.getItem("updfrequency"); 
};
config.favourite = JSON.parse(localStorage.getItem("favourite")); 
if (config.favourite === null) {
	localStorage.setItem("favourite", "[]"); 
	config.favourite = JSON.parse(localStorage.getItem("favourite")); 
};
var firsttime = localStorage.getItem("firsttime"); 

// Internet cheecker. 
var checkConnection = function(){
	if (window.navigator.onLine) {
		$('#no-connection').prop('hidden', 'true');
	} else {
		$('#no-connection').prop('hidden', ''); 
	};
}
 
$(window).load(function(){
	// Opens modal if first time.
	if (firsttime === null) {
		console.info('App: Starting for the first time. Welcome! :)'); 
		$('#first-time').modal('show');
		localStorage.setItem("firsttime", false); 
	};
	// Checks Internet connection. 
	internet = setInterval(checkConnection, 1000); 
}); 

$(document).ready(function(){
	appstart(); 

	$('#brands .btn-primary').on('click', function(){
		brand($(this).find('input').attr('id'))
	}); 
	$('#linebrands .btn-primary').on('click', function(){
		linebrands($(this).find('input').attr('id'))
	}); 
	$('#fonts .btn-primary').on('click', function(){
		font($(this).find('input').attr('id'))
	}); 
	$('#viewdataused .btn-primary').on('click', function(){
		viewdataused($(this).find('input').attr('id')); 
	}); 
	brand(config.brand); 
	linebrands(config.linebrands); 
	font(config.font); 
	viewdataused(config.viewdataused); 
	updatefreq(config.frequency); 
	
	var hash = window.location.hash.substr(1);
	
	$.getJSON( "data/stations.json", function(jsondata){
		JSONstations = jsondata; 
		if (hash !== "") {
			var hash_parts = hash.split("&");
			var hash_type = hash_parts[0]; 
			var hash_param1 = hash_parts[1].split(':'); 
			var hash_param2 = undefined; 
			if (hash_parts[2] !== undefined) {
				hash_param2 = hash_parts[2].split(':'); 
			}; 

			// if ((split1[0] === "ramal") && (split2[0] === "estacion")) {
			// 	var ramalURL = parseInt(split1[1]); 
			// 	var estacionURL = parseInt(split2[1]); 
			// 	selector = true; 
			// 	verifEstacion = true; 
			// 	proximoTren(ramalURL, estacionURL); 
			// 	setInterval(function() {proximoTren(ramalURL, estacionURL);}, 1500);
			// }
			// else if ((split1[0] === "estacion") && (split2[0] === "ramal")) {
			// 	var estacionURL = parseInt(split1[1]); 
			// 	var ramalURL = parseInt(split2[1]); 
			// 	selector = true; 
			// 	verifEstacion = true; 
			// 	proximoTren(ramalURL, estacionURL); 
			// 	setInterval(function() {proximoTren(ramalURL, estacionURL);}, 1500);
			// } 
			// else if ((split1[0] === "anden") && (split2[0] === "ramal")) {
			// 	var anden = parseInt(split1[1]); 
			// 	var ramal = parseInt(split2[1]); 
			// 	verifAnden = true; 
			// 	proximaSalida(); 
			// 	setInterval(function() {proximaSalida();}, 1500);
			// } 
			// else if ((split1[0] === "ramal") && (split2[0] === "anden") ) {
			// 	var ramal = parseInt(split1[1]); 
			// 	var anden = parseInt(split2[1]); 
			// 	verifAnden = true; 
			// 	proximaSalida(); 
			// 	setInterval(function() {proximaSalida();}, 1500);
			// } 
			// else{ 
			// 	var ramalURL = 0; 
			// 	var estacionURL = 0; 
			// 	var cartel = 0; 
			// };

			if (hash_type === "station") {
				console.log("App: Station"); 
				if ((hash_param1[0] === "brnch") && (hash_param2[0] === "stat")) {
					console.log(hash_param1[0]); 
					console.log(hash_param2[0]); 
					verifEstacion = true; 
					verifAnden = false; 
					verifTerminal = false; 
					console.log("Brnch:" + parseInt(hash_param1[1]) + " | Stat:" + parseInt(hash_param2[1])); 
					station.direction = hash_param1[1]; 
					station.station = hash_param2[1]; 
					loadSection("station");
				} else {
					console.error("App: Station params not defined. Correct use: #station&brnch:31&stat:5");
					$('#error-url').modal('show');
				}
			} else if (hash_type === "terminal") {
				console.log("App :Terminal"); 
				if ((hash_param1[0] === "line") && (hash_param1[1] === "mitre")) {
					console.log(hash_param1[0]); 
					verifEstacion = false; 
					verifAnden = false; 
					verifTerminal = true; 
					console.log("Line:" + hash_param1[1]);
					terminal.station = 5; 
					terminal.direction = 0; 
					terminal.defaultstation = "mitre"; 
					loadSection("terminal", "mitre");
				} else if ((hash_param1[0] === "line") && (hash_param2[0] === "term")) {
					console.log(hash_param1[0]); 
					console.log(hash_param2[0]); 
					verifEstacion = false; 
					verifAnden = false; 
					verifTerminal = true; 
					console.log("Line:" + parseInt(hash_param1[1]) + " | Term:" + parseInt(hash_param2[1]));
					terminal.station = hash_param1[1]; 
					terminal.direction = hash_param2[1]; 
					loadSection("terminal");
				} else {
					console.error("App: Terminal params not defined. Correct use: #terminal&line:31&term:(1 or 2)");
					$('#error-url').modal('show');
				}
			} else if (hash_type === "platform") {
				console.log("App: Platform"); 
				console.log(hash_param1[0]); 
				console.log(hash_param2[0]); 
				verifEstacion = false; 
				verifAnden = false; 
				verifTerminal = true; 
				if ((hash_param1[0] === "term") && (hash_param2[0] === "plat")) {
					console.log("term:" + parseInt(hash_param1[1]) + " | plat:" + parseInt(hash_param2[1])); 
					platform.station = hash_param1[1]; 
					platform.platform = hash_param2[1]; 
					loadSection("platform");
				} else {
					console.error("App: Platform params not defined. Correct use: #platform&ln:31&term:(1 or 2)");
					$('#error-url').modal('show');
				}
			} else if (hash_type === "tracking") {
				console.log("App: Tracking"); 
				console.log(hash_param1[0]); 
				console.log(hash_param2[0]); 
				if ((hash_param1[0] === "brnch") && (hash_param2[0] === "stat")) {
					console.log("brnch:" + parseInt(hash_param1[1]) + " | stat:" + parseInt(hash_param2[1])); 
					station.direction = parseInt(hash_param1[1]); 
					station.station = parseInt(hash_param2[1]); 
					loadSection("tracking");
				} else {
					console.error("App: Tracking params not defined. Correct use: #tracking&brnch:31&stat:(1 or 2)");
				}
			} else {
				console.error("App: No section. ")
			}

			//imgFooter(ramalURL); 
			selector = true; 
			paginaInicialVisible = false; 
		} else {
			selector = false; 
			paginaInicialVisible = true; 
			console.info('App: No hash via URL. Calling selector...'); 
			loadSection('selector');
			$('#btn-back').html('');
		};
	}).error(function(){
		console.error('App: Error with JSON'); 
	}); 
}); 

// Advertisements
var ad_data = [img = null, vid = null]; 
ad_data.img = "img/social-payment.jpg"; 
ad_data.vid = "../yns.mp4"; 

function fn_ads(ad, type) {
	if (ad === "play") {
		$("#advertisement").show(); 
		$("#main-services").addClass('col-lg-5').addClass('col-xl-4').addClass('ad-running'); 
		if (type === "img") {
			adRunning = true; 
			$('#second').removeClass('col-md-6').addClass('col-md-12'); 
			$('#third').removeClass('col-md-6').addClass('col-md-12'); 
			$("#advertisement .card .card-block").html('<img class="img-fluid" src="' + ad_data.img + '"/>'); 
			setTimeout('fn_ads(true, "img")', 20000);
		} else if (type === "vid") {
			adRunning = true; 
			$('#second').removeClass('col-md-6').addClass('col-md-12'); 
			$('#third').removeClass('col-md-6').addClass('col-md-12'); 
			//setTimeout('fn_ads(true, "' + type + '")',20000);
			var vid = "../yns.mp4"; 
			$("#advertisement .card .card-block").html('<div class="embed-responsive embed-responsive-16by9">\
															<video id="ad-vid" controls autoplay>\
																<source src="' + ad_data.vid + '" type="video/mp4">\
																Por favor usá un browser moderno para poder mostrar el video.\
															</video>\
														</div>'); 
			document.getElementById('ad-vid').addEventListener('ended',myHandler,false);
			function myHandler(e) {
				// What you want to do after the event
				setTimeout('fn_ads(false, "vid")', 1);
			}
		} else {
			$("#advertisement").hide(); 
		}
	} else if (ad === "start") {
		console.error('Fn_ads: Please use the "play" value. Thx!')
	} else if (ad === "stop") {
		adRunning = false; 
		$("#advertisement").hide(); 
		$('#second').addClass('col-md-6').removeClass('col-md-12'); 
		$('#third').addClass('col-md-6').removeClass('col-md-12'); 
		$("#main-services").removeClass('col-lg-5').removeClass('col-xl-4').removeClass('ad-running'); 
		$("#advertisement .card .card-block").html(''); 
		setTimeout('fn_ads(false, "' + type + '")', 1);
	} else if (ad) {
		if (type === "img") {
			adRunning = true; 
			$('#second').removeClass('col-md-6').addClass('col-md-12'); 
			$('#third').removeClass('col-md-6').addClass('col-md-12'); 
			$("#advertisement").show(); 
			$("#main-services").addClass('col-lg-5').addClass('col-xl-4').addClass('ad-running'); 
			setTimeout('fn_ads(false, "img")', 15000);
		} else if (type === "vid") {
			adRunning = true; 
			$('#second').removeClass('col-md-6').addClass('col-md-12'); 
			$('#third').removeClass('col-md-6').addClass('col-md-12'); 
			$("#advertisement").show(); 
			$("#main-services").addClass('col-lg-5').addClass('col-xl-4').addClass('ad-running'); 
			// Something here... 
		} else {console.error("Fn_ads: Incorrect type of content. Correct values: img or vid.")};
	} else if (ad === false) {
		if (type === "img") {
			adRunning = false; 
			$("#advertisement").hide(); 
			$('#second').addClass('col-md-6').removeClass('col-md-12'); 
			$('#third').addClass('col-md-6').removeClass('col-md-12'); 
			$("#main-services").removeClass('col-lg-5').removeClass('col-xl-4').removeClass('ad-running'); 
			setTimeout('fn_ads(false, "img")', 90000);
		} else if (type === "vid") {
			adRunning = false; 
			$("#advertisement").hide(); 
			$('#second').addClass('col-md-6').removeClass('col-md-12'); 
			$('#third').addClass('col-md-6').removeClass('col-md-12'); 
			$("#main-services").removeClass('col-lg-5').removeClass('col-xl-4').removeClass('ad-running'); 
			// Something here... 
		} else {console.error("Fn_ads: Incorrect type of content. Correct values: img or vid.")}; 
	} else {
		console.error('Fn_ads: Incorrect ad trigger. Start the ad with "play" and stop it obviously with "stop".')
	}
}

// Loads sections
var loadSection = function(section, method){
	clearInterval(interval); 
	console.info("loadSection: " + section); 
	if (section === "selector") {
		window.location.hash = "";
		$(mainsel).show(); 
		$(maindiv).hide(); 
		$("#nav-fav").hide();
		listfavourite(); 
		stationData(false); 
		var listarLineas= ""; 
		for (var i = 0; i < JSONstations.length; i++){
			listarLineas+= "<label class='btnlinea btn btn-default' id='"+JSONstations[i].id+"' onClick='step2("+JSONstations[i].id+")'>"+JSONstations[i].linea+"</label>";
		}
		$("#listaLineas").html(listarLineas);
		$('#btn-back').html('');
		step1();
		//return false;
	} else if (section === "datastats") {
		$(mainsel).hide(); 
		$(maindiv).show(); 
		stationData(false); 
		// Something else...
	} else {
		$('#loading-section').modal('show');
		$(mainsel).hide(); 
		$(maindiv).show(); 
		stationData(true, section); 
		if (section == "station") {
			datausedorig.station = 0; 
			dataused.station = 0; 
			$(maindiv).html(template.station); 
			flag = false; 
			fn_station(station.direction, station.station);
			window.location.hash = "#station&brnch:" + station.direction + "&stat:" + station.station;
			if (autoupdate) {
				interval = setInterval(function(){fn_station(station.direction, station.station);}, parseInt(config.frequency));
			}
		} else if (section == "platform") {
			destino1 = ""; 
			destino2 = ""; 
			destino3 = ""; 
			destino4 = ""; 
			destino5 = ""; 
			$(maindiv).html(template.platform); 
			proximaSalida(platform.station, platform.platform);
			window.location.hash = "#platform&term:" + platform.station + "&plat:" + platform.platform;
			if (autoupdate) {
				interval = setInterval(function() {proximaSalida(platform.station, platform.platform);}, parseInt(config.frequency));
			}
		} else if (section == "terminal") {
			$(maindiv).html(template.terminal); 
			proximasSalidas(terminal.station, terminal.direction, terminal.defaultstation); 
			if (autoupdate) {
				interval = setInterval(function() {proximasSalidas(terminal.station, terminal.direction, terminal.defaultstation);}, parseInt(config.frequency));
			}
		} else if (section == "tracking") {
			$(maindiv).html(template.tracking); 
			fn_tracking(station.direction, station.station); 
			window.location.hash = "#tracking&brnch:" + station.direction + "&stat:" + station.station;
			if (autoupdate) {
				interval = setInterval(function() {fn_tracking(station.direction, station.station)}, parseInt(config.frequency));
			}
		}
	};
}; 

var ifError = function(error){
	if (error === 'noerror') {
		$('.loading-container').addClass('hidden'); 
		$('.error-container').addClass('hidden'); 
		$('.main-container').removeClass('hidden'); 
	} else if (error === 'offline') {
		$('.loading-container').addClass('hidden'); 
		$('.error-container').html(showOffline).removeClass('hidden'); 
		$('.main-container').addClass('hidden'); 
	} else {
		$('.loading-container').addClass('hidden'); 
		$('.error-container').html(error).removeClass('hidden'); 
		$('.main-container').addClass('hidden'); 
	}
};

// Line picture
var format = undefined; 
var imgFooter = function(branch){
	var div = '#station-data #data_line img'; 
	if (config.linebrands === "lines") {format = "svg"} else {format = "png"};
	if ((((branch === 1) || (branch === 2)) || ((branch === 51) || (branch === 52))) || ((branch === 53) || (branch === 54))) {line = "Sarmiento"} 
	else if ((((branch === 5) || (branch === 6)) || ((branch === 7) || (branch === 8))) || ((branch === 9) || (branch === 10))) {line = "Mitre"} 
	else if ((((branch === 11) || (branch === 12)) || ((branch === 13) || (branch === 14))) || (((branch === 15) || (branch === 16)) || ((branch === 17) || (branch === 18))) || (((branch === 19) || (branch === 20)) || ((branch === 27) || (branch === 28)))) {line = "Roca"}
	else if ((((branch === 21) || (branch === 22)) || ((branch === 23) || (branch === 24))) || ((branch === 25) || (branch === 26))) {line = "BelgranoSur"}
	else if ((branch === 31) || (branch === 32)) {line = "SanMartin"}
	else if ((branch === 41) || (branch === 42)) {line = "TrenDeLaCosta"}
	else if ((branch === 61) || (branch === 62)) {line = "BelgranoNorte"}
	else if ((branch === 71) || (branch === 72)) {line = "Urquiza"} 
	else {line = "LongDistance"} 
	$(div).attr('height', "30px").prop('src', 'img/'+config.linebrands+'/'+line+'.'+format);  
}; 

// Station name converter (it's gonna to be replaced)
var stationConverter = function(original){
	var result = undefined; 
	var conv = ""; 
	// First, sets the first letter to uppercase, the other letters will be lowercase. 
	for (var i = 0; i < original.length; i++) {if (i === 0) {conv += original[i].toUpperCase();} else {conv += original[i].toLowerCase();}}
	var conversion = conv;
	// Second, switch and return a custom string, or the conversion in default case. 
	switch (conversion) {
		// Sarmiento
		case "Once": return "Plaza Once";
		case "Miserere": return "Plaza Miserere";
		case "V luro": return "Villa Luro";
		case "Moron": return "Morón";
		case "Padua": return "San Antonio de Pádua";
		case "Lujan": return "Luján";
		// Mitre
		case "Tigre": return "Tigre";
		case "J.l.suarez": return "José León Suárez";
		case "Mitre": return "Bartolomé Mitre";
		// Belgrano Norte
		case "V rosa": return "Villa Rosa";
		// San Martín
		case "Jose c. paz": return "José C. Paz";
		case "Pilar": return "Pilar";
		case "Cabred": return "Dr. Cabred";
		// Roca
		case "Constit.": return "Plaza Constitución";
		case "La plata": return "La Plata";
		case "Gutierrez": return "Gutiérrez";
		case "Alejandro korn": return "Alejandro Korn";
		case "Cañuelas": return "Cañuelas";
		// Urquiza 
		case "Lacroze": return "Federico Lacroze";
		case "Lemos": return "General Lemos";
		// Belgrano Sur
		case "Bsas": return "Buenos Aires";
		case "Gonzales catan": return "Gonzalez Catán";
		case "M.c.g. belgrano": return "M. C. General Belgrano";
		case "P.alsina": return "Puente Alsina";
		case "A. bonzi": return "Aldo Bonzi";
		// Tren de la costa
		case "Maipu": return "Maipú";
		default: return conversion; 
	}
}

// Station parser 
var stationParser = function(data, type) {
	if (type === "marquee") {
		for (var i = 0; i < data.length; i++) {
			var result = data.toLowerCase();
		}
		return result; 
	} else if (type === "station") {
		var conv = ""; 
		// First, sets the first letter to uppercase, the other letters will be lowercase. 
		for (var i = 0; i < data.length; i++) {
			if (i === 0) {
				conv += data[i].toUpperCase()
			} else {
				conv += data[i].toLowerCase()
			}
		}
		var conversion = conv;
		// Second, switch and return a custom string, or the conversion in default case. 
		switch (conversion) {
			// Sarmiento
			case "Once": return "Plaza Once";
			case "Miserere": return "Plaza Miserere";
			case "V luro": return "Villa Luro";
			case "Moron": return "Morón";
			case "Padua": return "San Antonio de Pádua";
			case "Lujan": return "Luján";
			// Mitre
			case "Tigre": return "Tigre";
			case "J.l.suarez": return "José León Suárez";
			case "Mitre": return "Bartolomé Mitre";
			// Belgrano Norte
			case "V rosa": return "Villa Rosa";
			// San Martín
			case "Jose c. paz ": return "José C. Paz";
			case "Jose c. paz": return "José C. Paz";
			case "Pilar": return "Pilar";
			case "Cabred": return "Dr. Cabred";
			// Roca
			case "Constit.": return "Plaza Constitución";
			case "La plata": return "La Plata";
			case "Gutierrez": return "Gutiérrez";
			case "Alejandro korn": return "Alejandro Korn";
			case "Cañuelas": return "Cañuelas";
			// Urquiza 
			case "Lacroze": return "Federico Lacroze";
			case "Lemos": return "General Lemos";
			// Belgrano Sur
			case "Bsas": return "Buenos Aires";
			case "Gonzales catan": return "Gonzalez Catán";
			case "C. catán": return "Gonzalez Catán";
			case "M.c.g. belgrano": return "M. C. General Belgrano";
			case "P.alsina": return "Puente Alsina";
			case "A. bonzi": return "Aldo Bonzi";
			// Tren de la costa
			case "Maipu": return "Maipú";
			default: return conversion; 
		}
	} else {
		console.error('stationParser: Type not defined. Values: "marquee" or "station"'); 
	}
}; 

var dataConverter = function(branch){
	// Sarmiento
	if ((branch === 1) || (branch === 2)) {
		lineinfo.id = 0; 
		lineinfo.branch = 0;
		lineinfo.limit = 16; 
		if (branch === 2) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 53) || (branch === 54)) {
		lineinfo.id = 0; 
		lineinfo.branch = 1;
		lineinfo.limit = 12; 
		if (branch === 54) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 51) || (branch === 52)) {
		lineinfo.id = 0; 
		lineinfo.branch = 2;
		lineinfo.limit = 14; 
		if (branch === 52) {
			lineinfo.desc = true; 
		}; 
	} 
	// Mitre 
	else if ((branch === 5) || (branch === 6)) {
		lineinfo.id = 1; 
		lineinfo.branch = 0;
		lineinfo.limit = 17; 
		if (branch === 6) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 7) || (branch === 8)) {
		lineinfo.id = 1; 
		lineinfo.branch = 1;
		lineinfo.limit = 10; 
		if (branch === 8) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 9) || (branch === 10)) {
		lineinfo.id = 1; 
		lineinfo.branch = 2;
		lineinfo.limit = 15; 
		if (branch === 10) {
			lineinfo.desc = true; 
		}; 
	} 
	// Roca 
	else if ((branch === 11) || (branch === 12)) {
		lineinfo.id = 2; 
		lineinfo.branch = 0;
		lineinfo.limit = 19; 
		if (branch === 12) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 13) || (branch === 14)) {
		lineinfo.id = 2; 
		lineinfo.branch = 1;
		lineinfo.limit = 10; 
		if (branch === 14) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 15) || (branch === 16)) {
		lineinfo.id = 2; 
		lineinfo.branch = 2;
		lineinfo.limit = 12; 
		if (branch === 16) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 17) || (branch === 18)) {
		lineinfo.id = 2; 
		lineinfo.branch = 3;
		lineinfo.limit = 15; 
		if (branch === 18) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 19) || (branch === 20)) {
		lineinfo.id = 2; 
		lineinfo.branch = 4;
		lineinfo.limit = 24; 
		if (branch === 20) {
			lineinfo.desc = true; 
		}; 
	} else if ((branch === 27) || (branch === 28)) {
		lineinfo.id = 2; 
		lineinfo.branch = 5;
		lineinfo.limit = 11; 
		if (branch === 28) {
			lineinfo.desc = true; 
		}; 
	} 
	// San Martín 
	else if ((branch === 31) || (branch === 32)) {
		lineinfo.id = 3; 
		lineinfo.branch = 0;
		lineinfo.limit = 22; 
		if (branch === 32) {
			lineinfo.desc = true; 
		}; 
	} 
	// Tren de la Costa
	else if ((branch === 41) || (branch === 42)) {
		lineinfo.id = 7; 
		lineinfo.branch = 0;
		lineinfo.limit = 11; 
		if (branch === 42) {
			lineinfo.desc = true; 
		}; 
	} 
	// Belgrano Norte
	else if ((branch === 61) || (branch === 62)) {
		lineinfo.id = 5; 
		lineinfo.branch = 0;
		lineinfo.limit = 22; 
		if (branch === 62) {
			lineinfo.desc = true; 
		}; 
	} 
	// Belgrano Sur 
	else if ((branch === 21) || (branch === 22)) {
		lineinfo.id = 6; 
		lineinfo.branch = 0;
		lineinfo.limit = 18; 
		if (branch === 22) {
			lineinfo.desc = true; 
		}; 
	} 
	else if ((branch === 23) || (branch === 24)) {
		lineinfo.id = 6; 
		lineinfo.branch = 2;
		lineinfo.limit = 8; 
		if (branch === 24) {
			lineinfo.desc = true; 
		}; 
	} 
	else if ((branch === 25) || (branch === 26)) {
		lineinfo.id = 6; 
		lineinfo.branch = 1;
		lineinfo.limit = 17; 
		if (branch === 26) {
			lineinfo.desc = true; 
		}; 
	} 
	// Urquiza
	else if ((branch === 71) || (branch === 72)) {
		lineinfo.id = 4; 
		lineinfo.branch = 0;
		lineinfo.limit = 22; 
		if (branch === 72) {
			lineinfo.desc = true; 
		}; 
	};
}; 

// Config functions
var brand = function(brand){
	$('a.brand').attr("id", brand);
	$('#brands label').removeClass('active'); 
	$('#brands label#'+brand).addClass('active'); 
	localStorage.setItem("brand", brand); 
};
var linebrands = function(linebrands){
	$('#linebrands label').removeClass('active'); 
	$('#linebrands label#'+linebrands).addClass('active'); 
	localStorage.setItem("linebrands", linebrands); 
	config.linebrands = localStorage.getItem("linebrands"); 
};
var font = function(font){
	$('body').removeClass('dinpro').removeClass('gotham').removeClass('Gidole').addClass(font);
	$('#fonts label').removeClass('active'); 
	$('#fonts label#'+font).addClass('active'); 
	localStorage.setItem("font", font); 
};
var viewdataused = function(display){
	$('#viewdataused label').removeClass('active'); 
	$('#viewdataused label#'+display).addClass('active'); 
	localStorage.setItem("viewdataused", display); 
	config.viewdataused = localStorage.getItem("viewdataused"); 
}

var updatefreq = function(option){
	if (option !== "none") {
		autoupdate = true; 
	} else {
		autoupdate = false; 
	};
	$('#update-frequency a.list-group-item').removeClass('active'); 
	$('#update-frequency a.list-group-item#'+parseInt(option)).addClass('active'); 
	localStorage.setItem('updfrequency', option); 
	config.frequency = localStorage.getItem("updfrequency");
}; 

var addfavourite = function (type, param1, param2, firstline, secondline) {
	config.favourite.push({type, param1, param2, firstline, secondline}); 
	localStorage.setItem("favourite", JSON.stringify(config.favourite)); 
	$("#nav-fav").hide();
}

var removefavourite = function(item) {
	config.favourite.splice(item, 1); 
	localStorage.setItem("favourite", JSON.stringify(config.favourite)); 
	listfavourite(); 
}

var listfavourite = function(){
	html = ""; 
	if (config.favourite.length === 0) {
		$("#sec-selector").removeClass("col-md-8"); 
		$("#sec-favs").hide(); 
	} else {
		for (var i = 0; i < config.favourite.length; i++) {
			switch(config.favourite[i].type) {
				case "stat": 
					console.log(i + "stat.");
					fntemplate = "loadSection('station'); dataConverter("+ config.favourite[i].param1 +")"; 
					fntrigger = "fn_station("+ config.favourite[i].param1 +", "+ config.favourite[i].param2 +")";  
					break; 
				case "term": 
					console.log(i + " term."); 
					break; 
				case "plat": 
					console.log(i + " plat"); 
					break; 
			}
			html += '<a class="list-group-item">\
						<div class="row">\
							<div class="col-xs-11 col-md-10" onClick="' + fntemplate + '; '+ fntrigger +'">\
								<h4 class="list-group-item-heading">' + config.favourite[i].firstline + '</h4>\
								<p class="list-group-item-text">' + config.favourite[i].secondline + '</p>\
							</div>\
							<div class="col-xs-1 col-md-2 danger" onClick="removefavourite('+i+')">\
								<p>x</p>\
							</div>\
						</div>\
					</a>'; 
		}
		$("#sec-selector").addClass("col-md-8"); 
		$("#sec-favs").show(); 
		$("#fav-stations").html(html); 
	}
}

var sizeconverter = function(bytes,decimales) {
   if(bytes == 0) return '0 Byte';
   var k = 1024; // or 1024 for binary
   var dm = decimales + 1 || 2;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

var appstart = function(){
	//$('#loading-app').modal('show');
	var templateerror = 0; 
	var checkLoad = function(section, boole){
		if ((section === "station") && (boole === false)) {
			templateerror++; 
		} else if ((section === "terminal") && (boole === false)) {
			templateerror++; 
		} else if ((section === "platform") && (boole === false))  {
			templateerror++; 
		}; 
		if (templateerror >= 1) {
			$('#error-loadingsections').modal('show');
		} else {
			$('#loading-app').modal('hide');
		}
	}
	// Stations
	$.get("views/station.html", function(jsonEstacion,status){
	}).error(function(status) {
		console.error('Error loading station.'); 
		checkLoad("station", false); 
	}).success(function(data){
		template.station = data; 
		checkLoad("station", true); 
	});

	// Terminal
	$.get("views/terminal.html", function(jsonEstacion,status){
	}).error(function(status) {
		console.error('Error loading terminal.'); 
		checkLoad("terminal", false); 
	}).success(function(data){
		template.terminal = data; 
		checkLoad("terminal", true); 
	});

	// Platform
	$.get("views/platform.html", function(jsonEstacion,status){
	}).error(function(status) {
		console.error('Error loading platform.'); 
		checkLoad("platform", false); 
	}).success(function(data){
		template.platform = data; 
		checkLoad("platform", true); 
	});

	// Tracking
	$.get("views/tracking.html", function(jsonEstacion,status){
	}).error(function(status) {
		console.error('Error loading tracker.'); 
		checkLoad("platform", false); 
	}).success(function(data){
		template.tracking = data; 
		checkLoad("platform", true); 
	});
}; 

var stationData = function(method, section){
	if (method) {
		$("#station-data").show(); 
		switch(section) {
			case "station": 
				$("#station-data #data_station").show(); 
				$("#station-data #data_direction").hide(); 
				break; 
			case "platform": 
				$("#station-data #data_station").show(); 
				$("#station-data #data_direction").hide(); 
				break; 
			case "terminal": 
				$("#station-data #data_station").show(); 
				$("#station-data #data_direction").hide(); 
				break; 
			case "tracking": 
				$("#station-data #data_station").hide(); 
				$("#station-data #data_direction").show(); 
				break; 
		};
	} else {
		$("#station-data").hide();
	}
}

var getHourData = function(){
	lastUpdate.date = moment().format("DD/MM/YYYY"); 
	lastUpdate.time = moment().format("hh:mm:ssa"); 
}; 