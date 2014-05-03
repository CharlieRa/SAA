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
	connection.query('SELECT CODE, NAME FROM country', function(err, result) {
		console.log(result)
 		res.render('ciudadesCrear', { data: result})
	})
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
	connection.query('INSERT INTO city SET ?', {	CODE: req.body.code , 
							NAME: req.body.name,
							C_CODE: req.body.c_code
							},function(err, result, t) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/ciudades');
	    }
	});  

	connection.end();
};
ciudad.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('SELECT * FROM city WHERE CODE =' + mysql.escape(""+req.params.code), function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('ciudadesModificar',{ data: result});
	    }
	});  

	connection.end();
};
module.exports = ciudad;
