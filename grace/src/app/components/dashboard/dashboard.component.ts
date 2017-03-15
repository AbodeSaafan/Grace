import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule} from '@angular/material';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private filesList : any[];
	private folders : any[];
	private notes : any[];
	dashHeader: HeaderConfig;

	constructor(private fileStorage: FileStorageService) { 
		this.dashHeader = {
			leftButtonContent: "settings",
			rightButtonContent: "logout",
			leftButtonSrc: "",
			rightButtonSrc: "",
			logoFunction: this.logoClicked,
			leftButtonFunction: this.settingsClicked,
			rightButtonFunction: this.logoutClicked
		}
		
	}

	logoClicked(){
		alert("logo clicked");
	}

	settingsClicked() {
		alert("settings clicked");
	}

	logoutClicked() {
		alert("logout clicked");
	}

	ngOnInit() {
		this.folders = [
		{
			name: 'Photos',
			updated: new Date('1/1/16'),
		},
		{
			name: 'Recipes',
			updated: new Date('1/17/16'),
		},
		{
			name: 'Work',
			updated: new Date('1/28/16'),
		}
		];
		this.notes = [
		{
			name: 'Vacation Itinerary',
			updated: new Date('2/20/16'),
		},
		{
			name: 'Kitchen Remodel',
			updated: new Date('1/18/16'),
		}
		];

  	/*this.fileStorage.getMyFiles(localStorage.getItem('token'))
  	.subscribe(output => { this.filesList = output.filesList }
			// Create objects that hold file info and display it
			// Add object to array that is used to show the list of files
			// Make sure clicking on file does good stuff;*/
			
		}

	}
