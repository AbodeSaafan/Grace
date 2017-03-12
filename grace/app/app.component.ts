import {Component} from 'angular2/core';
import {GuestCode} from './guestCoder.component';

@Component({
    selector: 'landing',
    templateUrl: 'views/landing.html',
    styleUrls: ['public/css/style.css']
})


export class AppComponent { 
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