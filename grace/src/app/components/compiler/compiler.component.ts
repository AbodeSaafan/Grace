import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CompileService } from '../../services/compile.service';
import { AceEditorDirective } from 'ng2-ace-editor';

@Component({
	selector: 'app-compiler',
	templateUrl: './compiler.component.html',
	styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

	@Input() theme: string;
	mode: string;
	text: string;
	config: any;
	@ViewChild('editor') editor;

    options:any = {maxLines: 1000, printMargin: false};
    onChange(code) {
        //console.log("new code", code);
    }

    constructor(private compileService: CompileService) {
    	// setting up compiler config
    	this.mode = "python";
    	this.text = "";
    }

    ngOnInit() {
	}

	ngAfterViewInit() {
    }

    compiledReturn:string = "";
	codeToCompile:string = "";
	
	// When compile/run is clicked
	compileClicked(){
		this.codeToCompile = "";
		this.compileService.compileCode(this.codeToCompile).subscribe(output => {
			this.compiledReturn = output.output;
			console.log(this.compiledReturn);
		});
	}

}