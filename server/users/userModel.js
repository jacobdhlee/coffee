var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require("bluebird");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
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

  img: {
    type: String,
    data: Buffer,
  },

  credit: {
    type: Number,
    default: 0,
  },

  profile: {
    name: {
      type: String,
      default: '',
    },

    phone_number: {
      type: Number,
    },

    address: {
      type: String,
    },
  }
})

UserSchema.pre('save', function(next) {
  var user = this;
  if ( !user.isModified('password') ) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    })
  })

})

UserSchema.methods.comparedPassword = function(password) {
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


module.exports = mongoose.model('User', UserSchema);