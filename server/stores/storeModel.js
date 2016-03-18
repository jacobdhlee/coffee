var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');


var Schema = mongoose.Schema;

var StoreSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
  },

  profile: {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    description: {
      type: String,
    },
    menu: {
      type: String,
    },
    govID: {
      type: String,
    }
  },

  like: {
    type: Number
  },
});

StoreSchema.pre('save', function(next){
  var store = this;
  if( !store.isModified('password') ) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return next(err);
    }
    bcrypt.hash(store.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      }
      store.password = hash;
      store.salt = salt;
      next();
    })
  })
})

StoreSchema.methods.comparedPassword = function(password) {
  var savedPassword = this.password;
  return new Promise(function(resolve, reject){
    bcrypt.compare(password, savedPassword, function( err, isMatch ) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
}

module.exports = mongoose.model('Store', StoreSchema);