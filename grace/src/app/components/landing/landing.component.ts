import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
		this.shown = 'LOGIN';

	}

	registerClicked() {
		console.log("register clicked!!");
		this.shown = 'REGISTER';
	}


}
