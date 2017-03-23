import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthorizeService } from './authorize.service';
import {Router} from '@angular/router'

@Injectable()
export class FileStorageService {

	apiURL:string = "http://localhost:3000/files";
	shareAPI:string = "http://localhost:3000/share";
	userEmail: string = "";

	constructor(private http: Http, private authorizeService: AuthorizeService, private router: Router) { }

	getMyFiles(){
		this.userEmail = localStorage.getItem('email');
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', this.userEmail);
		return this.http.get(this.apiURL, {
			search: params
		}).map(res => res.json());
	}

	addAFile(fileName: string, email: string, codeFile: string){
		codeFile = encodeURIComponent(codeFile);
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', email);
		params.set('fileName', fileName);
		params.set('file', codeFile);
		params.set('dateModified', new Date().toLocaleDateString());
		return this.http.post(this.apiURL+"/add",params).map(res => res.json());
	}

	deleteFile(fileName: string, email: string){
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', email);
		params.set('fileName', fileName);
		return this.http.post(this.apiURL+"/delete",params).map(res => res.json());
	}

	saveFile(fileName: string, email: string, codeFile: string){
		codeFile = encodeURIComponent(codeFile);
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', email);
		params.set('fileName', fileName);
		params.set('file', codeFile);
		params.set('dateModified', new Date().toLocaleDateString());
		return this.http.post(this.apiURL+"/save",params).map(res => res.json());
	}

	createAShare(fileName: string, email: string){
		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', email);
		params.set('fileName', fileName);

		return this.http.post(this.shareAPI + "/create",params)
		.map(res => res.json());
	}

	deleteAShare(fileName: string, email: string){

		let params: URLSearchParams = new URLSearchParams();
		params.set('owner', email);
		params.set('fileName', fileName);

		return this.http.post(this.shareAPI + "/remove",params)
		.map(res => res.json());
	}

	getSharedFile(shareID:string){

		let params: URLSearchParams = new URLSearchParams();
		params.set('shareID', shareID);

		return this.http.get(this.shareAPI, {
			search: params
		}).map(res => res.json());
	}
}