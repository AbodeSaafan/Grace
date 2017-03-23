import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
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
  @Output() tglTheme: EventEmitter<any> = new EventEmitter();
  container: any;
  user: FormGroup;
  username: string;
  color = 'accent';
  checked = false;
  disabled = false;
  themeText: string;

	 constructor(private fb: FormBuilder, private AuthorizeService: AuthorizeService) {
   }

  	ngOnInit() {

      this.themeText = localStorage.getItem('theme')+" theme";
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
      confirmPass: ['', [Validators.required, Validators.minLength(2)]], 
      first: ['', [Validators.required, Validators.minLength(2)]],
      last: ['', [Validators.required, Validators.minLength(2)]]
    });

       $("#passDiv").hide();
       $("#nameDiv").hide();
       $("#emailDiv").hide();
    }

    clearForm(){
      this.user.patchValue({
          newPassword: '',
          currentPassword: '', 
          newEmail: '',
          confirmPass: '', 
          first: '', 
          last: ''
        })
    }
  	changePassword(){
        this.clearForm();
        $("#passDiv").slideToggle();
        $("#nameDiv").slideUp();
        $("#emailDiv").slideUp();

  	}
   	changeEmail(){
        this.clearForm();
        $("#emailDiv").slideToggle();
        $("#nameDiv").slideUp();
        $("#passDiv").slideUp();
    }
     changeName(){
        this.clearForm();
        $("#nameDiv").slideToggle();
        $("#emailDiv").slideUp();
        $("#passDiv").slideUp();
    }

    ngAfterViewInit(){
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
              alert("Strange, this does not seem to be your account");
            });
    }
    else{
       alert("Your passwords do not match.")
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
       alert("Your passwords do not match.")
    }
    }

    themeToggle(){

      if (localStorage.getItem('theme')==='dark'){
        this.themeText = "light theme";
        localStorage.setItem('theme','light');
      }else{
        this.themeText = "dark theme";
        localStorage.setItem('theme','dark');
      }

      this.tglTheme.emit();
    }

    
}





