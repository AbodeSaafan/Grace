import { Component, OnInit } from '@angular/core';
import { HeaderConfig } from '../header/header.component';
import { HeaderComponent } from '../header/header.component';
import {AuthorizeService } from '../../services/authorize.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-coder',
  templateUrl: './user-coder.component.html',
  styleUrls: ['./user-coder.component.css', '../../app.component.css']
})
export class UserCoderComponent implements OnInit {
	
	userHeader: HeaderConfig;
	codeText: string;
  codeFileName : string;
  parentRouter;

  constructor(private router: Router, private authorizeService: AuthorizeService) {
  	this.userHeader = {
			leftButtonContent: "Settings",
			rightButtonContent: "Logout",
			leftButtonSrc: "",
			rightButtonSrc: ""
		}
  }

  ngOnInit() {
  	this.codeText = localStorage.getItem('codeForUser');
    this.codeFileName = localStorage.getItem('fileNameForUser');
  }

  logoClicked(){
    // Auto Save file here
    this.router.navigateByUrl('/dash');
    localStorage.removeItem('codeForUser');
    localStorage.removeItem('fileNameForUser');
    this.router.navigateByUrl("/dash")
  }
  
  logoutClicked() {
    this.authorizeService.signOut();
  }

  saveClicked(data) {
    alert(data)
  }

}