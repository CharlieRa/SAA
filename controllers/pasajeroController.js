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

pasajero.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO passenger SET ?', {	PIN: req.body.pin , 
								NAME: req.body.name,
								SEX: req.body.sex,
								BIRTHDAY: req.body.birthday,
								C_CODE: req.body.c_code
								},function(err, result, t) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/pasajeros');
	    }
	});  

	connection.end();
};
module.exports = pasajero;
