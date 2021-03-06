var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var avion  = function () {};

avion.prototype. get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT ID, (SELECT NAME FROM airline WHERE AIRLINE_ID = airline.ID) AS AL, T_MODEL, YEAR, PILOT, COPILOT, GAS_LEVEL FROM airplane', function(err, result) {res.render('aviones', { data: result})
		console.log(result)
	})
	connection.end();
};

avion.prototype.crear = function(req, res) {
		var connection = mysql.createConnection(c_info);
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

avion.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection(c_info);
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


avion.prototype.mod=function(req,res) {
	var connection = mysql.createConnection(c_info);
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

avion.prototype.borrar=function(req,res) {
		var connection = mysql.createConnection(c_info);
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

avion.prototype. insert=function(req,res) {
	var connection = mysql.createConnection(c_info);
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
module.exports = avion;
