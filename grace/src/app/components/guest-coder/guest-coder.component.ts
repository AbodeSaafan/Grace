import { Component, OnInit } from '@angular/core';
import { HeaderConfig } from '../header/header.component';
import {Router} from '@angular/router';

@Component({
	selector: 'app-guest-coder',
	templateUrl: './guest-coder.component.html',
	styleUrls: ['./guest-coder.component.css','../../app.component.css']
})
export class GuestCoderComponent implements OnInit {

	guestHeader: HeaderConfig;

	constructor(private router: Router) {
		// If left content  == 'none', the button will not show
		// likewise for right content
		this.guestHeader = {
			leftButtonContent: "guestL",
			rightButtonContent: "guestR",
			leftButtonSrc: "",
			rightButtonSrc: ""
		}
	}

	mySaveFunction(){
		alert("You must be a registered user to save online!");
	}

	logoClicked(){
		this.router.navigateByUrl("/");
	}

	ngOnInit() {
	}

}
