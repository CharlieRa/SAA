var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var flight  = function () {};

flight.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query("SELECT ID, DATE_FORMAT(DEPARTURE_TIME, '%Y-%m-%d %H:%i:%s') AS DEPARTURE_TIME, DATE_FORMAT(ARRIVAL_TIME, '%Y-%m-%d %H:%i:%s') AS ARRIVAL_TIME, PLANE_ID, S_FLIGHT_ID, GATE_NAME FROM flight", function(err, result) {
		console.log(result);
		res.render('vuelos', { data: result})
	});
	connection.end();
};

flight.prototype.insert = function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('INSERT INTO flight SET ?',{
		DEPARTURE_TIME: req.body.departure_time,
		ARRIVAL_TIME: req.body.arrival_time,
		PLANE_ID: req.body.plane_id,
		S_FLIGHT_ID: req.body.s_flight_id,
		GATE_NAME: req.body.gate_name
	}, function(err, result) {
		if(err)
			console.log('error');
		else{
            for(var i=0; i< result.length; i++){
                result[i].DEPARTURE_TIME = result[i].DEPARTURE_TIME.toISOString().replace("T", " ").replace("Z", "");
                result[i].ARRIVAL_TIME = result[i].ARRIVAL_TIME.toISOString().replace("T", " ").replace("Z", "");}
			res.redirect('/vuelos');
		}
	});
	connection.end();
};

flight.prototype.modificar = function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	async.parallel({
			flight: function(callback){
				connection.query('SELECT * FROM flight WHERE id ='+req.params.id, function(err, result) {
                    for(var i=0; i< result.length; i++){
                        result[i].DEPARTURE_TIME = result[i].DEPARTURE_TIME.toISOString().replace("T", " ").replace("Z", "");
                        result[i].ARRIVAL_TIME = result[i].ARRIVAL_TIME.toISOString().replace("T", " ").replace("Z", "");}
					callback(null, result);
				})
			},
			plane: function(callback){
				connection.query('SELECT ID FROM airplane', function(err, result) {
					callback(null, result);
				})
			},
			sflight: function(callback){
				connection.query('SELECT ID FROM scheduled_flight', function(err, result) {
					callback(null, result);
				})
			},
			gate: function(callback){
				connection.query('SELECT NAME FROM gate', function(err, result) {
					callback(null, result);
				})
			}
		},
		function(err, results) {
			res.render('vuelosModificar', { data: results.flight, data1: results.plane, data2: results.sflight, data3: results.gate})
		});

	connection.end();
};


flight.prototype.mod=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('UPDATE flight SET ? WHERE ID ='+req.body.id , {
		DEPARTURE_TIME: req.body.departure_time,
		ARRIVAL_TIME: req.body.arrival_time,
		PLANE_ID: req.body.plane_id,
		S_FLIGHT_ID: req.body.s_flight_id,
		GATE_NAME: req.body.gate_name

	},function(err, result, t) {
		if(err)
			console.log('error');
		else{
			res.redirect('/vuelos');
		}
	});

	connection.end();
};

flight.prototype.borr=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('DELETE FROM flight WHERE ID ='+req.params.id, function(err, result) {
		if(err)
			console.log('error');
		else{
			res.redirect('/vuelos');
		}
	});

	connection.end();
};

flight.prototype.crear=function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	async.parallel({
			plane: function(callback){
				connection.query('SELECT ID FROM airplane', function(err, result) {
					callback(null, result);
				})
			},
			sflight: function(callback){
				connection.query('SELECT ID FROM scheduled_flight', function(err, result) {
					callback(null, result);
				})
			},
			gate: function(callback){
				connection.query('SELECT NAME FROM gate', function(err, result) {
					callback(null, result);
				})
			}
		},
		function(err, results) {
			res.render('vuelosCrear', { data: results.plane, data2: results.sflight, data3: results.gate})
		});

	connection.end();
};
module.exports = flight;
