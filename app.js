
/**
 * Module dependencies.
 */
var mysql = require ('mysql');
var express = require('express');
var routes = require('./routes');
var aerolineas = require('./routes/aerolineas');
var aeropuertos = require('./routes/aeropuertos');
var programavuelos = require('./routes/programavuelos');
var pasajeros = require('./routes/pasajeros');
var gates = require('./routes/gates');
var ciudades = require('./routes/ciudades');
var paises = require('./routes/paises');
var crearAerolinea = require('./routes/crearAerolinea');
var contacto = require('./routes/contacto');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

app.set('view options', {
  layout: false
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/aerolineas', aerolineas.aerolineas);
app.get('/aeropuertos', aeropuertos.aeropuertos);
app.get('/programavuelos', programavuelos.programavuelos);
app.get('/pasajeros', pasajeros.pasajeros);
app.get('/gates', gates.gates);
app.get('/ciudades', ciudades.ciudades);
app.get('/paises', paises.paises);
app.get('/crearAerolinea', crearAerolinea.crearAerolinea);
app.get('/contacto', contacto.contacto);

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'aeropuerto'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('Conectado a BDD');
// });

// connection.query( 'SELECT * FROM  pasajero', function(err, rows) {
//     if(err)
//       console.log('error');
//     else
//       console.log(rows[0]);
// });

// connection.query( 'SELECT * FROM  aerolinea', function(err, rows) {
//     if(err)
//         console.log('error');
//     else
//         app.get(/aerolinea/,function (req, res){  
//         res.send(rows);
//  })

// });

// connection.end();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
