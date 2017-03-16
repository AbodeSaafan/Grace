import { Component, OnInit } from '@angular/core';
import { HeaderConfig } from '../header/header.component';

@Component({
	selector: 'app-guest-coder',
	templateUrl: './guest-coder.component.html',
	styleUrls: ['./guest-coder.component.css','../../app.component.css']
})
export class GuestCoderComponent implements OnInit {

	guestHeader: HeaderConfig;

	constructor() {
		// If left content  == 'none', the button will not show
		// likewise for right content
		this.guestHeader = {
			leftButtonContent: "guestL",
			rightButtonContent: "guestR",
			leftButtonSrc: "",
			logoRoute: "/",
			rightButtonSrc: "",
			leftButtonFunction: this.guestLeft,
			rightButtonFunction: this.guestRight
		}
	}
	
	guestLeft() {
		alert("guest left clicked");
	}

	guestRight() {
		alert("guest right clicked");
	}

	mySaveFunction(){
		alert("You must be a registered user to save online!");
	}

	ngOnInit() {
	}

}
