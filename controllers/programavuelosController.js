var mysql = require ('mysql');
var async = require ('async');

var programavuelos  = function () {};

programavuelos.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT *, (SELECT NAME FROM airline WHERE scheduled_flight.DESTINY_CODE = airline.ACRONYM) AS BO FROM scheduled_flight', function(err, result) {
						res.render('programaVuelos', { data: result})
		console.log(result)
	})
	connection.end();
};

programavuelos.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	async.parallel({
	    aero: function(callback){
		connection.query('SELECT ID, NAME FROM airline', function(err, result) {
				callback(null, result);
		})
	    },
	    modelos: function(callback){
	    	connection.query('SELECT MODEL, CAPACITY FROM airplane_type', function(err, result) {
				callback(null, result);
			})
	    }
	},
	function(err, results) {
	    res.render('avionesCrear', { data: results.aero, mods: results.modelos})
	});



	connection.end();
};

programavuelos.prototype.modificar = function(req, res) {
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
	    aero: function(callback){
	    	connection.query('SELECT ID, NAME FROM airline', function(err, result) {
				callback(null, result);
			})
	    },
	    modelos: function(callback){
	    	connection.query('SELECT MODEL FROM airplane_type', function(err, result) {
				callback(null, result);
			})
	    }
	},
	function(err, results) {
	    res.render('avionesModificar', { data: results.avion, aero: results.aero, mods: results.modelos})
	});

	connection.end();
};


programavuelos.prototype.mod=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('UPDATE airplane SET ? WHERE ID = '+req.body.id, {	GAS_LEVEL: req.body.gas_level, 
										PILOT: req.body.pilot,
										COPILOT: req.body.copilot,
										YEAR: req.body.year,
										AIRLINE_ID: req.body.airline_id,
										T_MODEL: req.body.t_model
										},function(err, result, t) {
  		if(err){
  			console.log(req.body.id);
     		console.log(err);}
	    else{
	    	res.redirect('aviones');
	    }
	});  

	connection.end();
};

programavuelos.prototype.borrar=function(req,res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('DELETE FROM airplane WHERE ID ='+req.params.id, function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('aviones');
	    }
	});  

	connection.end();
};

programavuelos.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO airplane SET ?', {GAS_LEVEL: req.body.gas_level, 
							PILOT: req.body.pilot,
							COPILOT: req.body.copilot,
							YEAR: req.body.year,
							AIRLINE_ID: req.body.airline_id,
							T_MODEL: req.body.t_model
							},function(err, result, t) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/aviones');
	    }
	});  

	connection.end();
};
module.exports = programavuelos;
