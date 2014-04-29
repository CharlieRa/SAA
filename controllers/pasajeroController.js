var mysql = require ('mysql');

var pasajero  = function () {};

pasajero.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM passenger', function(err, result) {
 		res.render('pasajeros', { data: result})
 		console.log(result)
	})
	connection.end();
};

pasajero.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT CODE, NAME FROM country', function(err, result) {
		console.log(result)
 		res.render('pasajerosCrear', { data: result})
	})
	connection.end();
};
module.exports = pasajero;