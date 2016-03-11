var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost:27017/coffee');

app.use('/app', express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.listen(8000, function() {
  console.log('listening the port 8000')
});
