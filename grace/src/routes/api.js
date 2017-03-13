var express = require('express');
var router = express.Router();
//var mongojs = require('mongojs');

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
});









module.exports = router;