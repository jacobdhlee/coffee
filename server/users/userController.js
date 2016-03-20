var User = require('./userModel.js');
var Promise = require("bluebird");
var jwt = require('jwt-simple');
var auth = require('../auth.js');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var userToken = function(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, auth.secret);
};

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: auth.secret
};

module.exports = {

  signup: function(req, res, next) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    console.log('username going to be ', req.body.username)
    User.findOne({username: req.body.username}, function(err, existed) {
      if(existed) {
        console.log(req.body.username + ' has already sign up')
      } else {
        user.save(function(err, user) {
          if(err) {
            next(err);
          } else {
            res.json({token: userToken(user)})
          }
        })
      }
    })
  },

  signin: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, user) {
      console.log("username >>>>>>", req.body.username)
      if(err) {
        return next(err);
      } else {
        if(!user) {
          res.json('username is not match. Please sign up first')
        }
      return user.comparedPassword(password)
          .then(function(foundUser) {
            if(foundUser) {
              res.json({token: userToken(user)})            
            } else {
              res.json('No user')
            }
          })
          .catch(function(err){
            console.error(err);
            res.json('Password is not match. Please check password')
          })
      }
    })
  },

  jwtLogin: function() {
    return new JwtStrategy(jwtOptions, function(payload, done){
      User.findById(payload.sub, function(err, user){
        if( err ) {
          return done(err, false);
        }
        if( user ) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
    })    
  }
}
