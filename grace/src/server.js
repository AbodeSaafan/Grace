var express = require('express');
var path = require('path');
var bodyParse = require('body-parser');
var http = require('http');

var api = require('./routes/api');

var app = express();

/*
app.set('views',path.join(_dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
*/	

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,"")));
console.log(path.join(__dirname,""));
app.use(api);

var port = process.env.PORT || '3000';

app.set('port',port);

var server = http.createServer(app);

app.listen(port, function(){
	console.log("sever started "+port);
});