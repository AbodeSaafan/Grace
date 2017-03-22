import { Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizeService} from './../../services/authorize.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  email: any;
  password: any;

  constructor(private AuthorizeService: AuthorizeService) {}
  ngOnInit() {
    this.email = $("#loginEmail");
    this.password = $("#loginPassword");
  }
  onSubmit() {
      this.AuthorizeService.signIn(this.email.val(), this.password.val());
  }

  emptyForm(){
    this.email.val("");
    this.password.val("");
  }
  
}

