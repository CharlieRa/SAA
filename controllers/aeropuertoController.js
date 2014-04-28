var mysql = require ('mysql');

var aeropuerto  = function () {};

aeropuerto.prototype. get= function(req, res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
	});
	connection.connect();
	connection.query('SELECT * FROM aeropuerto', function(err, result) {
 		res.render('aeropuertos', { data: result})
	})
	connection.end();
};

aeropuerto.prototype. insert=function(req,res) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'aeropuerto'
		});
	connection.connect();
	connection.query('INSERT INTO aeropuerto SET ?',{codigo: req.body.codigo , 
													nombre: req.body.nombre,
												 	id_ciudad: req.body.id_ciudad
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