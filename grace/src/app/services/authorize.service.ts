import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import 'rxjs/add/operator/map';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthorizeService {

	/* The address to connect to the api*/
	private apiConnection = "http://localhost:3000";

	constructor(private http: Http, private router: Router,public snackBar: MdSnackBar) {}

	/**** Set of user methods ****/

	/* signUp creates a new user */
	signUp(fName: string, lName: string, email: string, pass: string){

		/* Set params to be sent to api*/
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', email);
		params.set('fName', fName);
		params.set('lName', lName);
		params.set('pass', pass);
		
		var routeUser = this.router;

		/* makes a register call to the api*/
		return this.http.post(this.apiConnection + "/register", params)
				.subscribe(data => {

					console.log(1);
					/* Store token and email upon successful creation*/
        			localStorage.setItem('token',data.json().token);
        			localStorage.setItem('email',email);
        			localStorage.setItem('fname',fName);
        			localStorage.setItem('lname',lName);

        			/* Move to user dashboard*/
        			routeUser.navigateByUrl('/dash');
        		},function(error){
        			/* Message for failed account creation*/
        			this.snackBar.open("Failed to create account with this email",
        							   'Okay' ,{duration: 5000});
    			}
        );
	}

	/* signIn logs the user in */
	signIn (email: string, pass: string){

		/* Set params to be sent to api*/
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', email);
		params.set('pass', pass);

		var routeUser = this.router;

		/* makese signin call to api*/
		return this.http.get(this.apiConnection + "/signin", {search: params})
				.subscribe(data => {

					/* Set the users email and token upon login*/
        			localStorage.setItem('token',data.json().token);
        			localStorage.setItem('lname',data.json().lname);
        			localStorage.setItem('fname',data.json().fname);
        			localStorage.setItem('email',data.json().email);

        			/* Set default color*/
        			if (localStorage.getItem('theme') === null)
        				localStorage.setItem('theme','light');

        			/* Moves user to dashboard*/
        			routeUser.navigateByUrl('/dash');

        		/* Failed to log the your in*/
        		},function(error){
        			this.snackBar.open("Failed to login: "+
        							   "Please signin using the correct credentials.",
        							   'Okay' ,{duration: 5000});
    			}
    		);
	}

	/* signOut logs the user off */
	signOut (){

		/* Set params to be sent to api*/
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', localStorage.getItem('email'));
		params.set('token', localStorage.getItem('token'));

		/* Check user account for token match before signout*/
		this.isAuthenticated().subscribe(data=>{

			/* Upon successful token check remove the token from the user*/
			this.http.post(this.apiConnection + "/deleteToken", params)
				/* Removed token from the user*/
				.subscribe(logout => {
					/* successful logout*/
				/* Failed to remove the token from the user*/
				}, function(err) {
					this.snackBar.open("You need to log in to log out. "+
        							   "Please log in.",
        							   'Okay' ,{duration: 5000});
			});

		/* Token did not match*/
		},function(err) {
				this.snackBar.open("Failed to connect: "+
        						   "An error has occurred. ",
        						   'Okay' ,{duration: 5000});
		});

		/* Remove credentials of the user before signout*/
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		localStorage.removeItem('fname');
		localStorage.removeItem('lname');
		localStorage.removeItem('codeForUser');

		/* take user to main page*/
		this.router.navigateByUrl('/');
			
	}

	/**** Set of Change methods ****/

	private changeUser(fName: string, lName: string, email: string, 
									pass: string, currentpass: string){

		/* Set params to be sent to api*/
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', localStorage.getItem('email'));
		params.set('fName', fName);
		params.set('lName', lName);
		params.set('pass', currentpass);
		params.set('_newid',email);
		params.set('newpass', pass);

		var newbar = this;
		/* Check user account for token match before changing user settings*/
		this.isAuthenticated()
			.subscribe(data=>{

				/* makes a changeUser call to api*/
				this.http.post(this.apiConnection + "/changeUser", params)
					.subscribe(logout => {
						
						newbar.snackBar.open("Changes successful: "+
        							   		 "Changes will be reflected on the next login",
        							   		 'Okay' ,{duration: 5000});

						/* Set the users email and token upon login*/
        				localStorage.setItem('token',logout.json().token);
        				localStorage.setItem('lname',logout.json().lname);
        				localStorage.setItem('fname',logout.json().fname);
        				localStorage.setItem('email',logout.json().email);
        				console.log(data.lname);


					/* Failed to change settings due to incorrect password*/
					}, function(err) {
						this.snackBar.open("Failed to change settings.",
        							       'Okay' ,{duration: 5000});
					});

				/* Failed to change settings due to incorrect token*/
				},function(err) {
					this.snackBar.open("Failed to connect: "+
					 	  			   "An error has occurred.",
        							   'Okay' ,{duration: 5000});
			});
	}

	/* Change email settings by making a call to changeUser*/
	changeEmail(email: string, pass: string){
		this.changeUser(null,null,email,null,pass);
	}

	/* Change password settings by making a call to changeUser*/
	changePass(pass: string, currentpass: string){
		this.changeUser(null,null,null,pass,currentpass);
	}

	/* Change fname settings by making a call to changeUser*/
	changeFname(fName: string, pass: string){
		this.changeUser(fName,null,null,null,pass);
	}

	/* Change lname settings by making a call to changeUser*/
	changeLname(lName: string, pass: string){
		this.changeUser(null,lName,null,null,pass);
	}

	/* Deletes the account*/
	deleteEmail(pass: string){

		/* Set params to be sent to api*/
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', localStorage.getItem('email'));
		params.set('pass', pass);

		var newbar = this;

		this.isAuthenticated()
			.subscribe(data=>{

				/* makes a changeUser call to api*/
				this.http.post(this.apiConnection + "/deleteAccount", params)
					.subscribe(logout => {
						newbar.snackBar.open("Your account has been successfully deleted.",
        							         'Okay' ,{duration: 5000});

						/* Remove credentials of the user before signout*/
						localStorage.removeItem('email');
						localStorage.removeItem('token');
						localStorage.removeItem('fname');
						localStorage.removeItem('lname');
						localStorage.removeItem('codeForUser');


					/* Failed to change settings due to incorrect password*/
					}, function(err) {
						this.snackBar.open("Account deletion failed.",
        							       'Okay' ,{duration: 5000});
					});

				/* Failed to change settings due to incorrect token*/
				},function(err) {
					this.snackBar.open("Failed to connect: "+
					 	  			   "An error has occurred.",
        							   'Okay' ,{duration: 5000});
			});
	}

	/**** Set of Get methods ****/

	getEmail(){
		return localStorage.getItem('email');
	}

	getFname(){
		return localStorage.getItem('fname');
	}

	getLname(){
		return localStorage.getItem('lname');
	}

	/* Checks if the account token matches*/
	isAuthenticated(){

		/* Set params to be sent to api*/
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', localStorage.getItem('email'));
		params.set('token', localStorage.getItem('token'));

		/* Check if the tokens match*/
		return this.http.get(this.apiConnection + "/checkToken",
					{search: params}).map(res => res.json());
	}

}
