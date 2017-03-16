var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var compiler = require('compilex');
var uuid = require('node-uuid');
var crypto = require('crypto');

/******************* Login/Register	*******************/
var db = mongojs('users');

  
router.get('/signinA', function(req,res){
	db.users.find(function(err,users){
		if(err){
			res.send(err);
		}
		else{

			res.json(users);
		}
	});
});


router.get('/signin', function(req,res){
	console.log("get the user "+req.query._id);
	db.users.findOne({_id: req.query._id},function(err,user){
		if(err|| user===null){
			console.log("Account does not exist");
			res.status(400);
			res.send(err);
		}
		else{
			console.log("working user "+req.query._id);
			const hash = crypto.createHash('sha256');
			hash.update(user.salt+req.query.pass);

			console.log("Account exists");
			//console.log(hash.digest('hex'));
			var hashHex = hash.digest('hex');
			if (hashHex === user.pass){
				var token = uuid.v4();
				db.users.update({_id: req.query._id},{$set:{token:token}});
				// Save token in db
				res.json(token);
			}
			else{
				console.log("Login unsuccessfull");
				res.status(400);
				res.send("Page access denied.");
			}
		}
	});
});










router.get('/checkToken', function(req, res){
	// TODO check token which is at 
	// req.query.token
	// return empty if invalid? 
	// maybe use headers?
	// return token if works?
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
    	user.salt = uuid.v4();
    	user.pass = user.pass

    	const hash = crypto.createHash('sha256');
	    hash.update(user.salt+user.pass);
	    user.pass = hash.digest('hex');

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
