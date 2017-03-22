import { Component, Inject, OnInit} from '@angular/core';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizeService} from './../../services/authorize.service';
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

  constructor(private AuthorizeService: AuthorizeService) {}
  
  ngOnInit() {

    $(".mat-input-ripple").css({opacity: 1.0, transform: "scaleY(1)"});

    this.fname = $("#formFname");
    this.lname = $("#formLname");
    this.email = $("#formEmail");
    this.password = $("#formPassword");
    this.confirm = $("#formConfirmPassword");

    // this.user = this.fb.group({
    //   first: ['', [Validators.required, Validators.minLength(2)]],
    //   last: ['', [Validators.required, Validators.minLength(2)]],

    //   account: this.fb.group({
    //     email: ['', Validators.required],
    //     password: ['', Validators.required], 
    //     confirmPass: ['', Validators.required]
    //   })
    // });
  }
  onSubmit() {
    alert(this.fname.val());
    //bad input
    // if( this.user.status == 'INVALID') {
    //       console.log(this.user.status);

    // } else {
    //   // if else to check if account already exists (PUT), else POST
    //     if (this.user.value.account.password == this.user.value.account.confirmPass) {
    //       this.AuthorizeService.signUp(this.user.value.first, this.user.value.last, this.user.value.account.email, this.user.value.account.password);
    //      }
    //     else{
    //       alert("Passwords don't match.")
    //      }

      // if (this.password.val() == this.confirm.val()) {
      //     this.AuthorizeService.signUp(this.fname.val(), this.lname.val(), 
      //         this.email.val(), this.password.val());
      // }
      // else {
      //   alert("Passwords don't match.");
      //  }
    }

    emptyForm() {
      this.fname.val("");
      this.lname.val("");
      this.email.val("");
      this.password.val("");
      this.confirm.val("");
    }

  }









