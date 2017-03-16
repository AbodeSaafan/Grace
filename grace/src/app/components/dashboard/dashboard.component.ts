import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule } from '@angular/material';
import {AuthorizeService } from '../../services/authorize.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private filesList : any[];
	private files : any[];
	private inviteIconOpen: boolean;
	dashHeader: HeaderConfig;

	constructor(private fileStorage: FileStorageService, private authorizeService: AuthorizeService) { 
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

	fileInvite(index){
		console.log(index);
	}

	fileDownload(index){
		console.log(index);
	}

	fileMeta(index){
		console.log(index);
	}

	logoClicked(){
		alert("logo clicked");
	}

	settingsClicked() {
		alert("settings clicked");
		alert(this.files);
	}

	logoutClicked() {
		alert("logout clicked");
		this.authorizeService.signOut();
	}

	ngOnInit() {
		this.files = [
		{
			name: 'File',
			updated: new Date('2,24,14'),
		},
		{
			name: 'Vacation Itinerary',
			updated: new Date('2/20/16'),
		},
		{
			name: 'Kitchen Remodel',
			updated: new Date('1/18/16'),
		}
		];

  	this.fileStorage.getMyFiles(localStorage.getItem('token'))
  	.subscribe(output => { this.files = output });
			// Create objects that hold file info and display it
			// Add object to array that is used to show the list of files
			// Make sure clicking on file does good stuff;
			
		}

	}
