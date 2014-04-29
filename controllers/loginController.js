// var mysql = require ('mysql');

var login  = function () {};

login.prototype. get= function(req, res) {
	res.render('login');
};
login.prototype. check= function(req, res) {
	res.render('admin');
};
module.exports = login;