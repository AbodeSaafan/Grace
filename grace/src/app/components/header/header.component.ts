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
				logoFunction: this.leftAlert,
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
		var w = $(window);
		var logo = $('.logo');
		logo.css({left: (w.width()/2) - (logo.width()/2) });
		w.resize(function() {
			logo.css({left: (w.width()/2) - (logo.width()/2) });
		});
	}

}

export interface HeaderConfig {
	leftButtonContent: string;
	rightButtonContent: string;
	leftButtonSrc: string;
	rightButtonSrc: string;
	logoFunction: Function;
	leftButtonFunction: Function;
	rightButtonFunction: Function;
}
