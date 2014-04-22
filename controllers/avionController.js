var mysql = require ('mysql');

var avion  = function () {};

avion.prototype. get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM avion', function(err, result) {
 		res.render('aviones', { data: result})
	})
	connection.end();
};

avion.prototype. insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO avion SET ?', {gasolina: req.body.gasolina , 
												 piloto: req.body.piloto,
												 año: req.body.año,
												 id_aerolinea: req.body.id_aerolinea,
												 id_tipo_avion: req.body.id_tipo_avion
												},function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aviones');
	    }
	});  

	connection.end();
};
module.exports = avion;