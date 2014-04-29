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
	connection.query('SELECT * FROM airport', function(err, result) {
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
	// connection.query('SELECT id, nombre FROM airline', function(err, result) {
	// 	console.log(result)
 		res.render('aeropuertosCrear');
	//})
	connection.end();
};

aeropuerto.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO airport SET ?',{	CODE: req.body.code , 
													NAME: req.body.name,
												 	COORDINATES: req.body.coordinates,
												 	CITY_ID: req.body.city_id
												 	},function(err, result, t){
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/aeropuertos');
	    }
	});  

	connection.end();
};
module.exports = aeropuerto;