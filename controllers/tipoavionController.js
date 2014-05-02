var mysql = require ('mysql');
var async = require ('async');

var airplaneType  = function () {};

airplaneType.prototype.get= function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    connection.query('SELECT * FROM airplane_type', function(err, result) {
        res.render('tipoAvion', { data: result})
    });
    connection.end();
};

airplaneType.prototype.insert = function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    connection.query('INSERT INTO airplane_type SET ?',{
        MODEL: req.body.model,
        MADE_BY: req.body.made_by,
        CAPACITY: req.body.capacity
    }, function(err, result) {
        if(err)
            console.log('error');
        else{
            res.redirect('/tipoAvion');
        }
    });
    connection.end();
};

airplaneType.prototype.modificar = function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    async.parallel({
            flight: function(callback){
                var modelo1 = req.params.id
                var modelo = modelo1.replace('%20', ' ');
                connection.query('SELECT * FROM airplane_type WHERE MODEL ='+modelo, function(err, result) {
                    callback(null, result);
                })
            }
        },
        function(err, results) {
            res.render('tipoAvionModificar', { data: results.flight})
        });

    connection.end();
};


airplaneType.prototype.mod=function(req,res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    connection.query('UPDATE airplane_type SET ? WHERE MODEL ='+req.body.model , {
        MADE_BY: req.body.made_by,
        CAPACITY: req.body.capacity
    },function(err, result, t) {
        if(err)
            console.log('error');
        else{
            res.redirect('/tipoAvion');
        }
    });

    connection.end();
};

airplaneType.prototype.borr=function(req,res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    var modelo = req.params.id.replace('%20', ' ');
    connection.query('DELETE FROM airplane_type WHERE MODEL ='+modelo, function(err, result) {
        if(err)
            console.log('error');
        else{
            res.redirect('/tipoAvion');
        }
    });

    connection.end();
};

airplaneType.prototype.crear=function(req, res) {
    res.render('tipoAvionCrear');
};
module.exports = airplaneType;