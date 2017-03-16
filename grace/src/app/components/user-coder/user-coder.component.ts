import { Component, OnInit } from '@angular/core';
import { HeaderConfig } from '../header/header.component';
import { HeaderComponent } from '../header/header.component';
import {Router} from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-user-coder',
  templateUrl: './user-coder.component.html',
  styleUrls: ['./user-coder.component.css', '../../app.component.css']
})
export class UserCoderComponent implements OnInit {
	
	userHeader: HeaderConfig;
	codeText: string;
  parentRouter;

  constructor(private router: Router) {
  	this.userHeader = {
			leftButtonContent: "Settings",
			rightButtonContent: "Logout",
			leftButtonSrc: "",
			rightButtonSrc: "",
			logoRoute: "/dash",
			leftButtonFunction: this.settingsClicked,
			rightButtonFunction: this.logoutClicked
		}
  }

  ngOnInit() {
  	this.codeText = localStorage.getItem('codeForUser');
  }

  dashClicked() {
  	// Save file here
  	this.router.navigateByUrl('/dash');
  	localStorage.removeItem('codeForUser');

  }

  settingsClicked() {

  }

  logoutClicked() {

  }
}