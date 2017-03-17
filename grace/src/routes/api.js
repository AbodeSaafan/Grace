var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var compiler = require('compilex');
var uuid = require('node-uuid');
var crypto = require('crypto');

/******************* Login/Register	*******************/
var db = mongojs('users');

router.get('/checkToken', function(req, res){
	// TODO check token which is at 
	// req.query.token
	// return empty if invalid? 
	// maybe use headers?
	// return token if works?
	console.log(req.query._id);
	db.users.findOne({_id: req.query._id}, function(err, user){
		if (err || user === null){
			res.status(400);
			res.send(err);
		}
		else {
			console.log(222);
			console.log(user.token);
			console.log(req.query.token);
			if (user.token == req.query.token){
				console.log(111);
				res.json(user.token);
			}
			else {
				res.status(400);
				res.send(err);
			}
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
				res.json({'token':token});
			}
			else{
				console.log("Login unsuccessfull");
				res.status(400);
				res.send("Page access denied.");
			}
		}
	});
});

router.post('/deleteToken', function(req,res){
	var user = req.body;
	if (!user.token || !user._id){
		res.status(400);
		res.json({"error":"there's no user with this somehow lol"})
	}
	else {
		db.users.findOne({_id: user._id}, function(err, checkUser){
			console.log(checkUser._id);
			if (checkUser) {
				db.users.update({_id: checkUser._id},{$set:{token:null}});
			}
			else {
				res.status(400);
				res.json({"error" : "update error"})
			}
		});
	}
});

router.post('/changeUser', function(req,res){
	var user = req.body;
	if (!user._id){
		res.status(400);
		res.json({"error":"there's no user with this somehow lol"})
	}
	else {
		db.users.findOne({_id: user._id}, function(err, checkUser){
			if (checkUser) {
				const hash = crypto.createHash('sha256');
				hash.update(user.salt+req.query.pass);
				var hashHex = hash.digest('hex');

				if (hashHex === user.pass){
					if (user._newid){
						db.users.update({_id: user._id},{$set:{_id:user._newid}});
					}
					if (user.newpass){
						db.users.update({_id: user._id},{$set:{pass:user.newpass}});
					}
					if (user.fname){
						db.users.update({_id: user._id},{$set:{fName:user.fName}});
					}
					if (user.lname){
						db.users.update({_id: user._id},{$set:{lname:user.lName}});
					}
				}else {
					res.status(400);
					res.json({"error" : "incorrect pass"})
				}
			}
			else {
				res.status(400);
				res.json({"error" : "update error"})
			}
		});
	}
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

		db.users.findOne({_id: user._id}, function(err, checkUser){

    		// if no user exists w/same email, we can register
    		if (checkUser === null){

    			user.salt = uuid.v4();
    			user.pass = user.pass;

    			const hash = crypto.createHash('sha256');
    			hash.update(user.salt+user.pass);
    			user.pass = hash.digest('hex');

			    // save
			    db.users.save(user, function(err,user){

			    	if(err){
			    		res.status(400);
			    		res.send(err);
			    	}

		            // set tokens
		            var token = uuid.v4();
		            db.users.update({_id: req.query._id},{$set:{token:token}});
		            res.json(token);

		        });
			}

    		// 
    		else{
    			res.status(400);
    			res.send(err);
    		}

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



/******************* Files *******************/

var db = mongojs('files');

router.get('/files', function(req, res){

	db.files.find({owner: req.query.owner},function(err,file){
		var files = [];
		if(err|| file===null){
			res.status(406);
			res.send(err);
		} else file.forEach( function(ownedFile) {
			files.push(ownedFile); 
		});
		res.send(files);
	});
});

router.post('/files', function(req, res){
	var file = {owner: req.query.owner, dateModified: req.query.dateModified, fileName: req.query.fileName, file: req.query.file }
	db.files.save(file, function(err, file){
		if(err){
			res.status(400);
			res.send(err);
		}
		res.json("posted file")
	});
});


module.exports = router;