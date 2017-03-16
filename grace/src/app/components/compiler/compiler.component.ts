import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
	mode: string;
	editorText: string;
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
    	this.editorText = this.compiledReturn;
    	this.consoleText = "";
    }

    ngOnInit() {
    	$("body").css({backgroundColor: "#efefef"});
    	this.animationListeners();
    	this.clickListeners();
    	

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

	animationListeners() {

	}

	clickListeners () {
		$("#downloadButton").click(function(e) {
		});

		$("#saveButton").click(function() {

		});

		// $("#runButton").click(function() {
		// 	alert("hi");
		// 	this.ngAfterViewInit();
		// })

		$("#stopButton").click(function() {

		});

		$("#clearButton").click(function() {

		});
	}

	setFullHeight() {
		
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
				this.compiledReturn = "infinite";
			}
			var currentOutput = this.consoleEditor.getValue();
			this.consoleEditor.setValue(currentOutput + this.compiledReturn);
		});
	}

	clearConsole(){
		this.consoleEditor.setValue("");
	}

}