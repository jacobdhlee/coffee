var Store = require('./storeModel.js');
var Promise = require("bluebird");
var jwt = require('jwt-simple');
var auth = require('../auth.js');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


var storeToken = function(store) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: store.id, iat: timestamp }, auth.secret);
}

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: auth.secret
};

module.exports = {

  signup: function(req, res, next) {
    var store = new Store();
    store.username = req.body.username;
    store.password = req.body.password;
    Store.findOne({username: req.body.username}, function(err, existed) {
      if(existed) {
        console.log(req.body.username + ' has already sign up')
      } else {
        store.save(function(err, store) {
          if(err) {
            next(err);
          } else {
            res.json({token: storeToken(store)})
          }
        })
      }
    })
  },

  signin: function(req, res, next) {
    var username = req.body.username
    var password = req.body.password;

    Store.findOne({username: username}, function(err, store) {
      if(err) {
        return next(err);
      } else {
        if(!store) {
          res.json('username is not match. Please sign up first')
        } 
        store.comparedPassword(password)
            .then(function(foundStore) {
              if(foundStore){
                res.json({token: storeToken(store)});            
              } else {
                res.json('No store')
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
      Store.findById(payload.sub, function(err, store){
        if( err ) {
          return done(err, false);
        }
        if( store ) {
          done(null, store);
        } else {
          done(null, false);
        }
      })
    })    
  }
}