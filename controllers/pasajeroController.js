var mysql = require ('mysql');
require ('./datos_glob');

var pasajero  = function () {};

pasajero.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM passenger', function(err, result) {
        for(var i=0; i< result.length; i++){
            result[i].BIRTHDAY = result[i].BIRTHDAY;
        }
 		res.render('pasajeros', { data: result})
 		console.log(result)
	})
	connection.end();
};

pasajero.prototype.crear = function(req, res) {
		var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT CODE, NAME FROM country', function(err, result) {
		console.log(result)
 		res.render('pasajerosCrear', { data: result})
	})
	connection.end();
};

pasajero.prototype.insert=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('INSERT INTO passenger SET ?', {	PIN: req.body.pin , 
								NAME: req.body.name,
								SEX: req.body.sex,
								BIRTHDAY: req.body.birthday,
								C_CODE: req.body.c_code
								},function(err, result, t) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/pasajeros');
	    }
	});  

	connection.end();
};

pasajero.prototype.modificar = function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM passenger WHERE ID =' + mysql.escape("" + req.params.id), function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('pasajerosModificar',{ data: result});
	    }
	});  

	connection.end();
};

pasajero.prototype.mod=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('UPDATE passenger SET ? WHERE ID ='+req.body.id , {	PIN: req.body.pin,
										NAME: req.body.name,
										SEX: req.body.sex,
										BIRTHDAY: req.body.birthday,
										C_CODE: req.body.c_code
										},function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('pasajeros');
	    }
	});  

	connection.end();
};

module.exports = pasajero;
