var express = require('express');
var path = require('path');
var compiler = require('compilex');
var app = express();

app.use(express.static(__dirname + '/public'));
 
var options = {stats : true};
compiler.init(options);

var envData = { OS : "linux" };


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/compilerView.html'));
})

app.get('/compile', function (req, res) {
  compiler.compilePython( envData , req.query.code , function(data){ res.send(data); });
})

app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
})