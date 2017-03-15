import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorizeService {

	// holds whether or not we made it
	private passed: boolean = false;
	// placeholder, abode required
	private token: string = "";

	constructor(private http: Http) { }

	signingUp(fName: string, lName: string, email: string, salt: string, hashedPass: string){
		let params: URLSearchParams = new URLSearchParams();
		params.set('_id', email);
		params.set('salt', salt);
		params.set('fName', fName);
		params.set('lName', lName);
		params.set('hashedPassword', hashedPass);

console.log(email);
		return this.http.put("http://localhost:3000/reg/a@gmail.com", JSON.stringify(params))
						.map(res => res.json());

		// have to find some way to catch errors
		// Observable<any> gives an error trying to do anything
		// will have to check that out
		/*return this.http.put("http://localhost:3000/reg", JSON.stringify(params))
						.map(res => res.json());<-Post*/
	}

	signIn (email: string, pass: string){
		return this.http.get("http://localhost:3000/signin/"+email).map(res => res.json());
	}


	// need to find a way to save tokens
	// and provide statuses
	// statuses should be based on shared tokens
	// assuming we'll implement tokens, here are some placeholders

	tokenMake(token: string): void{
		this.token = token;
		this.passed = true;
	}

	// when we want to log out we have to destroy the token
	tokenUnmake(): void{
		this.token = "";
		this.passed = false;
	}

	// so outside we should just call this if we ever want to check authentication status
	hasAuthenticated(): boolean{
		return this.passed;
	}

}
