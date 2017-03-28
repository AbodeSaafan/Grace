import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Input() config: HeaderConfig;
	@Output() rightButtonClick: EventEmitter<any> = new EventEmitter();
	@Output() leftButtonClick: EventEmitter<any> = new EventEmitter();
	@Output() logoClick: EventEmitter<any> = new EventEmitter();

	constructor() {
		if (!this.config) {
			this.config = {
				leftButtonContent: "Left",
				rightButtonContent: "Right",
				leftButtonSrc: "",
				rightButtonSrc: ""
			}
		}
	}

	ngOnInit() {
	}

	backgroundToggle() {
		if($("#topBar").hasClass("darkenBar")) {
			$("#graceHeaderLogo").attr("src","../../../assets/grace_header_logo.svg");
			$("#topBar").removeClass("darkenBar");
		} else {
			$("#graceHeaderLogo").attr("src","../../../assets/grace_header_logo2.svg");
			$("#topBar").addClass("darkenBar");
		}
	}

	lighten() {
		$("#graceHeaderLogo").attr("src","../../../assets/grace_header_logo.svg");
		$("#topBar").removeClass("darkenBar");
	}

}

export interface HeaderConfig {
	leftButtonContent: string;
	rightButtonContent: string;
	leftButtonSrc: string;
	rightButtonSrc: string;
}
