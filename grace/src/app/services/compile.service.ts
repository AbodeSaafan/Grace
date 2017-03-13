import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class CompileService {

	constructor(private http: Http) { }

	compileCode(code: string) {
		let params: URLSearchParams = new URLSearchParams();
		params.set('user', 'guest');
		params.set('code', code);
		return this.http.get('../api/api.js', {
			search: params
		}).subscribe(
			(response) => this.onGetCompileResult(response.json()),
			(error) => this.onGetCompilerError(error.json())
		);
	}

	onGetCompileResult(result: string){
		// Set text area to hold results
	}

	onGetCompilerError(error: string){
		// Set text area to show error maybe alert?
	}

}
