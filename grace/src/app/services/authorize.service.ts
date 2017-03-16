import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import 'rxjs/add/operator/map';

var gt
@Injectable()
export class AuthorizeService {

	// holds whether or not we made it
	private passed: boolean = false;
	// placeholder, abode required
	private token: string = "";

	private email: string = "";

	constructor(private http: Http, private router: Router) {}

	signUp(fName: string, lName: string, email: string, pass: string){
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', email);
		params.set('fName', fName);
		params.set('lName', lName);
		params.set('pass', pass);
		
		var youTrash = this.router;


		return this.http.post("http://localhost:3000/register", params)
						.subscribe(token => {
        	localStorage.setItem('token',JSON.stringify(token));
        	localStorage.setItem('email',email);
        	youTrash.navigateByUrl('/dash');
        },
    		function(error){
    			console.log("we fucked up");
    			alert("Invalid email");
    		}
        );

		// have to find some way to catch errors
		// Observable<any> gives an error trying to do anything
		// will have to check that out
		/*return this.http.put("http://localhost:3000/reg", JSON.stringify(params))
						.map(res => res.json());<-Post*/
	}


	signOut (){
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', localStorage.getItem('email'));
		params.set('token', localStorage.getItem('token'));
		this.isAuthenticated().subscribe(data=>{
			this.http.post("http://localhost:3000/deleteToken", params).subscribe(logout => {
				alert("successful logout");
			}, function(err) {
				alert("unsuccessful logout");
			});
		},function(err) {
				alert("unsuccessful logout");
		});

		localStorage.removeItem('email');
		localStorage.removeItem('token');
		this.router.navigateByUrl('/');
			
	}

	// need to find a way to save tokens
	// and provide statuses
	// statuses should be based on shared tokens
	// assuming we'll implement tokens, here are some placeholders

	getEmail(){
		return this.email;
	}

	// so outside we should just call this if we ever want to check authentication status
	hasAuthenticated(): boolean{
		/*Call api, make sure token valid<= true or false, before return true set email, if false set email empty*/
		
		if (this.passed){
			this.email = "blahblah"
		}else{
			this.email = "";
		}

		return this.passed;
	}


	signIn (email: string, pass: string){
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', email);
		params.set('pass', pass);
		var youTrash = this.router;
		return this.http.get("http://localhost:3000/signin", {
			search: params
		}).subscribe(token => {
        	localStorage.setItem('token',JSON.stringify(token));
        	localStorage.setItem('email',email);
        	youTrash.navigateByUrl('/dash');
        },
    		function(error){
    			console.log("we fucked up");
    			alert("Invalid email or password");
    		}
        );
	}

	isAuthenticated(){
		// make an api request to make sure token stored at 
		// localStorage.get('token') is a good token
		// better than using hasAuthenticated (depercate that eventually)
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', localStorage.getItem('email'));
		params.set('token', localStorage.getItem('token'));

		return this.http.get("http://localhost:3000/checkToken", {
			search: params
		}).map(res => res.json());
	}

}
