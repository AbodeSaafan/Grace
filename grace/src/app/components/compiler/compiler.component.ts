import { Component, OnInit } from '@angular/core';
import { CompileService } from '../../services/compile.service';

@Component({
	selector: 'app-compiler',
	templateUrl: './compiler.component.html',
	styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

	constructor(private compileService: CompileService) { }
	compiledReturn:string = "";
	codeToCompile:string = "";
	ngOnInit() {
	}

	// When compile/run is clicked
	compileClicked(){
		this.codeToCompile = "";
		this.compileService.compileCode(this.codeToCompile).subscribe(output => {
			this.compiledReturn = output.output;
			console.log(this.compiledReturn);
		});
	}

}
