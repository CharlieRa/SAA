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
		results1: function(callback){
			connection.query("select flight.ID AS fid, ESTIMATED_DEPARTURE, DATE_FORMAT(DATE(DEPARTURE_TIME), '%b %e, %Y') AS depdate, TIME_FORMAT(ADDTIME(ESTIMATED_DEPARTURE,ESTIMATED_DURATION), '%H:%i:%S') AS ESTIMATED_ARRIVAL, ORIGIN_CODE, DESTINY_CODE, AIRPLANE_T_MODEL from scheduled_flight join flight where S_FLIGHT_ID = scheduled_flight.ID and ORIGIN_CODE = '"+req.body.org+"' and DESTINY_CODE = '"+req.body.dest+"' and DEPARTURE_TIME like '"+req.body.departureDate+"%' ORDER  BY  DEPARTURE_TIME", function(err, result){
				if(err)console.log(err);
			callback(null, result);
			})
		},
		cty: function(callback){
			connection.query('SELECT CODE FROM city ORDER BY CODE', function(err, result) {
				callback(null, result);
			})
		}
	},
	function(err, results) {
		console.log(results.cty);
		res.render('vuelosBuscados', { data: results.results1 , citylist: results.cty, table: map})
	});
	connection.end();
};

module.exports = buscarVuelos;

// - 	console.log("select flight.ID AS fid, ESTIMATED_DEPARTURE, ADDTIME(ESTIMATED_DEPARTURE,ESTIMATED_DURATION) AS ESTIMATED_ARRIVAL, ORIGIN_CODE, DESTINY_CODE, AIRPLANE_T_MODEL from scheduled_flight join flight where S_FLIGHT_ID = scheduled_flight.ID and ORIGIN_CODE = '"+req.body.org+"' and DESTINY_CODE = '"+req.body.dest+"' and DEPARTURE_TIME like '"+req.body.departureDate+"%'");
