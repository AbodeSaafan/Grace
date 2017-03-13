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

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,"")));
console.log(path.join(__dirname,""));
app.use(api);

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});*/

var port = process.env.PORT || '3000';

app.set('port',port);

var server = http.createServer(app);

app.listen(port, function(){
	console.log("sever started "+port);
});