import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompileService {

	constructor(private http: Http) { }

	compileCode(code: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('user', 'guest');
		params.set('code', code);
		return this.http.get('http://localhost:3000/compile', {
			search: params
		}).map(res => res.json());
	}

}
