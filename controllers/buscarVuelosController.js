var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var buscarVuelos  = function () {};

buscarVuelos.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();

	async.parallel({

		    origen: function(callback){
		    	connection.query('SELECT airport.CODE AS acode, city.NAME AS ciname, country.NAME AS coname FROM city join country join airport WHERE city.C_CODE = country.CODE and CITY_ID = city.CODE  ORDER  BY  coname', function(err, result) {
				callback(null, result);
				})
		    },
		    destino: function(callback){
		    	connection.query('SELECT airport.CODE AS acode, city.NAME AS ciname, country.NAME AS coname FROM city join country join airport WHERE city.C_CODE = country.CODE and CITY_ID = city.CODE  ORDER  BY  coname', function(err, result) {
		    		callback(null, result);
				})
		    },

		},
		function(err, results) {
		if(err)
	 	console.log(err);
			res.render('buscarVuelos', { destino: results.destino, origen: results.origen, 	usrname: userdata.username})
		});
	connection.end();
};

buscarVuelos.prototype.enviar= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	async.parallel({
		inf: function(callback){
			connection.query("select flight.ID AS fid, ESTIMATED_DEPARTURE, DATE_FORMAT(DATE(DEPARTURE_TIME), '%b %e, %Y') AS depdate, TIME_FORMAT(ADDTIME(ESTIMATED_DEPARTURE,ESTIMATED_DURATION), '%H:%i:%S') AS ESTIMATED_ARRIVAL, ORIGIN_CODE, DESTINY_CODE, AIRPLANE_T_MODEL, ally_code from scheduled_flight join flight join alliance join airline join airplane where alliance.ID = airline.ally_code and AIRLINE_ID = airline.ID and airplane.ID = PLANE_ID and S_FLIGHT_ID = scheduled_flight.ID and ORIGIN_CODE = '"+req.body.org+"' and DESTINY_CODE = '"+req.body.dest+"' and DEPARTURE_TIME like '"+req.body.departureDate+"%' ORDER  BY  DEPARTURE_TIME", function(err, result){
				if(err)console.log(err);
			callback(null, result);
			})
		},
		cty: function(callback){
			connection.query('SELECT CODE, CITY_ID FROM airport ORDER BY CITY_ID', function(err, result) {
				callback(null, result);
			})
		},
		tcs: function(callback){
			connection.query('SELECT * from trip_class ORDER BY COST_PER_KM', function(err, result) {
				callback(null, result);
			})
		}
	},
	function(err, results) {
		console.log(results.cty);
		console.log(results.inf);
		if(err)console.log(err);
		
		var l = results.inf.length;
		var kms = new Array(l);
		for(var i = 0;i < l; i++){
			for(var j = 0;j < results.cty.length; j++){
				for(var k = 0;k < results.cty.length; k++){
					if( results.inf[i].ORIGIN_CODE == results.cty[j].CODE && results.inf[i].DESTINY_CODE == results.cty[k].CODE ){
						kms[i] = map[j][k];
					}
				}
			}
			for(var h = 0;h < results.tcs.length; h++){}

		}


		res.render('vuelosBuscados', { data: results.inf , citylist: results.cty})

	});
	connection.end();
};

module.exports = buscarVuelos;

