// LIBRERIAS
var LocalStrategy = require('passport-local').Strategy;


// EXPORTAR
 module.exports = function(passport){
// SERIALIZE Y DESERIALIZE
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  }); 
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // INGRESO LOCAL
  passport.use('ingreso-local', new LocalStrategy({
    usernameField : 'user',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, user, password, done) {
  	if( user != 'user' || password != 'pass')
  		return done(null, false);
    user.id = user;
    user.pass = password;
  	return done(null, user);

  }));


};