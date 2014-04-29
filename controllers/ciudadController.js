var mysql = require ('mysql');

var ciudad  = function () {};

ciudad.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM city', function(err, result) {
 		res.render('ciudades', { data: result})
	})
	connection.end();
};

ciudad.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	// connection.query('SELECT id, nombre FROM airline', function(err, result) {
	// 	console.log(result)
 		res.render('ciudadesCrear');
	//})
	connection.end();
};

ciudad.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO city SET ?', {CODE: req.body.code , 
												 NAME: req.body.name,
												 C_CODE: req.body.c_code,
												},function(err, result, t) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/ciudades');
	    }
	});  

	connection.end();
};
module.exports = ciudad;