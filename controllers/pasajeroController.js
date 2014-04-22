var mysql = require ('mysql');

var pasajero  = function () {};

pasajero.prototype. get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM pasajero', function(err, result) {
 		res.render('pasajeros', { data: result})
	})
	connection.end();
};

module.exports = pasajero;