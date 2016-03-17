var userController = require('../users/userController.js');
var storeController = require('../stores/storeController.js');

module.exports = function(app, express){
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/store/signin', storeController.signin);
  app.post('/store/signup', storeController.signup);
}