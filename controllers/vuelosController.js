var mysql = require ('mysql');
var async = require ('async');

var flight  = function () {};

flight.prototype.get= function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    connection.query('SELECT * FROM flight', function(err, result) {
        res.render('vuelos', { data: result})
    })
    connection.end();
};

flight.prototype.insert = function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    connection.query('INSERT INTO flight SET ?',{
        DEPARTURE_TIME: req.body.departure_time,
        ARRIVAL_TIME: req.body.arrival_time,
        PLANE_ID: req.body.plane_id,
        S_FLIGHT_ID: req.body.s_flight_id,
        GATE_NAME: req.body.gate_name
    }, function(err, result, t) {
        console.log(result)
        res.render('vuelosCrear', { data: result})
    })
    connection.end();
};

flight.prototype.modificar = function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    res.render('vuelosModificar')

    // async.parallel({
    //     flight: function(callback){
    //     	connection.query('SELECT * FROM flight WHERE ID ='+req.params.id, function(err, result) {
    //     		callback(null, result);
    // 		})
    //     },
    //     aerolineas: function(callback){
    //     	connection.query('SELECT ID, NAME FROM flight', function(err, result) {
    // 			callback(null, result);
    // 		})
    //     }
    // },
    // function(err, results) {
    //     res.render('programaVuelosModificar', { data: results.flight, aerolineas: results.aerolineas})
    // });

    connection.end();
};


flight.prototype.mod=function(req,res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    connection.query('UPDATE flight SET ? WHERE ID ='+req.body.id , {

    },function(err, result, t) {
        if(err)
            console.log('error');
        else{
            res.redirect('/vuelos');
        }
    });

    connection.end();
};

flight.prototype.borrar = function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();


    async.parallel({
            flight: function(callback){
                connection.query('SELECT * FROM flight WHERE id ='+req.params.id, function(err, result) {
                    callback(null, result);
                })
            },
            aerolineas: function(callback){
                connection.query('SELECT id, nombre FROM aerolinea', function(err, result) {
                    callback(null, result);
                })
            }
        },
        function(err, results) {
            res.render('vuelosBorrar', { data: results.scheduled_flight, aerolineas: results.aerolineas})
        });

    connection.end();
};

flight.prototype.borr=function(req,res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();

    connection.query('DELETE FROM flight WHERE id ='+req.body.idd, function(err, result) {
        if(err)
            console.log('error');
        else{
            res.redirect('/vuelos');
        }
    });

    connection.end();
};

flight.prototype.crear=function(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aeropuerto'
    });
    connection.connect();
    async.parallel({
            avion: function(callback){
                connection.query('SELECT ID as PLANE_ID FROM airplane', function(err, result) {
                    callback(null, result);
                })
            },
            sflight: function(callback){
                connection.query('SELECT ID as S_FLIGHT_ID FROM scheduled_flight', function(err, result) {
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
            res.render('vuelosCrear', { data: results.avion, data2: results.sflight, data3: results.gate})
        });

    connection.end();
};
module.exports = flight;
