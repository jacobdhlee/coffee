var User = require('./userModel.js');
var Promise = require("bluebird");

module.exports = {

  signup: function(req, res, next) {
    var user = new User();
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: req.body.username}, function(err, existed) {
      if(existed) {
        console.log(req.body.username + ' has already sign up')
        return res.redirect('/signin')
      } else {
        user.save(function(err, user) {
          if(err) {
            next(err);
          } else {
            res.json("user has been created. Please sign in again")
            return res.redirect('/signin')
          }
        })
      }
    })
  },

  singin: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, user) {
      if(err) {
        return next(err);
      } else {
        if(!user) {
          res.json('username is not match. Please sign up first')
        } 
        if(!user.comparedPassword(password)) {
          res.json('Password is not match. Please check password')
        } 
        res.json('successfully login')
        return res.redirect('/');
      }
    })
  }
}