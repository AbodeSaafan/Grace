import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CompileService } from '../../services/compile.service';
import { AceEditorDirective } from 'ng2-ace-editor';
import * as $ from 'jquery';

@Component({
	selector: 'app-compiler',
	templateUrl: './compiler.component.html',
	styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

	// Ace editor options ---------------------------------
	@Input() theme: string;
	@Input() disabled: string;
	@Input() editorText: string;
	@Input() editorFileName: string;
	@Output() saveClick: EventEmitter<any> = new EventEmitter();
	mode: string;
	consoleText: string;
	config: any;

	@ViewChild('editor') editor;
	@ViewChild('editori') editor2;
	compileEditor: any;
	consoleEditor: any;

    editorOptions:any = {printMargin: false};
    consoleOptions:any  = {printMargin: false,
    						showGutter: false};

    // Button bar -----------------------------------------

    constructor(private compileService: CompileService) {
    	// setting up compiler config
    	this.mode = "python";
    	this.consoleText = "";

    	if(!this.editorText){
    		this.editorText = "";
    	}
    }

    sendSaveClick(){
    	this.saveClick.emit(this.compileEditor.getValue());
    }

    ngOnInit() {
    	

    	var w = $(window);
    	var bar = $(".toolbar");
    	var resizer = $("#resizer");
    	var container1 = $(".container");
    	var container2 = $(".container2");

    	container1.height(w.height() - 52.5 - bar.height());
    	container2.height(w.height() - 52.5 - bar.height());
    	resizer.height(w.height() - 52.5);

    	w.resize(function() {
    		container1.height(w.height() - 52.5 - bar.height());
    		container2.height(w.height() - 52.5 - bar.height());
    		resizer.height(w.height() - 52.5);
    	});
	}

	ngAfterViewInit() {
		this.compileEditor = this.editor.getEditor();
		this.consoleEditor = this.editor2.getEditor();
    }

    compiledReturn:string = "";
	codeToCompile:string = "";
	
	// When compile/run is clicked
	compileCode(){
		this.codeToCompile = this.compileEditor.getValue();

		this.compileService.compileCode(this.codeToCompile).subscribe(output => {

			if(output.output) {
				this.compiledReturn = output.output;
			} else if(output.error) {
				this.compiledReturn = output.error;
			} else {
				this.compiledReturn = "infinite\n";
			}
			var currentOutput = this.consoleEditor.getValue();
			this.consoleEditor.setValue(currentOutput + this.compiledReturn);
		});
	}

	stopCompile() {
		this.compileService.compileCode("print('stopped')").subscribe(output => {
			var currentOutput = this.consoleEditor.getValue();
			this.consoleEditor.setValue(currentOutput + output.output);
		});
	}

	downloadFile(){
		var FileSaver = require('file-saver');
		var blob = new Blob([this.compileEditor.getValue()], {type: "text/plain;charset=utf-8"});
		if(this.editorFileName){ // if there is a file name
			FileSaver.saveAs(blob, this.editorFileName);
		} else {
			FileSaver.saveAs(blob, "grace" + 
			Math.floor(new Date().getTime()/500).toString(16) + ".py");	
		}
		
	}

	clearConsole(){
		this.consoleEditor.setValue("");
	}

}