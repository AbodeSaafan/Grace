import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { routerTransition } from '../../router.animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) {
  	this.shown = 'NONE';
   }

  ngOnInit() {
  	$('.register').hide();
  	$('#registerButton').click(function(){
  		$('.register').slideToggle()
  		if(this.shown == 'NONE'){
  			this.shown = 'REGISTER';
  			  		// alert ('toggle');

  		} else{
  			this.shown = 'NONE';
  		}
  	});

  }

  title = 'GRACE REPL';
  private shown: string = 'NONE';
  guestClicked() {
		console.log("guest clicked!!");
		this.shown = 'GUESTCODER';
		this.router.navigateByUrl('/guest');
	}

	loginClicked() {
		console.log("login clicked!!");
		if(this.shown == 'LOGIN'){
			this.shown = 'NONE';
		} else {
			this.shown = 'LOGIN';	
		}
		

	}

	registerClicked() {
		console.log("register clicked!!");
		if(this.shown == 'REGISTER'){
			this.shown = 'NONE';
		} else {
			this.shown = 'REGISTER';	
		}	
	}
}
