
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var aerolinea = require('./controllers/aerolineaController');
var Aerolinea = new aerolinea();
var avion = require('./controllers/avionController');
var Avion = new avion();
var airplaneType = require('./controllers/tipoavionController');
var AirplaneType = new airplaneType();
var aeropuerto = require ('./controllers/aeropuertoController')
var Aeropuerto = new aeropuerto();
var ciudad = require ('./controllers/ciudadController');
var Ciudad = new ciudad();
var gate = require ('./controllers/gateController');
var Gate = new gate();
var programavuelos = require ('./controllers/programavuelosController');
var Programavuelos = new programavuelos();
var flight = require ('./controllers/vuelosController');
var Flight = new flight();
var pasajero = require ('./controllers/pasajeroController');
var Pasajero = new pasajero();
var pais = require ('./controllers/paisController');
var Pais = new pais();


//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false);
  } 
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.redirect('/login')
  else
  	next();
};
//==================================================================


//var aeropuertos = require('./routes/aeropuertos');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'muyseguro' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));






app.set('view options', {
  layout: false
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', auth, function (req, res){ 
	res.render('admin');
});

// app.get('/admin', auth, function (req, res){ res.render('admin');});

app.get('/login', function (req, res){ res.render('login'); });

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});



app.get('/aerolineas', Aerolinea.get);
app.get('/aerolineas/crear', Aerolinea.crear);
app.get('/aerolineas/borrar/:id', Aerolinea.borrar);
app.get('/aerolineas/modificar/:id', Aerolinea.modificar);
app.post('/aerolineas/modificar', Aerolinea.mod);
app.post('/aerolineas',Aerolinea.insert);

app.get('/aviones', Avion.get);
app.get('/aviones/crear', Avion.crear);
app.get('/aviones/modificar/:id', Avion.modificar);
app.get('/aviones/borrar/:id',Avion.borrar);
app.post('/aviones/modificar', Avion.mod);
app.post('/aviones',Avion.insert);

app.get('/aeropuertos',Aeropuerto.get);
app.get('/aeropuertos/crear',Aeropuerto.crear);
app.get('/aeropuertos/modificar/:CODE',Aeropuerto.modificar);
app.get('/aeropuertos/borrar/:CODE',Aeropuerto.borrar)
app.post('/aeropuertos/modificar',Aeropuerto.mod);
app.post('/aeropuertos',Aeropuerto.insert);

app.get('/ciudades',Ciudad.get);
app.get('/ciudades/crear',Ciudad.crear);
app.post('/ciudades',Ciudad.insert);

app.get('/tipoAvion', AirplaneType.get);
app.get('/tipoAvion/crear', AirplaneType.crear);
app.get('/tipoAvion/modificar/:model', AirplaneType.modificar);
app.get('/tipoAvion/borrar/:model', AirplaneType.borr);
app.post('/tipoAvion', AirplaneType.insert);
app.post('/tipoAvion/modificar', AirplaneType.mod);


app.get('/gates',Gate.get);
app.post('/gates',Gate.insert);
app.get('/gates/crear',Gate.crear);


app.get('/programaVuelos',Programavuelos.get);
app.get('/programaVuelos/modificar/:id', Programavuelos.modificar);
app.get('/programaVuelos/crear', Programavuelos.crear);
app.get('/programaVuelos/borrar/:id', Programavuelos.borrar);
app.post('/programaVuelos',Programavuelos.insert);
app.post('/programaVuelos/modificar', Programavuelos.mod);
// app.post('/programaVuelos/borrar', Programavuelos.borr);

app.get('/vuelos', Flight.get);
app.get('/vuelos/crear', Flight.crear);
app.post('/vuelos',Flight.insert);
app.get('/vuelos/modificar/:id', Flight.modificar);
app.post('/vuelos/modificar', Flight.mod);
app.get('/vuelos/borrar/:id', Flight.borr);


app.get('/pasajeros',Pasajero.get);
app.get('/pasajeros/crear',Pasajero.crear);
app.post('/pasajeros',Pasajero.insert);

app.get('/paises',Pais.get);
app.get('/paises/crear',Pais.crear);

app.post('/paises',Pais.insert);
app.get('/paises/modificar/:id', Pais.modificar);
app.get('/paises/borrar/:id', Pais.borrar);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
