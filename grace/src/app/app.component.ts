import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GRACE REPL';
  guestClicked() {
		console.log("guest clicked!!");
	}

	loginClicked() {
		console.log("login clicked!!");
	}

	registerClicked() {
		console.log("register clicked!!");
	}

}
