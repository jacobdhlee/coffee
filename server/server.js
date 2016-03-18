var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
//morgan is used for logging request details on terminal
var bodyParser = require('body-parser');
//bodyParser object exposes various factories to create middleware, 
//and will populate the req.body property with the parsed body or an empty object({})
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
//moran( format, (option) ) -> format is predefined name
//format predefined name, DEV is concise outpit colored by response bt development use
app.use(bodyParser.urlencoded({extended: true}));
//return middleware that only parse urlencoded bodies. This parser accepts only UTF-8 encoding of the body
app.use(bodyParser.json());
// returns middleware that only parses json
app.use(express.static(__dirname + '/../client'));
//express no depends on connect with exception of express.static. this function is based on server-static 
//and is responsible for serving static asset such as HTML, images and ETC..
//express.static(root, (option) ) -> root is root directory from which to serve statuc assets
routes(app, express);

// checked post work through postman and mongodb
// app.post('/adduser', function(req, res, next) {
//   var user = new User()
//   user.username = req.body.username;
//   user.password = req.body.password;

//   user.save(function(err){
//     if(err) {
//       return next(err)
//     } else {
//       res.json(req.body);
//     }
//   })
// })


app.listen(8000, function() {
  console.log('listening the port 8000')
});

module.exports = app;
