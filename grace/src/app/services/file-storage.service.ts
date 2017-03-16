import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthorizeService } from './authorize.service';
import {Router} from '@angular/router'

@Injectable()
export class FileStorageService {

	apiURL:string = "http://localhost:3000/files";
	userEmail: string = "";

	constructor(private http: Http, private authorizeService: AuthorizeService, private router: Router) { }

	getMyFiles(token: string){
		if (!this.authorizeService.isAuthenticated()){
			this.router.navigateByUrl('/');
		} else{
			// Good to go get the files associated with the email
			//this.userEmail = this.authorizeService.getEmail();
			this.userEmail = localStorage.getItem('email');
			let params: URLSearchParams = new URLSearchParams();
			params.set('owner', this.userEmail);
			return this.http.get(this.apiURL, {
				search: params
			}).map(res => res.json());
		}
	}

	addAFile(token: string, fileName: string, email: string, codeFile: string){
		if (!this.authorizeService.isAuthenticated()){
			this.router.navigateByUrl('/');
		} else {
			let params: URLSearchParams = new URLSearchParams();
			params.set('owner', email);
			params.set('fileName', fileName);
			params.set('file', codeFile);
			params.set('dateModified', new Date().toLocaleDateString());
			return this.http.post(this.apiURL, {
				search: params
			}).map(res => res.json());
		}
	}

}
