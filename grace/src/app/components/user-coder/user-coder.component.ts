import { Component, OnInit } from '@angular/core';
import { HeaderConfig } from '../header/header.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-coder',
  templateUrl: './user-coder.component.html',
  styleUrls: ['./user-coder.component.css', '../../app.component.css']
})
export class UserCoderComponent implements OnInit {
	
	userHeader: HeaderConfig;

  constructor(private router: Router) {
  	this.userHeader = {
			leftButtonContent: "Settings",
			rightButtonContent: "Logout",
			leftButtonSrc: "",
			rightButtonSrc: "",
			logoFunction: this.dashClicked,
			leftButtonFunction: this.settingsClicked,
			rightButtonFunction: this.logoutClicked
		}
  }

  ngOnInit() {
  }


  dashClicked() {
  	// Save file here
  	this.router.navigateByUrl('../dash');

  }

  settingsClicked() {

  }

  logoutClicked() {

  }
}