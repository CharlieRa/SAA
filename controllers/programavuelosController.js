var mysql = require ('mysql');
var async = require ('async');

var scheduled_flight  = function () {};

scheduled_flight.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	var destino = '(select city.NAME from airport join city join scheduled_flight where CITY_ID = city.CODE and airport.CODE = DESTINY_CODE)';
	var origen = '(select city.NAME from airport join city join scheduled_flight where CITY_ID = city.CODE and airport.CODE = ORIGIN_CODE)';
	connection.connect();
	connection.query('SELECT WEEK_DAYS, ESTIMATED_DEPARTURE, ESTIMATED_DURATION,'+destino+','+origen+' , AIRPLANE_T_MODEL FROM scheduled_flight', function(err, result) {
		if(err)
     		console.log(err);
		res.render('programaVuelos', { data: result})
	})
	connection.end();
};

scheduled_flight.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	async.parallel({
		    destino: function(callback){
		    	connection.query('SELECT airport.NAME AS aname, city.NAME AS cname FROM airport join city WHERE city.CODE = CITY_ID', function(err, result) {
		    		callback(null, result);
				})
		    },
		    origen: function(callback){
		    	connection.query('SELECT airport.NAME, city.NAME FROM airport join city WHERE city.CODE = CITY_ID', function(err, result) {
						callback(null, result);
				})
		    },
		    modelos: function(callback){
		    	connection.query('SELECT MODEL FROM airplane_type', function(err, result) {
					callback(null, result);
				})
		    },
		},
		function(err, results) {
		    res.render('programaVuelosCrear', { dest: results.destino, orgn: results.origen, mods: results.modelos})
		});

	connection.end();
};

scheduled_flight.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	res.render('programaVuelosModificar')

	// async.parallel({
	//     scheduled_flight: function(callback){
	//     	connection.query('SELECT * FROM scheduled_flight WHERE ID ='+req.params.id, function(err, result) {
	//     		callback(null, result);
	// 		})
	//     },
	//     aerolineas: function(callback){
	//     	connection.query('SELECT ID, NAME FROM scheduled_flight', function(err, result) {
	// 			callback(null, result);
	// 		})
	//     }
	// },
	// function(err, results) {
	//     res.render('programaVuelosModificar', { data: results.scheduled_flight, aerolineas: results.aerolineas})
	// });

	connection.end();
};


scheduled_flight.prototype.mod=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('UPDATE scheduled_flight SET ? WHERE ID ='+req.body.idd , {GAS_LEVEL: req.body.gasolina, 
											PILOT: req.body.piloto,
											año: req.body.año,
											id_aerolinea: req.body.id_aerolinea,
											id_tipo_scheduled_flight: req.body.id_tipo_scheduled_flight
											},function(err, result, t) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/programaVuelos');
	    }
	});  

	connection.end();
};

scheduled_flight.prototype.borrar = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();


	async.parallel({
	    scheduled_flight: function(callback){
	    	connection.query('SELECT * FROM scheduled_flight WHERE id ='+req.params.id, function(err, result) {
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
	    res.render('scheduled_flightesBorrar', { data: results.scheduled_flight, aerolineas: results.aerolineas})
	});

	connection.end();
};

scheduled_flight.prototype.borr=function(req,res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('DELETE FROM scheduled_flight WHERE id ='+req.body.idd, function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/programaVuelos');
	    }
	});  

	connection.end();
};


scheduled_flight.prototype. insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO scheduled_flight SET ?', {gasolina: req.body.gasolina , 
												 piloto: req.body.piloto,
												 año: req.body.año,
												 id_aerolinea: req.body.id_aerolinea,
												 id_tipo_scheduled_flight: req.body.id_tipo_scheduled_flight
												},function(err, result, t) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/programaVuelos');
	    }
	});  

	connection.end();
};
module.exports = scheduled_flight;
