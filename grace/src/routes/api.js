var express = require('express');
var router = express.Router();
//var mongojs = require('mongojs');
var compiler = require('compilex');

/******************* Login/Register	*******************/

router.get('/api', function(req,res){
	res.send("USER API");
});

router.get('/test', function(req, res){
	res.send(req.query.id);
	// Test this by going to http://localhost:3000/test?id="abode"
});

/******************* Compiler *******************/

router.get('/compile', function(req, res){
	// Compile code here
	// code = req.query.code
	var options = {stats : true};
	compiler.init(options);
	var envData = { OS : "linux" };

	compiler.compilePython( envData , req.query.code , 
		function(data){ res.send(data); });


});









module.exports = router;