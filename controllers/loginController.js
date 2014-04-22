// var mysql = require ('mysql');

var login  = function () {};

login.prototype. get= function(req, res) {
	res.render('login');
};
login.prototype. check= function(req, res) {
	res.render('admin');
};
module.exports = login;

	// var connection = mysql.createConnection({
	// 	host     : 'localhost',
	// 	user     : 'root',
	// 	password : '',
	// 	database : 'aeropuerto'
	// });
	// connection.connect();
	// connection.query('SELECT * FROM ', function(err, result) {
 // 		res.render('login', { data: result})
	// })
	// connection.end();