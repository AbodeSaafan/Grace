import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'GRACE REPL';
  private shown: string = 'NONE';
  guestClicked() {
		console.log("guest clicked!!");
		this.shown = 'GUESTCODER';
	}

	loginClicked() {
		console.log("login clicked!!");
	}

	registerClicked() {
		console.log("register clicked!!");
	}


}
