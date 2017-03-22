import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { routerTransition } from '../../router.animations';
import * as $ from 'jquery';
import {AuthorizeService} from '../../services/authorize.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [routerTransition()],
  //host: {'[@routerTransition]': '/'}
})
export class LandingComponent {

  constructor(private router: Router, private authService: AuthorizeService) {
   }

  ngOnInit() {
    $("#loginForm").hide();
    $("#registerForm").hide();
    // Auto-login
    this.authService.isAuthenticated().subscribe(data => {
      this.router.navigateByUrl('/dash');
    },
    function(error){

    });

   }

  private shown: string = 'NONE';
  guestClicked() {
		console.log("guest clicked!!");
		this.shown = 'GUESTCODER';
		this.router.navigateByUrl('/guest');
	}

	loginClicked() {
    $("#registerForm").hide();
    $("#loginForm").slideToggle();
		// console.log("login clicked!!");
		// if (this.shown == 'LOGIN'){
  //     this.shown = 'NONE';
  //   } else{
  //     this.shown = 'LOGIN';
  //   }
		

	}

	registerClicked() {
    $("#loginForm").hide();
    $("#registerForm").slideToggle();
		// console.log("register clicked!!");
  //   if (this.shown == 'REGISTER'){
		//   this.shown = 'NONE';
  //   } else{
  //     this.shown = 'REGISTER';
  //   }

	}
}
