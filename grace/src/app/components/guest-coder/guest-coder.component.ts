import { Component, OnInit } from '@angular/core';
import { CompileService } from '../../services/compile.service';

@Component({
	selector: 'app-guest-coder',
	templateUrl: './guest-coder.component.html',
	styleUrls: ['./guest-coder.component.css','../../app.component.css']
})
export class GuestCoderComponent implements OnInit {

	outputReturn:string = "";
	constructor(private compileService: CompileService) { }
	
	ngOnInit() {
		this.compileService.compileCode("print 5").subscribe(output => {
			this.outputReturn = output;
			console.log(this.outputReturn);
		});
	}

}
