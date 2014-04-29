var mysql = require ('mysql');
var async = require ('async');

var aerolinea  = function () {};

aerolinea.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM airline', function(err, result) {
 		res.render('aerolineas', { data: result})
	})
	connection.end();
};

aerolinea.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT id, nombre FROM airline', function(err, result) {
		console.log(result)
 		res.render('aerolineasCrear', { data: result})
	})
	connection.end();
};

aerolinea.prototype.borr=function(req,res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('DELETE FROM airline WHERE id ='+req.body.idd, function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aviones');
	    }
	});  

	connection.end();
};

aerolinea.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO airline SET ?',	{nombre: req.body.nombre
													},function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aerolineas');
	    }
	});  

	connection.end();
};
module.exports = aerolinea;