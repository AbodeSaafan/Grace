var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var compiler = require('compilex');
// should we consifer using passport

/******************* Login/Register	*******************/
var db = mongojs('users');
  
router.get('/signin', function(req,res){
	db.users.find(function(err,users){
		if(err){
			res.send(err);
		}
		else{
			res.json(users);
		}
	});
});

router.get('/signin/:id', function(req,res){
	db.users.findOne({_id: req.params.id},function(err,user){
		if(err){
			res.send(err);
		}
		else{
			res.json(user);
		}
	});
});

router.post('/register', function(req,res){
    var user = req.body;
    console.log(user._id);
    console.log(user.pass);
    if (!user._id || !(user.pass)){
        res.status(400);
        res.json({"error":"User not created"});

    }
    else{
        db.users.save(user, function(err,user){
            if(err){
                res.send(err);
            }
            res.json(JSON.stringify(user));
        });
    }
    
});

router.get('/test', function(req, res){
	res.send(req.query.id);
	// Test this by going to http://localhost:3000/test?id="abode"
});

/******************* Compiler *******************/

router.get('/compile', function(req, res){
	// Compile code here
	// code = req.query.code
	var options = {stats : true}
	compiler.init(options);
	var envData = { OS : "linux" };

	compiler.compilePython( envData , req.query.code , 
		function(data){ res.send(data); });


});









module.exports = router;
