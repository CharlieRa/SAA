var mysql = require ('mysql');
require ('./datos_glob');

var gate  = function () {};

gate.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM gate', function(err, result) {
 		res.render('gates', { data: result})
	})
	connection.end();
};

gate.prototype.insert=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('INSERT INTO gate SET ?', {	NAME: req.body.name,
							STATUS: req.body.status, 
							},function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/gates');
	    }
	});  

	connection.end();
};

gate.prototype.crear = function(req, res) {
		var connection = mysql.createConnection(c_info);
	connection.connect();
	// connection.query('SELECT id, nombre FROM airline', function(err, result) {
	// 	console.log(result)
 	res.render('gatesCrear');
	//})
	connection.end();
};
gate.prototype.modificar = function(req, res) {
		var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('SELECT * FROM gate WHERE NAME =' + mysql.escape("" + req.params.name), function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('gatesModificar',{ data: result});
	    }
	});  

	connection.end();
};
module.exports = gate;
