import { Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizeService} from './../../services/authorize.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent  {
  user: FormGroup;
  constructor(private fb: FormBuilder, private AuthorizeService: AuthorizeService) {}
  
  ngOnInit() {
    // $("input").focusin(function() {
    //   $(this).removeClass("inputItem");
    // })

    // $("input").focusout(function() {
    //   var temp = $(this);
    //   setTimeout(function() {
    //     temp.addClass("inputItem");
    //   }, 200);
    // });

    this.user = this.fb.group({
      first: ['', [Validators.required, Validators.minLength(2)]],
      last: ['', [Validators.required, Validators.minLength(2)]],

      account: this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required], 
        confirmPass: ['', Validators.required]
      })
    });
  }
  onSubmit() {
    //bad input
  if( this.user.status == 'INVALID') {
        console.log(this.user.status);

  } else {
    // if else to check if account already exists (PUT), else POST
      if (this.user.value.account.password == this.user.value.account.confirmPass) {
        this.AuthorizeService.signUp(this.user.value.first, this.user.value.last, this.user.value.account.email, this.user.value.account.password);
       }
      else{
        alert("Passwords don't match.")
       }

    }

  }
}