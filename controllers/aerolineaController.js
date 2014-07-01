var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var aerolinea  = function () {};

aerolinea.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM airline', function(err, result) {
 		res.render('aerolineas', { data: result})
	})
	connection.end();
};
aerolinea.prototype.crear = function(req, res) {
	res.render('aerolineasCrear');

};

aerolinea.prototype.modificar = function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('SELECT * FROM airline WHERE ID ='+req.params.id, function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('aerolineasModificar',{ data: result});
	    }
	});  

	connection.end();
};

aerolinea.prototype.mod=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('UPDATE airline SET ? WHERE ID ='+req.body.id , {	
										NAME: req.body.name,
										ACRONYM: req.body.acronym,
										ally_code:req.body.ally_code
										},function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('aerolineas');
	    }
	});  

	connection.end();
};
//*****************************//
//******Arreglar borrado de demases entidades*****//
aerolinea.prototype.borrar=function(req,res) {
		var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('DELETE FROM airline WHERE ID =' + req.params.id, function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/aerolineas');
	    }
	});  

	connection.end();
};

aerolinea.prototype.insert=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('INSERT INTO airline SET ?',	{NAME: req.body.name,
													 ACRONYM: req.body.acronym,
													 ally_code: req.body.ally_code
													},function(err, result) {
  		if(err){
     		console.log(err);
	    }else{
	    	res.redirect('/aerolineas');
	    }
	});  

	connection.end();
};
module.exports = aerolinea;
