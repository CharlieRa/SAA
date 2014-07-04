var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var estadisticas  = function () {};

estadisticas.prototype.vuelos= function(req, res) {

	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT COUNT(*) AS A FROM flight WHERE DEPARTURE_TIME =' + mysql.escape("" + req.body.fecha), function(err, result) {
		console.log(result);
		res.render('statistics', { data: result})
	});
	connection.end();
};


module.exports = estadisticas;