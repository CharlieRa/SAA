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
        res.render('vuelos', { data: result})
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
        DEPARTURE_TIME: req.body.departure_time,
        ARRIVAL_TIME: req.body.arrival_time,
        PLANE_ID: req.body.plane_id,
        S_FLIGHT_ID: req.body.s_flight_id,
        GATE_NAME: req.body.gate_name
    }, function(err, result) {
        if(err)
            console.log('error');
        else{
            res.redirect('/vuelos');
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
                connection.query('SELECT * FROM airplane_type WHERE id ='+req.params.id, function(err, result) {
                    callback(null, result);
                })
            },
            plane: function(callback){
                connection.query('SELECT ID FROM airplane', function(err, result) {
                    callback(null, result);
                })
            },
            sflight: function(callback){
                connection.query('SELECT ID FROM scheduled_flight', function(err, result) {
                    callback(null, result);
                })
            },
            gate: function(callback){
                connection.query('SELECT NAME FROM gate', function(err, result) {
                    callback(null, result);
                })
            }
        },
        function(err, results) {
            res.render('vuelosModificar', { data: results.flight, data1: results.plane, data2: results.sflight, data3: results.gate})
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
    connection.query('UPDATE airplane_type SET ? WHERE ID ='+req.body.id , {
        DEPARTURE_TIME: req.body.departure_time,
        ARRIVAL_TIME: req.body.arrival_time,
        PLANE_ID: req.body.plane_id,
        S_FLIGHT_ID: req.body.s_flight_id,
        GATE_NAME: req.body.gate_name

    },function(err, result, t) {
        if(err)
            console.log('error');
        else{
            res.redirect('/vuelos');
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

    connection.query('DELETE FROM airplane_type WHERE ID ='+req.params.id, function(err, result) {
        if(err)
            console.log('error');
        else{
            res.redirect('/vuelos');
        }
    });

    connection.end();
};

airplaneType.prototype.crear=function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    async.parallel({
            plane: function(callback){
                connection.query('SELECT ID FROM airplane', function(err, result) {
                    callback(null, result);
                })
            },
            sflight: function(callback){
                connection.query('SELECT ID FROM scheduled_flight', function(err, result) {
                    callback(null, result);
                })
            },
            gate: function(callback){
                connection.query('SELECT NAME FROM gate', function(err, result) {
                    callback(null, result);
                })
            }
        },
        function(err, results) {
            res.render('vuelosCrear', { data: results.plane, data2: results.sflight, data3: results.gate})
        });

    connection.end();
};
module.exports = airplaneType;