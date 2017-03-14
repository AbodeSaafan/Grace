import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Input() config: HeaderConfig;

	constructor() {
		if (!this.config) {
			this.config = {
				leftButtonContent: "",
				rightButtonContent: "Right",
				leftButtonSrc: "../../../assets/grace_header_logo.svg",
				rightButtonSrc: "",
				leftButtonFunction: this.leftAlert,
				rightButtonFunction: this.rightAlert
			}
		}
	}

	leftAlert() {
		alert("grace clicked");
	}

	rightAlert() {
		alert("right clicked");
	}

	ngOnInit() {
	}

}

export interface HeaderConfig {
	leftButtonContent: string;
	rightButtonContent: string;
	leftButtonSrc: string;
	rightButtonSrc: string;
	leftButtonFunction: Function;
	rightButtonFunction: Function;
}
