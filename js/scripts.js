// Code written by Fermoto5HD. 

// Which container will the main content appear?
var maindiv = "main#main"; 

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
var terminal = [station = undefined, defaultstation = undefined, direction = undefined, namestation = undefined]; 
var platform = [station = undefined, platform = undefined]; 
var station = [direction = undefined, station = undefined]; 
var config = [brand = undefined, linebrands = undefined, font = undefined, frequency = undefined]; 
var interval = undefined; 
var autoupdate = false; 
var internet = undefined; 

// Loads config 
config.brand = localStorage.getItem("brand"); 
if (config.brand === null) {
	localStorage.setItem("brand", "OFSE"); 
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
config.frequency = localStorage.getItem("updfrequency"); console.log('1:' + config.frequency); 
if (config.frequency === null) {
	localStorage.setItem("updfrequency", "1000"); 
	config.frequency = localStorage.getItem("updfrequency");console.log('2:' + config.frequency); 
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
		$('#first-time').modal('show');
		localStorage.setItem("firsttime", false); 
	};
	// Checks Internet connection. 
	internet = setInterval(checkConnection, 1000); 
}); 

$(document).ready(function(){
	loadSection('selector'); 
	$('#brands .btn-primary').on('click', function(){
		brand($(this).find('input').attr('id'))
	}); 
	$('#linebrands .btn-primary').on('click', function(){
		linebrands($(this).find('input').attr('id'))
	}); 
	$('#fonts .btn-primary').on('click', function(){
		font($(this).find('input').attr('id'))
	}); 
	brand(config.brand); 
	linebrands(config.linebrands); 
	font(config.font); 
	updatefreq(config.frequency); 
}); 

// Loads sections
var loadSection = function(section, method){
	$(maindiv).load(showLoading);
	clearInterval(interval); 
	console.log(section); 
	if (section !== "selector") {
		$('#loading-section').modal('show');
	};
	$(maindiv).load("section/"+section+".html", function( response, status, xhr ) {
		console.log('after'); 
		if (status == "success") {
			$.getScript('js/'+section+'.js', function(){
				if (section === "selector") {
					paso1();
					$('#btn-back').html('');
				} else if (section == "estacion") {
					//$('.loading-container').html(showLoadingData); 
					proximoTren(station.direction, station.station);
					if (autoupdate) {
						interval = setInterval(function(){proximoTren(station.direction, station.station);}, parseInt(config.frequency));
					}
				} else if (section == "platform") {
					//$('.loading-container').html(showLoadingData); 
					proximaSalida(platform.station, platform.platform);
					if (autoupdate) {
						interval = setInterval(function() {proximaSalida(platform.station, platform.platform);}, parseInt(config.frequency));
					}
				} else if (section == "terminal") {
					//$('.loading-container').html(showLoadingData); 
					proximasSalidas(terminal.station, terminal.direction, terminal.defaultstation); 
					if (autoupdate) {
						interval = setInterval(function() {proximasSalidas(terminal.station, terminal.direction, terminal.defaultstation);}, parseInt(config.frequency));
					}
				}
			}); 
		}
		else if (status == "error") {
			var msg = "Sorry but there was an error: ";
			$(maindiv).html(showError);
			console.log(msg + xhr.status + " " + xhr.statusText); 
			$('button#tryagain').attr('onClick', 'loadSection("'+section+'")'); 
		}
	});
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
	if (config.linebrands === "lines") {format = "svg"} else {format = "png"};
	if ((((branch === 1) || (branch === 2)) || ((branch === 51) || (branch === 52))) || ((branch === 53) || (branch === 54))) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/Sarmiento.'+format);  
	} 
	else if ((((branch === 5) || (branch === 6)) || ((branch === 7) || (branch === 8))) || ((branch === 9) || (branch === 10))) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/Mitre.'+format);  
	} 
	else if ((((branch === 11) || (branch === 12)) || ((branch === 13) || (branch === 14))) || (((branch === 15) || (branch === 16)) || ((branch === 17) || (branch === 18))) || (((branch === 19) || (branch === 20)) || ((branch === 27) || (branch === 28)))) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/Roca.'+format); 
	}
	else if ((((branch === 21) || (branch === 22)) || ((branch === 23) || (branch === 24))) || ((branch === 25) || (branch === 26))) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/BelgranoSur.'+format); 
	}
	else if ((branch === 31) || (branch === 32)) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/SanMartin.'+format); 
	}
	else if ((branch === 41) || (branch === 42)) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/TrenDeLaCosta.'+format); 
	}
	else if ((branch === 61) || (branch === 62)) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/BelgranoNorte.'+format); 
	}
	else if ((branch === 71) || (branch === 72)) {
		$('#brand-line').prop('src', 'img/'+config.linebrands+'/Urquiza.'+format); 
	} else {
		//$('#brand-line').prop('src', 'img/'+config.linebrands+'/LongDistance.'+format); Coming soon ;) 
		$('#brand-line').prop('src', ''); 
	}; 
	$('#brand-line').attr('height', "30px");  
}; 

// Station name converter
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
    $('body').removeClass('dinpro').removeClass('gotham').addClass(font);
	$('#fonts label').removeClass('active'); 
	$('#fonts label#'+font).addClass('active'); 
	localStorage.setItem("font", font); 
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