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
    //data type set buffer so that store as array
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

  // history: [{
  //   paid: {
  //     type: Schema.Types.ObjectId,
  //     ref: '',
  //   }
  // }]
})

// hash the password before save it to database
// using pre which means defines a pre hook for the document. first parameter is method(string) and second is callback
UserSchema.pre('save', function(next) {
  var user = this;
  if ( !user.isModified('password') ) {
    //mongoose isModified take path as a parameter and checks if a path has been modified and return boolean
    //if modified the do next()
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    // bcrypt.gensalt(round, callback) *round is optional and means that the cost of processing the data  if not put numnber then default is 10.
    //callback function salt is generated salt
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      // bcypt.has(data, salt ,cb) * data is data to be encryped, salt is to be used to hash the password 
      // callback hash is provding encrypted form
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    })
  })

})

//compare password in the database and user type in

UserSchema.methods.comparedPassword = function(password) {
  //create my own schema methids
  var savedPassword = this.password;
  //return bcrypt.compareSync(password, this.password);
  //compare(data, encrpted data, cb)
  return new Promise(function(reslove, reject){
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
// mongoose.model returns model it definds and model.exports allow that it can easily create instance of model