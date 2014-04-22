
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var aerolinea = require('./controllers/aerolineaController');
var Aerolinea = new aerolinea();
var avion = require('./controllers/avionController');
var Avion = new avion();
var aeropuerto = require ('./controllers/aeropuertoController')
var Aeropuerto = new aeropuerto();
var ciudad = require ('./controllers/ciudadController');
var Ciudad = new ciudad();
var gate = require ('./controllers/gateController');
var Gate = new gate();
var programa_vuelos = require ('./controllers/programavuelosController');
var Programa_vuelos = new programa_vuelos();
var pasajero = require ('./controllers/pasajeroController');
var Pasajero = new pasajero();



//var aeropuertos = require('./routes/aeropuertos');
//var programavuelos = require('./routes/programavuelos');
// var pasajeros = require('./routes/pasajeros');
// var gates = require('./routes/gates');
// var ciudades = require('./routes/ciudades');
// var paises = require('./routes/paises');
// var crearAerolinea = require('./routes/crearAerolinea');

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
  app.use(express.errorHandler());Aerolinea.insert
}



app.get('/', routes.index);


app.get('/aerolineas',Aerolinea.get);
app.post('/aerolineas',Aerolinea.insert);

app.get('/aviones',Avion.get);
app.post('/aviones',Avion.insert);

app.get('/aeropuertos',Aeropuerto.get);
app.post('/aeropuertos',Aeropuerto.insert);

app.get('/ciudades',Ciudad.get);
app.post('/ciudades',Ciudad.insert);

app.get('/gates',Gate.get);
app.post('/gates',Gate.insert);

app.get('/programa_vuelos',Programa_vuelos.get);
app.post('/programa_vuelos',Programa_vuelos.insert);

app.get('/pasajeros',Pasajero.get);

// app.get('/programavuelos', programavuelos.programavuelos);
// app.get('/pasajeros', pasajeros.pasajeros);
// app.get('/gates', gates.gates);
// app.get('/ciudades', ciudades.ciudades);
// app.get('/paises', paises.paises);
// app.get('/crearAerolinea', crearAerolinea.crearAerolinea);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
