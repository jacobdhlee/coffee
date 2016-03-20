var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./config/routes.js');
var User = require('./users/userModel.js');
var Store = require('./stores/storeModel.js');
var app = express();

mongoose.connect('mongodb://localhost:27017/coffee', function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log('connected database')
  }
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

routes(app, express);


app.listen(8000, function() {
  console.log('listening the port 8000')
});

module.exports = app;
