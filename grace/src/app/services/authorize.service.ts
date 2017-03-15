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

	signingUp(fName: string, lName: string, _id: string, salt: string, hashedPass: string){
		return this.http.put('/register', {
			firstName: fName,
			lastName: lName,
			_id: _id,
			salt: salt,
			hashedPassword: hashedPass
		}).map(res => res.json());
		// have to find some way to catch errors
		// Observable<any> gives an error trying to do anything
		// will have to check that out
	}

	signingIn (email: string, salt: string, hashedPass: string){
		let params: URLSearchParams = new URLSearchParams();
		// need to ask julius about params
		params.set('_id', email);
		params.set('salt', salt);
		params.set('hashedPassword', hashedPass);
		
		return this.http.get('/signin', {
			search: params
		}).map(res => res.json());

		// again with the errors... julius required
	}

	signIn (email: string, pass: string){
		let params: URLSearchParams = new URLSearchParams();
		// need to ask julius about params
		params.set('_id', email);
		
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
