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

						oldID = checkUser._id;

						db.users.remove({_id: oldID});

						checkUser._id = user._newid

						/* Find the user in the database*/
						db.users.findOne({_id: user._newid}, 
							function(err, checkUser){

				    		/* Check if the user does not already exist*/
				    		if (checkUser === null){

				    			/* Update new user email */
				    			db.users.save(checkUser, function(err,user){
									/* Check if user created in the database*/
									if(err|| user === null){
							    		res.status(400);
							    		res.json({'status':false, 
									              'message':"Failed to connect: the "+ 
									              "user was not successfully created"});

					    			}
				        		});

				    			/* Update new file owner*/
								db.files.update({owner: oldID}, 
								{$set:{owner:user._newid}},{multi:true}, 
								function(err, file){
									if(err){
										res.status(400);
										res.json({'status':false, 
								      			  'message':"Failed to connect: this " +
								      			  " file does not exist"});
									}
								});
				    			
							
							}else{
				    			res.status(400);
				    			res.json({'status':false, 
									      'message':"Failed to connect: this "+
									      "user already exists",
									      'userlog':"The email enter is already in "+
									      "use. Please try another email."});
				    		}
				    	});
					}
					if (user.newpass){
				
						/* Creates a new hash using the pass sent by user*/
    					const hash = crypto.createHash('sha256');
    					hash.update(checkUser.salt + user.newpass);
    					saltedNewPass = hash.digest('hex');

						db.users.update({_id: user._id},{$set:{pass:saltedNewPass}});
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

/* Deletes an email account*/
router.post('/deleteAccount',function(req,res){

	userAccount = req.body;

	db.users.findOne({_id: userAccount._id}, function(err, checkUser){

		/* Check if the user exist in the database*/
		if (checkUser) {

			/* Creates a new hash using the pass sent by user*/
			const hash = crypto.createHash('sha256');
			hash.update(checkUser.salt+userAccount.pass);
			var hashHex = hash.digest('hex');

			/* Check if the hash matches the user hash in database*/
			if (hashHex === checkUser.pass){
						
				db.users.remove({_id: userAccount._id});

					   
				/* Update new file owner*/
				db.files.remove({owner: userAccount._id},{multi:true}, 
					function(err, file){
						if(err){
							res.status(400);
							res.json({'status':false, 
								      'message':"Failed to connect: this " +
									  " file does not exist"});
							}
						});
					    			
				}else{
					res.status(400);
					res.json({'status':false, 
						      'message':"Failed to connect: the password " + 
						      "is incorrect"});
				}	

			/* Successful delete*/
			res.json({'status':true, 
				      'message':"Account has been terminated."});	

		}else{
			res.status(400);
			res.json({'status':false, 
					  'message':"Failed to connect: this user " + 
					  "does not exist"});
		}
	});
});

/******************* Compiler *******************/

/* Gets the python compiled code*/
router.get('/compile', function(req, res){
	// Compile code here
	var options = {stats : true}
	compiler.init(options);
	var envData = { OS : "linux" };

	compiler.compilePython( envData , decodeURIComponent(req.query.code) , 
		function(data){ res.send(data); });

});


/******************* Files *******************/

var db = mongojs('files');

/* Gets all the files for a user*/
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

/* Creates a new file*/
router.post('/files/add', function(req, res){
	var userInput = req.body;
	var file = {owner: userInput.owner, 
		dateModified: userInput.dateModified, 
		fileName: userInput.fileName, file: decodeURIComponent(userInput.file) }
		db.files.save(file, function(err, file){
			if(err){
				res.status(400);
				res.send(err);
			}
			res.json({'status': true})
		});
	});

/* Saves a file*/
router.post('/files/save', function(req, res){
	var userInput = req.body;
	var file = {dateModified: userInput.dateModified, file: decodeURIComponent(userInput.file) }
	db.files.update({owner: userInput.owner, fileName:userInput.fileName}, {$set:file}, function(err, file){
		if(err){
			res.status(400);
			res.send(err);
		}
		res.json({'status': true})
	});
});

/* Deletes a file*/
router.post('/files/delete', function(req, res){
	var userInput = req.body;
	db.files.remove({owner: userInput.owner, fileName: userInput.fileName});
});

/******************* File Sharing *******************/

/* Gets a file based on a share link*/
router.get('/share', function(req, res){

	findShareID = req.query.shareID;

	/* Check if no share link was provided*/
	if (findShareID === null){
		res.status(400);
			res.json({'status':false, 
					      'message':"Failed to connect: there is no file " + 
					      "with this link"});

	}else{
		db.files.find({shareID: req.query.shareID},function(err,file){

			/* Check if the file does not exist with the link*/
			if(err|| file===null){
				res.status(400);
				res.json({'status':false, 
						      'message':"Failed to connect: this file " + 
						      "does not exist"});

			}else{
				file.status = true;
				res.send(file[0]);
			}

	});
	}
});

/* Creates a share link for a file*/
router.post('/share/create', function(req, res){

	var shareFile = req.body;

	var newShareID = uuid.v4().toString().replace(/-/g,"");

	db.files.update({owner: shareFile.owner, fileName:shareFile.fileName}, 
					{$set:{shareID:newShareID}}, 
					function(err, file){

						if(err){
							res.status(400);
							res.json({'status':false, 
					      			  'message':"Failed to connect: this " +
					      			  " file does not exist"});
						}

						res.json({'status': true})
					});
});


/* Removes a share link from a file*/
router.post('/share/remove', function(req, res){

	var shareFile = req.body;

	db.files.update({owner: shareFile.owner, fileName:shareFile.fileName}, 
					{$set:{shareID:null}}, 
					function(err, file){

						/* Failed to remove the file*/
						if(err){
							res.status(400);
							res.json({'status':false, 
					      			  'message':"Failed to connect: this " +
					      			  " file does not exist"});
						}

						res.json({'status': true})
					});
});





module.exports = router;