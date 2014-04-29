var mysql = require ('mysql');

var ciudad  = function () {};

ciudad.prototype. get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM ciudad', function(err, result) {
 		res.render('ciudades', { data: result})
	})
	connection.end();
};

ciudad.prototype. insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO ciudad SET ?', {codigo: req.body.codigo , 
												 nombre: req.body.nombre,
												 id_aerolinea: req.body.id_pais,
												},function(err, result, t) {
  		if(err)
     		console.log('error');
	    else{
	    	res.redirect('/ciudades');
	    }
	});  

	connection.end();
};
module.exports = ciudad;