var userController = require('../users/usersController.js');

module.exports = function(app, express){
  app.get('/signin', userController.singin);
  app.post('/signup', userController.singup);
}