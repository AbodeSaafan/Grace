var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var compiler = require('compilex');
var uuid = require('node-uuid');
var crypto = require('crypto');

/******************* Token *******************/
var db = mongojs('users');

/* Checks if user token matches the database*/
router.get('/checkToken', function(req, res){

	/* Find the user in the database*/
	db.users.findOne({_id: req.query._id}, function(err, user){
		/* user found in the database*/
		if (err || user === null){
			res.status(400);
			res.json({'status':false, 
					  'message':"Failed to connect: this user " + 
					  "does not exist"});

		/* user not found in database*/
		}else {

			/* Check if the user token matches with the database*/
			if (user.token === req.query.token){
				res.json({'token':user.token, 'status':true});

			}else {
				res.status(400);
				res.json({'status':false, 
					      'message':"Failed to connect: the user " + 
					      "token does not match"});
			}
		}
	});
});

/* Delete the user token in the database*/
router.post('/deleteToken', function(req,res){

	var user = req.body;

	/* Check if the user is a valid user with a token*/
	if (!user.token || !user._id){
		res.status(400);
		res.json({'status':false, 
				  'message':"Failed to connect: this user " + 
				  "is not a valid user"});
	}
	else {

		/* Find the user in the database*/
		db.users.findOne({_id: user._id}, function(err, checkUser){

			/* Check if user exists in the database*/
			if (checkUser) {

				/* Delete the token from the database*/
				db.users.update({_id: checkUser._id},{$set:{token:null}});
				res.json({'status':true});

			}else {
				res.status(400);
				res.json({'status':false, 
					      'message':"Failed to connect: this user " + 
					      "does not exist"});
			}
		});
	}
});

/******************* Login/Register	*******************/

/* Logs the user in*/
router.get('/signin', function(req,res){

	/* Find the user in the database*/
	db.users.findOne({_id: req.query._id},function(err,user){

		/* Check if user exists in the database*/
		if(err|| user === null){
			res.status(400);
			res.json({'status':false, 
					  'message':"Failed to connect: this user " + 
					  "does not exist"});
		
		}else{
			
			/* Creates a new hash using the pass sent by user*/
			const hash = crypto.createHash('sha256');
			hash.update(user.salt+req.query.pass);
			var hashHex = hash.digest('hex');

			/* Check if the hash matches the user hash in database*/
			if (hashHex === user.pass){

				/* Create a new token for the login*/
				var token = uuid.v4();

				/* Update the new token for the user in the database*/
				db.users.update({_id: req.query._id},{$set:{token:token}});
				
				res.json({'token':token, 'fname':user.fName, 
					      'lname':user.lName, 'email':user._id, 
					      'status':true});
			
			}else{
				res.status(400);
				res.json({'status':false, 
					      'message':"Failed to connect: the password " + 
					      "is incorrect"});
			}
		}
	});
});

/* Registers the user*/
router.post('/register', function(req,res){

	var user = req.body;
	
	/* Check if the user is a valid user with a valid password*/
	if (!user._id || !user.pass){
		res.status(400);
		res.json({'status':false, 
				  'message':"Failed to connect: this user " + 
				  "is not a valid user"});

	}else{

		/* Find the user in the database*/
		db.users.findOne({_id: user._id}, function(err, checkUser){

    		/* Check if the user does not already exist*/
    		if (checkUser === null){

    			/* Create a new salt for the new user*/
    			user.salt = uuid.v4();

    			/* Creates a new hash using the pass sent by user*/
    			const hash = crypto.createHash('sha256');
    			hash.update(user.salt+user.pass);
    			user.pass = hash.digest('hex');

    			/* Create a new token for the login*/
    			user.token = uuid.v4();

			    /* Creates the new user in the database*/
			    db.users.save(user, function(err,user){

			    	/* Check if user created in the database*/
					if(err|| user === null){
			    		res.status(400);
			    		res.json({'status':false, 
					              'message':"Failed to connect: the user " + 
					              "was not successfully created"});

			    	}else{

			    		res.json({'token':user.token, 'fname':user.fName, 
					              'lname':user.lName, 'email':user._id, 
					              'status':true});
			    	}
		        });
			
			}else{
    			res.status(400);
    			res.json({'status':false, 
					      'message':"Failed to connect: this user " + 
					      "already exists"});
    		}

    	});	

	}

});

/******************* User Settings *******************/

/* Changes the user settings*/
router.post('/changeUser', function(req,res){

	var user = req.body;

	/* Check if the user is a valid user with a valid password*/
	if (!user._id || !user.pass){
		res.status(400);
		res.json({'status':false, 
				  'message':"Failed to connect: this user " + 
				  "is not a valid user"});
	
	}else {

		/* Find the user in the database*/
		db.users.findOne({_id: user._id}, function(err, checkUser){

			/* Check if the user exist in the database*/
			if (checkUser) {

				/* Creates a new hash using the pass sent by user*/
				const hash = crypto.createHash('sha256');
				hash.update(checkUser.salt+user.pass);
				var hashHex = hash.digest('hex');

				/* Check if the hash matches the user hash in database*/
				if (hashHex === checkUser.pass){
					
					/* Change user settings*/
					if (user._newid){
						db.users.update({_id: user._id},{$set:{_id:user._newid}});
						checkUser._id = user._newid;
					}
					if (user.newpass){
						db.users.update({_id: user._id},{$set:{pass:user.newpass}});
					}
					if (user.fName){
						db.users.update({_id: user._id},{$set:{fName:user.fName}});
						checkUser.fName = user.fName;
					}
					if (user.lName){
						db.users.update({_id: user._id},{$set:{lname:user.lName}});
						checkUser.lName = user.lName;
					}

					res.json({'token':checkUser.token, 'fname':checkUser.fName, 
					          'lname':checkUser.lName, 'email':checkUser._id, 
					          'status':true});

				}else {
					res.status(400);
					res.json({'status':false, 
					          'message':"Failed to connect: the password " + 
					          "is incorrect"});
				}

			}else {
				res.status(400);
				res.json({'status':false, 
					      'message':"Failed to connect: this user " + 
					      "does not exist"});
			}
		});
	}
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