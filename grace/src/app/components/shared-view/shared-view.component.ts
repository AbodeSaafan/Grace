import { Component, OnInit, Input } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { Router } from '@angular/router';
import { HeaderConfig, HeaderComponent } from '../header/header.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-shared-view',
  templateUrl: './shared-view.component.html',
  styleUrls: ['./shared-view.component.css']
})
export class SharedViewComponent implements OnInit {

	sharedHeader: HeaderConfig;
	@Input() fileIDFromURL: string;
	fileCode: string;

  constructor(private router: Router, private fileStorage: FileStorageService, 
  			  public snackBar: MdSnackBar) {
  	this.sharedHeader = {
      leftButtonContent: "none",
      rightButtonContent: "Sign Up",
      leftButtonSrc: "",
      rightButtonSrc: ""
    }

    
  }

  ngOnInit() {
  	// Set fileCode in localstorage and make sure name is in there too
    this.fileCode = this.fileIDFromURL;
  }

  signUpClicked(){
  	this.router.navigateByUrl('/');
  }

  logoClicked(){
  	this.router.navigateByUrl('/');
  }

  saveClicked(){
  	this.snackBar.open("You must create your own file to save", 'Okay' ,{duration: 5000});
  }

}
