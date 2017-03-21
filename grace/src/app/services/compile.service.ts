import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompileService {

	apiURL:string = "http://localhost:3000/compile";

	constructor(private http: Http) { }

	compileCode(code: string) {
		code = encodeURIComponent(code);
		let params: URLSearchParams = new URLSearchParams();
		params.set('user', 'guest');
		params.set('code', code);
		return this.http.get(this.apiURL, {
			search: params
		}).map(res => res.json());
	}

}
