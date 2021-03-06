var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var scheduled_flight  = function () {};


scheduled_flight.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	var destino = '(select city.NAME AS dest, airport.CODE AS d_code from airport join city where CITY_ID = city.CODE)';
	var origen = '(select city.NAME AS org, airport.CODE AS o_code from airport join city where CITY_ID = city.CODE)';
	connection.connect();
	connection.query('SELECT ID, WEEK_DAYS, ESTIMATED_DEPARTURE, ESTIMATED_DURATION, dest, org, AIRPLANE_T_MODEL FROM scheduled_flight join '+destino+' AS dsts join '+origen+' AS orgs where DESTINY_CODE = d_code and ORIGIN_CODE = o_code', function(err, result) {
		console.log(result);
		for(var i=0; i< result.length; i++)
		result[i].WEEK_DAYS = result[i].WEEK_DAYS.toString(2);

		if(err)console.log(err);

		res.render('programaVuelos', { data: result})
	})
	connection.end();

};

scheduled_flight.prototype.crear = function(req, res) {
		var connection = mysql.createConnection(c_info);
	connection.connect();

	async.parallel({
		    destino: function(callback){
		    	connection.query('SELECT airport.NAME AS aname, city.NAME AS cname, airport.CODE FROM airport join city WHERE city.CODE = CITY_ID', function(err, result) {
		    		callback(null, result);
				})
		    },
		    origen: function(callback){
		    	connection.query('SELECT airport.NAME AS aname, city.NAME AS cname, airport.CODE FROM airport join city WHERE city.CODE = CITY_ID', function(err, result) {
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
	var connection = mysql.createConnection(c_info);
	connection.connect();
	async.parallel({
	     scheduled_flight: function(callback){
	     	connection.query('SELECT * FROM scheduled_flight WHERE ID ='+req.params.id, function(err, result) {
	    		callback(null, result);
			})
	    },
	    destino: function(callback){
	    	connection.query('SELECT CODE, NAME FROM scheduled_flight join airport WHERE airport.CODE = scheduled_flight.DESTINY_CODE and scheduled_flight.ID ='+req.params.id, function(err, result) {
				callback(null, result);
			})
	    },
	    origen: function(callback){
	    	connection.query('SELECT CODE, NAME FROM scheduled_flight join airport WHERE airport.CODE = scheduled_flight.ORIGIN_CODE and scheduled_flight.ID ='+req.params.id, function(err, result) {
				callback(null, result);
			})
	    }
	},
	function(err, results) {
	    res.render('programaVuelosModificar', { data: results.scheduled_flight, destino: results.destino, origen: results.origen})
	});

	connection.end();
};


scheduled_flight.prototype.mod=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('UPDATE scheduled_flight SET ? WHERE ID ='+req.body.idd , 
											{GAS_LEVEL: req.body.gasolina, 
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


scheduled_flight.prototype.borrar=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('DELETE FROM scheduled_flight WHERE ID =' +req.params.id, function(err, result) {
  		if(err){
  			res.send('Vuelo relacionado a este programa');
     		console.log(err);}
	    else{
	    	res.redirect('/programaVuelos');
	    }
	});  

	connection.end();
};


scheduled_flight.prototype.insert=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	var days = parseInt((req.body.mo || 0)) + parseInt((req.body.tu || 0)) + parseInt((req.body.we || 0)) + parseInt((req.body.th || 0)) + parseInt((req.body.fr || 0)) + parseInt((req.body.sa || 0)) + parseInt((req.body.su || 0)); 
	console.log('1.-'+(req.body.mo || 0)+'-'+(req.body.tu || 0)+'-'+(req.body.we || 0)+'-'+(req.body.th || 0)+'-'+(req.body.fr || 0)+'-'+(req.body.sa || 0)+'-'+(req.body.su || 0)+' - '+days);


	connection.query('INSERT INTO scheduled_flight SET ?', {	WEEK_DAYS: days,
									ESTIMATED_DEPARTURE: req.body.estimated_departure,
									ESTIMATED_DURATION: req.body.estimated_duration,
									DESTINY_CODE: req.body.destiny_code,
									ORIGIN_CODE: req.body.origin_code,
									AIRPLANE_T_MODEL: req.body.airplane_t_model
									},function(err, result, t) {
  		if(err){
     		console.log('2.- '+result);
		console.log('3.- '+err);
		}
	    else{
	    	res.redirect('/programaVuelos');
	    }
	});  

	connection.end();
};
module.exports = scheduled_flight;
