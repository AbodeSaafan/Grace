import { Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizeService} from './../../services/authorize.service';
import { MdSnackBar } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit {

  fname: any;
  lname: any;
  email: any;
  password: any;
  confirm: any;

  constructor(private AuthorizeService: AuthorizeService, public snackBar: MdSnackBar) {}
  
  ngOnInit() {

    $(".mat-input-ripple").css({opacity: 1.0, transform: "scaleY(1)"});

    this.fname = $("#formFname");
    this.lname = $("#formLname");
    this.email = $("#formEmail");
    this.password = $("#formPassword");
    this.confirm = $("#formConfirmPassword");
  }
  onSubmit() {
      if (this.password.val() == this.confirm.val()) {
          this.AuthorizeService.signUp(this.fname.val(), this.lname.val(), 
              this.email.val(), this.password.val());
      }
      else {
        this.snackBar.open("Passwords do not match", '' ,{duration: 3000});
        this.password.val("");
        this.confirm.val("");
       }
    }

    emptyForm() {
      this.fname.val("");
      this.lname.val("");
      this.email.val("");
      this.password.val("");
      this.confirm.val("");
    }

  }

