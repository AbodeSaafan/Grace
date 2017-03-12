var express = require('express');
var path = require('path');
var compiler = require('compilex');
//var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname + '/public'));
//mongoose.connect('mongodb://root:abc@localhost/admin');
//var db = mongoose.connection;




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/guestCompilerView.html'));
})

app.get('/compile', function (req, res) {
  var options = {stats : true};
  compiler.init(options);
  var envData = { OS : "linux" };

  compiler.compilePython( envData , req.query.code , 
        function(data){ res.send(data); });
})






app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
})