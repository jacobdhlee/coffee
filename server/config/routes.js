var userController = require('../users/userController.js');

module.exports = function(app, express){
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
}