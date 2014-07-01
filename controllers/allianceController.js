var mysql = require ('mysql');
var async = require ('async');
require ('./datos_glob');

var alliance  = function () {};

alliance.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('SELECT * FROM alliance', function(err, result) {
 		res.render('alliance', { data: result})
	})
	connection.end();
};
alliance.prototype.crear = function(req, res) {
	res.render('allianceCrear');

};

alliance.prototype.modificar = function(req, res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('SELECT * FROM alliance WHERE ID ='+req.params.id, function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.render('allianceModificar',{ data: result});
	    }
	});  

	connection.end();
};

alliance.prototype.mod=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('UPDATE alliance SET ? WHERE ID ='+req.body.id , {	
										NAME: req.body.name,
										PTS_PER_DOLLAR: req.body.points
										},function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('alliance');
	    }
	});  

	connection.end();
};
//*****************************//
//******Arreglar borrado de demases entidades*****//
alliance.prototype.borrar=function(req,res) {
		var connection = mysql.createConnection(c_info);
	connection.connect();

	connection.query('DELETE FROM alliance WHERE ID =' + req.params.id, function(err, result) {
  		if(err)
     		console.log(err);
	    else{
	    	res.redirect('/alliance');
	    }
	});  

	connection.end();
};

alliance.prototype.insert=function(req,res) {
	var connection = mysql.createConnection(c_info);
	connection.connect();
	connection.query('INSERT INTO alliance SET ?',	{NAME: req.body.name,
													 PTS_PER_DOLLAR: req.body.points
													},function(err, result) {
  		if(err){
     		console.log(err);
	    }else{
	    	res.redirect('/alliance');
	    }
	});  

	connection.end();
};
module.exports = alliance;
