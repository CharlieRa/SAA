var mysql = require ('mysql');

var aeropuerto  = function () {};

aeropuerto.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT CODE, NAME, COORDINATES, (SELECT NAME FROM city WHERE airport.CITY_ID = city.CODE )AS OIN FROM airport', function(err, result) {
 		res.render('aeropuertos', { data: result})
	})
	connection.end();
};

aeropuerto.prototype.crear = function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
		connection.query('SELECT CODE, NAME FROM city', function(err, result) {
		 	console.log(result)
 			res.render('aeropuertosCrear', { data: result });
	})
	connection.end();
};

aeropuerto.prototype.modificar = function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('SELECT * FROM airport WHERE CODE ='+ mysql.escape(""+req.params.CODE), function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('aeropuertosModificar',{ data: result});
	    }
	});  

	connection.end();
};

aeropuerto.prototype.mod=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('UPDATE airport SET ? WHERE CODE ='+ mysql.escape(""+req.body.code), 
																	{NAME: req.body.name,
																	COORDINATES: req.body.coordinates,
																	CITY_ID: req.body.city_id
																	},function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('aeropuertos');
	    }
	});  

	connection.end();
};
aeropuerto.prototype.insert=function(req,res){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO airport SET ?', {CODE: req.body.code, 
							NAME: req.body.name,
							COORDINATES: req.body.coordinates,
							CITY_ID: req.body.city_id
							},function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('aeropuertos');
	    }
	});  

	connection.end();
};

aeropuerto.prototype.borrar=function(req,res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();

	connection.query('DELETE FROM airport WHERE CODE ='+ mysql.escape(""+req.params.CODE), function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('aeropuertos');
	    }
	});  

	connection.end();
};


module.exports = aeropuerto;
