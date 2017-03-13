import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	name: string;
	address: address;
	hobbies: string[];
	showHobbies: boolean;

	constructor() {
		this.name = "Shayan";
		this.address = {
			street: 'blah',
			unit: 3
		}
		this.hobbies = ['a','b','c'];
		this.showHobbies = false;
	}

	ngOnInit() {
	}

	toggleHobbies() {
		this.showHobbies = !this.showHobbies;
		var hobbyButton = $('#hobbyButton');
		if (this.showHobbies){
			hobbyButton.html('Hide Hobbies');
		} else {
			hobbyButton.html('Show Hobbies');
		}
		
	}

}

interface address {
	street: string;
	unit: number;
}
