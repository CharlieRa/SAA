var mysql = require ('mysql');
var async = require ('async');

var avion  = function () {};

avion.prototype. get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT ID, (SELECT NAME FROM airline WHERE AIRLINE_ID = airline.ID) AS AL, T_MODEL, YEAR, PILOT, COPILOT, GAS_LEVEL FROM airplane', function(err, result) {res.render('aviones', { data: result})
		console.log(result)
	})
	connection.end();
};

avion.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT ID, NAME FROM airline', function(err, result) {
		console.log(result)
		res.render('avionesCrear', { data: result})
	})
	connection.end();
};

avion.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();


	async.parallel({
	    avion: function(callback){
	    	connection.query('SELECT * FROM airplane WHERE ID ='+req.params.id, function(err, result) {
	    		callback(null, result);
			})
	    },
	    aerolineas: function(callback){
	    	connection.query('SELECT ID, NAME FROM airline', function(err, result) {
				callback(null, result);
			})
	    }
	},
	function(err, results) {
	    res.render('avionesModificar', { data: results.avion, aerolineas: results.aerolineas})
	});

	connection.end();
};


avion.prototype.mod=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('UPDATE airplane SET ? WHERE ID ='+req.body.idd , {	GAS_LEVEL: req.body.gasolina, 
										PILOT: req.body.piloto,
										COPILOT: req.body.copiloto,
										YEAR: req.body.año,
										AIRLINE_ID: req.body.id_aerolinea,
										T_MODEL: req.body.id_tipo_avion
										},function(err, result, t) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aviones');
	    }
	});  

	connection.end();
};

avion.prototype.borrar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();


	async.parallel({
	    avion: function(callback){
	    	connection.query('SELECT * FROM avion WHERE id ='+req.params.id, function(err, result) {
	    		callback(null, result);
			})
	    },
	    aerolineas: function(callback){
	    	connection.query('SELECT id, nombre FROM aerolinea', function(err, result) {
				callback(null, result);
			})
	    }
	},
	function(err, results) {
	    res.render('avionesBorrar', { data: results.avion, aerolineas: results.aerolineas})
	});

	connection.end();
};

avion.prototype.borr=function(req,res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('DELETE FROM avion WHERE id ='+req.body.idd, function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aviones');
	    }
	});  

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
												},function(err, result, t) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aviones');
	    }
	});  

	connection.end();
};
module.exports = avion;
