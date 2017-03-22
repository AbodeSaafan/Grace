import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule} from '@angular/material';
import {AuthorizeService} from './../../services/authorize.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
  
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('settingsPanel') settingsPanel;
  container: any;
  user: FormGroup;
  pass = false;
  email = false;
  username: string;

	 constructor(private fb: FormBuilder, private AuthorizeService: AuthorizeService) {
   }

  	ngOnInit() {
      this.username = localStorage.getItem("fname");
      var container = $("#navContainer");
      container.css({'z-index': -5});

      container.height($(window).height() - 52);

      $(window).resize(function(){
        container.height($(window).height() - 52);
      })

      this.container = container;

      this.user = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(2)]],
      currentPassword: ['', [Validators.required, Validators.minLength(2)]],
      newEmail: ['', Validators.required], 
      confirmPass: ['', [Validators.required, Validators.minLength(2)]]
    });
      
    }

  	changePassword(){
      if (this.pass == false){
        $("#passButton").show();
        this.user.patchValue({
          newPassword: '',
          currentPassword: '', 
          newEmail: '',
          confirmPass: ''
        })
        $("#emailButton").hide();
        this.pass = true;
        this.email = false;
      }
      else{
        $("#passButton").hide();
        this.pass = false;
        this.user.patchValue({
          newPassword: '',
          currentPassword: '', 
          newEmail: '',
          confirmPass: ''
        })
      }
  	}
 	changeEmail(){
      if (this.email == false){
        $("#emailButton").show();
        $("#passButton").hide();
        this.user.patchValue({
          currentPassword: '',
          confirmPass: '', 
          newEmail: ''
        })
        this.email = true;
        this.pass = false;

      }
      else{
        $("#emailButton").hide();
        this.email = false;
        this.user.patchValue({
          currentPassword: '',
          confirmPass: '', 
          newEmail: ''
        })

      }  
     }

    ngAfterViewInit(){
      console.log(this.settingsPanel);
      //this.settingsPanel.open();
    }

    sendToBack() {
      this.container.css({'z-index': -5 });
    }

    sendToFront(){
      this.container.css({'z-index': 5 });
    }

    toggleSettings(){
      this.settingsPanel.toggle();
    }

    onSubmitPass(){

    if (this.user.value.confirmPass == this.user.value.currentPassword)  {
        this.AuthorizeService.isAuthenticated().subscribe(data =>{
                this.AuthorizeService.changePass(this.user.value.newPassword,this.user.value.currentPassword);

            },function(error){
              alert("not your account");
            });
    }
    else{
       alert("Passwords don't match.")
    }
    }

    onSubmitEmail(){

    if (this.user.value.confirmPass == this.user.value.currentPassword)  {
        this.AuthorizeService.isAuthenticated().subscribe(data =>{
              this.AuthorizeService.changeEmail(this.user.value.newEmail, this.user.value.currentPassword);
      
            },function(error){
              alert("not your account");
            });
    }
    else{
       alert("Passwords don't match.")
    }
    }

    
}





