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
		localStorage.setItem('codeForUser', this.files[index].file);
		localStorage.setItem('fileNameForUser', this.files[index].fileName);
		this.router.navigateByUrl('/user');
	}

	fileInvite(index){
		console.log(index);
	}

	fileDownload(index){
		console.log("downloading" + index);
		var FileSaver = require('file-saver');
		var blob = new Blob([this.files[index].file], {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(blob, this.files[index].fileName);
		
	}


	logoClicked(){
		this.router.navigateByUrl("/dash");
	}

	logoutClicked() {
		this.authorizeService.signOut();
	}

	ngOnInit() {
		this.authorizeService.isAuthenticated().subscribe(data => {
			this.fileStorage.getMyFiles()
			.subscribe(output => { this.files = output });
		},
		function(error){
			alert('Request Failed');
			this.router.navigateByUrl('/');
		});
	}

	fileCreate(){
		var newFileName = prompt("Please enter your name", ".py");
		if (newFileName != null){
			for (let file of this.files){
				if( newFileName == file.fileName){
					alert("Sorry your file name must be unique, try again")
					return false;
				}
			}


			this.authorizeService.isAuthenticated().subscribe(data => {
				var email = localStorage.getItem('email');

				// File name is good we can create it
				this.fileStorage.addAFile(newFileName,email,"# Write your code here")
				.subscribe(output => { })

				this.fileStorage.getMyFiles()
				.subscribe(output => { this.files = output });
			},
			function(error){
				alert('Request Failed');
				this.router.navigateByUrl('/');
			});

		}
	}

	fileDelete(index){
		var r = confirm("Are you sure you want to delete your file?");
		if (r == true) {
			var deleteFileName = this.files[index].fileName;
			this.authorizeService.isAuthenticated().subscribe(data => {
				var email = localStorage.getItem('email');

				// File name is good we can create it
				this.fileStorage.deleteFile(deleteFileName,email)
				.subscribe(output => { })

				this.fileStorage.getMyFiles()
				.subscribe(output => { this.files = output });
			},
			function(error){
				alert('Request Failed');
				this.router.navigateByUrl('/');
			});
		} else {
			return;
		} 

	}


}
