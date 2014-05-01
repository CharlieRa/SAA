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
	res.render('aerolineasCrear');

};

aerolinea.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	//res.render('aerolineasModificar');
	connection.connect();

	connection.query('SELECT NAME,ACRONYM FROM airline WHERE id ='+req.params.id, function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.render('aerolineasModificar',{ data: result});
	    }
	});  

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

	connection.query('DELETE FROM airline WHERE id ='+req.body.id, function(err, result) {
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
	connection.query('INSERT INTO airline SET ?',	{NAME: req.body.name,
													 ACRONYM: req.body.acronym
													},function(err, result) {
  		if(err){
     		console.log('error');
	    }else{
	    	res.redirect('/aerolineas');
	    }
	});  

	connection.end();
};
module.exports = aerolinea;