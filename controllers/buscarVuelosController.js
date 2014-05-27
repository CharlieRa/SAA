var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var buscarVuelos  = function () {};

buscarVuelos.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();

	async.parallel({

		    origen: function(callback){
		    	connection.query('SELECT city.name AS ciname, country.NAME AS coname FROM city join country WHERE city.C_CODE = country.CODE', function(err, result) {
						callback(null, result);
				})
		    },
		    destino: function(callback){
		    	connection.query('SELECT city.name AS ciname, country.NAME AS coname FROM city join country WHERE city.C_CODE = country.CODE', function(err, result) {
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

buscarVuelos.prototype.post= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM passenger', function(err, result) {
 		res.render('buscarVuelos', { data: result})
 		console.log(result)
	})
	connection.end();
};

module.exports = buscarVuelos;
