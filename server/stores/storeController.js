var Store = require('./storeModel.js');
var Promise = require("bluebird");

module.exports = {

  signup: function(req, res, next) {
    var store = new Store();
    store.username = req.body.username;
    store.password = req.body.password;
    Store.findOne({username: req.body.username}, function(err, existed) {
      if(existed) {
        console.log(req.body.username + ' has already sign up')
        //return res.redirect('/store/signin')
      } else {
        store.save(function(err, store) {
          if(err) {
            next(err);
          } else {
            res.json("store has been created. Please sign in again")
            //return res.redirect('/store/signin')
          }
        })
      }
    })
  },

  signin: function(req, res, next) {
    var password = req.body.password;

    Store.findOne({username: req.body.username}, function(err, store) {
      if(err) {
        return next(err);
      } else {
        if(!store) {
          res.json('username is not match. Please sign up first')
        } 
        if(!store.comparedPassword(password)) {
          res.json('Password is not match. Please check password')
        } 
        res.json('successfully login')
        //return res.redirect('/');
      }
    })
  }
}