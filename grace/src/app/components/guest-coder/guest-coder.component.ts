import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderConfig } from '../header/header.component';
import {Router} from '@angular/router';
import { MdSnackBar } from '@angular/material';
import * as $ from 'jquery';

@Component({
	selector: 'app-guest-coder',
	templateUrl: './guest-coder.component.html',
	styleUrls: ['./guest-coder.component.css','../../app.component.css']
})
export class GuestCoderComponent implements OnInit {

	guestHeader: HeaderConfig;
	@ViewChild ('guestCompiler') guestCompiler: any;

	constructor(private router: Router, public snackBar: MdSnackBar) {
		this.guestHeader = {
			leftButtonContent: "none",
			rightButtonContent: "Sign Up",
			leftButtonSrc: "",
			rightButtonSrc: ""
		}
	}

	mySaveFunction(){
		this.snackBar.open("You must be a registered user to save online!", '' ,{duration: 3000});
	}

	logoClicked(){
		this.router.navigateByUrl("/");
	}

	signupClicked(){
		this.router.navigateByUrl("/");
	}

	ngOnInit() {
	}

	ngAfterViewInit(){
		this.guestCompiler.lighten();
	}

}