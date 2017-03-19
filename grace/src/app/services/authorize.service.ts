import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizeService {

	/* The address to connect to the api*/
	private apiConnection = "http://localhost:3000";

	constructor(private http: Http, private router: Router) {}

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
    				alert("Failed to create a new account:\n"+
    					  "The email contains invalid characters or " +
    					  "an account with the email " + email + " already"+
    					  "exists. Please enter a new email.");
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

        			/* Moves user to dashboard*/
        			routeUser.navigateByUrl('/dash');

        		/* Failed to log the your in*/
        		},function(error){
    				alert("Failed to login:\n"+
    					  "The email or password entered is incorrect.\n"+
    					  "Please signin using the correct credentials");
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
					alert("successful logout");
				/* Failed to remove the token from the user*/
				}, function(err) {
					alert("You need to log in to log out. Please log in");
			});

		/* Token did not match*/
		},function(err) {
				alert("This is unusual:\n"+
					  "It seems that this account does not belong to you");
		});

		/* Remove credentials of the user before signout*/
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		localStorage.removeItem('fname');
		localStorage.removeItem('lname');

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

		/* Check user account for token match before changing user settings*/
		this.isAuthenticated()
			.subscribe(data=>{

				/* makes a changeUser call to api*/
				this.http.post(this.apiConnection + "/changeUser", params)
					.subscribe(logout => {
						alert("Your changes have been made");

						/* Set the users email and token upon login*/
        				localStorage.setItem('token',data.json().token);
        				localStorage.setItem('lname',data.json().lname);
        				localStorage.setItem('fname',data.json().fname);
        				localStorage.setItem('email',data.json().email);


					/* Failed to change settings due to incorrect password*/
					}, function(err) {
						alert("Failed to change settings:\n"+
							  "Please enter the correct password to make"+
							  "changes.");
					});

					/* Failed to change settings due to incorrect token*/
					},function(err) {
						alert("This is unusual:\n"+
					 		  "It seems that this account does "+
					 		  "not belong to you");
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
