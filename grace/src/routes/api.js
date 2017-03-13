var express = require('express');
var router = express.Router();
//var mongojs = require('mongojs');

router.get('/api', function(req,res){
	res.send("USER API");
});

module.exports = router;