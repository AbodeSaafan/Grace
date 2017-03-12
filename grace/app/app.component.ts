import {Component} from 'angular2/core';

@Component({
    selector: 'landing',
    templateUrl: 'views/landing.html'
})
export class AppComponent { 
	guestClicked() {
		console.log("guest clicked!!");
	}
}