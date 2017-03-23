import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule, MdSnackBar } from '@angular/material';
import { AuthorizeService } from '../../services/authorize.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	private files : any[];
	private inviteIconOpen: boolean;
	dashHeader: HeaderConfig;
	@ViewChild('linkCopy') linkCopy:ElementRef;

	constructor(private fileStorage: FileStorageService, private authorizeService: AuthorizeService, 
		private router: Router, public snackBar: MdSnackBar) { 
		this.dashHeader = {
			leftButtonContent: "settings",
			rightButtonContent: "logout",
			leftButtonSrc: "",
			rightButtonSrc: ""
		}
	}
	importTrigger(){
		$("#fileImport").trigger("click");
	}

	fileImportAttempted(event) {
		alert("hi there");
  		var file = event.target.files[0],read = new FileReader();
		read.readAsBinaryString(file);
		var main = this;

		read.onloadend = function(){
		    main.fileMake(file.name, read.result);
		}
	}

	refreshFiles(){
		var comp = this;
		this.authorizeService.isAuthenticated().subscribe(data => {
			this.fileStorage.getMyFiles()
			.subscribe(output => { this.files = output });
		},
		function(error){
			alert('Request Failed');
			comp.router.navigateByUrl('/');
		});
	}

	ngOnInit() {
		this.refreshFiles();
	}

	fileOpen(index){
		localStorage.setItem('codeForUser', this.files[index].file);
		localStorage.setItem('fileNameForUser', this.files[index].fileName);
		this.router.navigateByUrl('/user');
	}

	fileInvite(index){
		if (!this.files[index].shareID) {
			var startShareAns = confirm("Your file is currently private, are you sure you would like to share this file?"+
				"\nNote: The file link will be unlisted meaning it will not show up on search engines "+
				"but anyone with the link will be able to access it");
			if (startShareAns){
				// Share file
				// Generate shareid and display it
				this.fileStorage.createAShare(this.files[index].fileName, localStorage.getItem('email'))
				.subscribe(data => {this.refreshFiles();});
			} else {
				// Don't do anything
			}
		} else {
			var stopShareAns = confirm("Your file is currently shared, are you sure you would like make this file private?"+
				"\nNote: No one will be able to access the file at the current link. If you share the file again later "+
				"the share link will differ.");
			if (stopShareAns){
				// Unshare file
				// Generate shareid and display it
				this.fileStorage.deleteAShare(this.files[index].fileName, localStorage.getItem('email'))
				.subscribe(data => {this.refreshFiles();});
			} else {
				// Don't do anything
			}

		}
	}

	fileDownload(index){
		console.log("downloading" + index);
		var FileSaver = require('file-saver');
		var blob = new Blob([this.files[index].file], {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(blob, this.files[index].fileName);
		
	}

	copyLink(event){
		var target = event.target || event.srcElement || event.currentTarget;
		target.setSelectionRange(0, target.value.length)
		const selection = getSelection();
		const range = document.createRange();

		range.selectNodeContents(target);
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand('copy');

		this.snackBar.open("Link copied to clipboard", '' ,{duration: 2000});
	}


	logoClicked(){
		this.router.navigateByUrl("/dash");
	}

	logoutClicked() {
		this.authorizeService.signOut();
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

	fileMake(newFileName, fileContent) {
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
				this.fileStorage.addAFile(newFileName,email,fileContent)
				.subscribe(output => { })

				this.fileStorage.getMyFiles()
				.subscribe(output => { this.files = output });

				this.snackBar.open("File imported","",{duration: 3000});
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
