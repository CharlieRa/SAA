var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var buscarVuelos  = function () {};




buscarVuelos.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM passenger', function(err, result) {
 		res.render('buscarVuelos', { data: result})
 		console.log(result)
	})
	connection.end();
};

module.exports = buscarVuelos;
