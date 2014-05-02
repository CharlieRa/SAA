var mysql = require ('mysql');

var programa_vuelo  = function () {};

programa_vuelo.prototype. get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM programa_vuelos', function(err, result) {
 		res.render('programa_vuelos', { data: result})
	})
	connection.end();
};

programa_vuelo.prototype. insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO programa_vuelos SET ?',{fecha: req.body.fecha, 
														hora: req.body.hora,
												 		id_destino: req.body.id_destino,
												 		id_salida: req.body.id_salida,
												 		id_tipo_avion: req.body.id_tipo_avion
												 		},function(err, result, t){
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/programa_vuelos');
	    }
	});  

	connection.end();
};
module.exports = programa_vuelo;