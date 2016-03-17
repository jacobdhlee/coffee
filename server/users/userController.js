var User = require('./userModel.js');
var Promise = require("bluebird");

module.exports = {

  signup: function(req, res, next) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    console.log('username going to be ', req.body.username)
    User.findOne({username: req.body.username}, function(err, existed) {
      if(existed) {
        console.log(req.body.username + ' has already sign up')
        //return res.redirect('/signin')
      } else {
        user.save(function(err, user) {
          if(err) {
            next(err);
          } else {
            res.json("user has been created. Please sign in again")
            //return res.redirect('/signin')
          }
        })
      }
    })
  },

  signin: function(req, res, next) {
    var password = req.body.password;

    User.findOne({username: req.body.username}, function(err, user) {
      console.log("username >>>>>>", req.body.username)
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
        //return res.redirect('/');
      }
    })
  }
}