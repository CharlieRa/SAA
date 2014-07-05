var mysql = require ('mysql');
var async = require ('async');

require ('./datos_glob');

var signup = function () {};

signup.prototype.get= function(req, res) {
	var connection = mysql.createConnection(c_info);
//	var shasum = crypto.createHash('sha1');
	connection.connect();
	connection.query('SELECT CODE, NAME FROM country', function(err, result) {
 		res.render('signup', { data: result})
	})
	connection.end();
};

signup.prototype.makeuser=function(req,res) {
	var connection = mysql.createConnection(c_info);
	var uname = "" + req.body.fname + " " + req.body.lname;
	if(req.body.pazz1 == req.body.pazz2){
		connection.connect();

		async.parallel({
	    passenger: function(callback){
		connection.query('INSERT INTO passenger SET ?',	
								{NAME: uname,
								 PIN: req.body.pin,
								 SEX: req.body.sex,
								 BIRTHDAY: req.body.birthday,
								 C_CODE: req.body.c_code
								}, function(err, result) {
				callback(null, result);
		})
	    },
	    user: function(callback){
	    	connection.query('INSERT INTO users SET ?',	
								{PSNGR_ID: req.body.pin,
								 C_CODE: req.body.c_code,
								 PASSHASH: req.body.pazz1
								}, function(err, result) {
				callback(null, result);
			})
	    }
	},
	function(err, results) {
	    if(err){console.log(err)}
	    else{res.redirect('/');}
	});
		  
		connection.end();
	}
};

module.exports = signup;
