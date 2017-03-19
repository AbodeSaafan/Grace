import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule } from '@angular/material';
import {AuthorizeService } from '../../services/authorize.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private files : any[];
	private inviteIconOpen: boolean;
	dashHeader: HeaderConfig;

	constructor(private fileStorage: FileStorageService, private authorizeService: AuthorizeService, private router: Router) { 
		this.dashHeader = {
			leftButtonContent: "settings",
			rightButtonContent: "logout",
			leftButtonSrc: "",
			rightButtonSrc: ""
		}
		
	}

	fileOpen(index){
		console.log("opening " + index);
		localStorage.setItem('codeForUser', this.files[index].file)
		this.router.navigateByUrl('/user');
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
		this.router.navigateByUrl("/dash");
	}

	settingsClicked() {
		alert("settings clicked");
		alert(this.files);
	}

	logoutClicked() {
		alert("toaster strudel");
		this.authorizeService.signOut();
	}

	ngOnInit() {

  	this.fileStorage.getMyFiles(localStorage.getItem('token'))
  	.subscribe(output => { this.files = output });
			// Create objects that hold file info and display it
			// Add object to array that is used to show the list of files
			// Make sure clicking on file does good stuff;
			
		}

	}
