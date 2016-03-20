var userController = require('../users/userController.js');
var storeController = require('../stores/storeController.js');
var passport = require('passport');

passport.use('jwt', userController.jwtLogin());
passport.use('jwt', storeController.jwtLogin());

var requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app, express){
  app.get('/login', requireAuth, function(req, res) {
    res.send('logged In!!');
  },userController.jwtLogin);

  app.get('/store/login', requireAuth, function(req, res) {
    res.send('Store Logged In');
  },storeController.jwtLogin);
  
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/store/signin', storeController.signin);
  app.post('/store/signup', storeController.signup);
}