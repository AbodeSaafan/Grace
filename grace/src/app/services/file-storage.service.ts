import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthorizeService } from './authorize.service';

@Injectable()
export class FileStorageService {

	apiURL:string = "http://localhost:3000/files";
	userEmail: string = "";

	constructor(private http: Http, private authorizeService: AuthorizeService) { }

	getMyFiles(token: string){
		if (this.authorizeService.hasAuthenticated()){
			// Good to go get the files associated with the email
			this.userEmail = this.authorizeService.getEmail();
			let params: URLSearchParams = new URLSearchParams();
			params.set('email', this.userEmail);
			this.http.get(this.apiURL, {
				search: params
			}).map(res => res.json());
		} else {
			return ;
		}
	}

}