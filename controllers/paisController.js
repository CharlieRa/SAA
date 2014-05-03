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

pais.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('SELECT * FROM country WHERE CODE ="' + req.params.id + '"', function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('paisesModificar',{ data: result});
	    }
	});  

	connection.end();
};

pais.prototype.edit=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('UPDATE country SET ? WHERE CODE =' + mysql.escape(""+req.body.code), {NAME: req.body.name,
													 				 MAIN_LANG: req.body.main_lang
													},function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('paises');
	    }
	});  

	connection.end();
};

pais.prototype.borrar=function(req,res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('DELETE FROM country WHERE CODE =' + mysql.escape(""+req.params.code), function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/paises');
	    }
	});  

	connection.end();
};
module.exports = pais;
