var mysql = require ('mysql');

var gate  = function () {};

gate.prototype.get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM gate', function(err, result) {
 		res.render('gates', { data: result})
	})
	connection.end();
};

gate.prototype.insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO gate SET ?', {estado: req.body.estado 
												},function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/gates');
	    }
	});  

	connection.end();
};

gate.prototype.crear = function(req, res) {
		var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	// connection.query('SELECT id, nombre FROM airline', function(err, result) {
	// 	console.log(result)
 	res.render('gatesCrear');
	//})
	connection.end();
};
module.exports = gate;