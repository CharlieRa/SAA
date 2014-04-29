
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
app.use(express.favicon());
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
app.post('/aerolineas',Aerolinea.insert);
app.get('/aerolineas/crear', Aerolinea.crear);
// app.get('/aerolineas/modificar/:id', Aerolinea.modificar);
// app.post('/aerolineas/modificar', Aerolinea.mod);
// app.get('/aerolineas/borrar/:id', Aerolinea.borrar);
// app.post('/aerolineas/borrar', Aerolinea.borr);


app.get('/aviones', Avion.get);
app.get('/aviones/crear', Avion.crear);
app.post('/aviones',Avion.insert);
app.get('/aviones/modificar/:id', Avion.modificar);
app.post('/aviones/modificar', Avion.mod);
app.get('/aviones/borrar/:id', Avion.borrar);
app.post('/aviones/borrar', Avion.borr);

app.get('/aeropuertos',auth,Aeropuerto.get);
app.post('/aeropuertos',Aeropuerto.insert);

app.get('/ciudades',auth,Ciudad.get);
app.post('/ciudades',Ciudad.insert);

app.get('/gates',auth,Gate.get);
app.post('/gates',Gate.insert);

app.get('/programa_vuelos',auth,Programa_vuelos.get);
app.post('/programa_vuelos',Programa_vuelos.insert);

app.get('/pasajeros',auth,Pasajero.get);

// app.get('/programavuelos', programavuelos.programavuelos);
// app.get('/pasajeros', pasajeros.pasajeros);
// app.get('/gates', gates.gates);
// app.get('/ciudades', ciudades.ciudades);
// app.get('/paises', paises.paises);
// app.get('/crearAerolinea', crearAerolinea.crearAerolinea);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
