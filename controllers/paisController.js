var mysql = require ('mysql');

var pais  = function () {};

pais.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM country', function(err, result) {
 		res.render('paises', { data: result})
	})
	connection.end();
};

pais.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO country SET ?', {	CODE: req.body.code,
							NAME: req.body.name,
							MAIN_LANG: req.body.main_lang, 
							},function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/paises');
	    }
	});  

	connection.end();
};

pais.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	// connection.query('SELECT id, nombre FROM airline', function(err, result) {
	// 	console.log(result)
 	res.render('paisesCrear');
	//})
	connection.end();
};
module.exports = pais;
