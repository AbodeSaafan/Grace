import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderConfig } from '../header/header.component';
import { HeaderComponent } from '../header/header.component';
import { AuthorizeService } from '../../services/authorize.service';
import { FileStorageService } from '../../services/file-storage.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-coder',
  templateUrl: './user-coder.component.html',
  styleUrls: ['./user-coder.component.css', '../../app.component.css']
})
export class UserCoderComponent implements OnInit {
	
	userHeader: HeaderConfig;
	codeText: string;
  codeFileName : string;
  email: string;
  exiting: boolean;
  parentRouter;
  @ViewChild ('compilerComp') compilerComp: any;

  constructor(private router: Router, private authorizeService: AuthorizeService, 
    private fileStorage: FileStorageService, public snackBar: MdSnackBar) {
  	this.userHeader = {
      leftButtonContent: "Settings",
      rightButtonContent: "Logout",
      leftButtonSrc: "",
      rightButtonSrc: ""
    }

    // Auto save every 5 minutes
    setInterval(() => {this.compilerComp.sendSaveClick();} , 1000 * 60 * 5  )

  }

  ngOnInit() {
  	this.codeText = localStorage.getItem('codeForUser');
    this.codeFileName = localStorage.getItem('fileNameForUser');
    this.email = localStorage.getItem('email');
  }

  logoClicked(){
    this.exiting = true;
    this.compilerComp.sendSaveClick();
    
    this.router.navigateByUrl("/dash")

    localStorage.removeItem('codeForUser');
    localStorage.removeItem('fileNameForUser');
  }

  logoutClicked() {
    this.authorizeService.signOut();
  }

  saveClicked(fileCode) {
    var comp = this;

    this.authorizeService.isAuthenticated().subscribe(data => {

      // File name is good we can create it
      this.fileStorage.saveFile(this.codeFileName, this.email, fileCode)
      .subscribe(output => {
        if(!comp.exiting){
          localStorage.setItem('codeForUser', fileCode);
        }
        comp.codeText = fileCode;

        comp.snackBar.open("File Saved", 'Okay' ,{duration: 5000});
      },
      function(error){
        comp.snackBar.open("File failed to save", 'Okay' ,{duration: 5000});
      })
    },
    function(error){
      comp.snackBar.open("File failed to save", 'Okay' ,{duration: 5000});
    });
    
  }


}