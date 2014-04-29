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
	connection.query('INSERT INTO gate SET ?', {	NAME: req.body.NAME,
							STATUS: req.body.STATUS, 
							},function(err, result) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/gates');
	    }
	});  

	connection.end();
};
<<<<<<< HEAD

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
=======
module.exports = gate;
>>>>>>> 7dcd43a65623b563ce784146b022f04d64579a21
