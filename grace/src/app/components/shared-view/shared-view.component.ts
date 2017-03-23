import { Component, OnInit, Input } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderConfig, HeaderComponent } from '../header/header.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-shared-view',
  templateUrl: './shared-view.component.html',
  styleUrls: ['./shared-view.component.css']
})

export class SharedViewComponent implements OnInit {

	sharedHeader: HeaderConfig;
	@Input() fileIDFromURL: string;
	fileCode: string;
	fileName: string;
	id: any;
	paramsSub: any;

  constructor(private router: Router, private fileStorage: FileStorageService, 
    public snackBar: MdSnackBar, private activatedRoute: ActivatedRoute) {
  	this.sharedHeader = {
      leftButtonContent: "none",
      rightButtonContent: "Sign Up",
      leftButtonSrc: "",
      rightButtonSrc: ""
    }
  }

  ngOnInit() {
    this.fileCode = this.fileIDFromURL;
    this.paramsSub = this.activatedRoute.params.subscribe(params => this.id = params['id']);

    this.loadFile();

    // Refresh code every 10 seconds
    setInterval(() => {this.loadFile();} , 1000 * 10)

  }

  loadFile(){
    var comp = this;
    this.fileStorage.getSharedFile(this.id).subscribe(data => {
      localStorage.setItem('shareID',this.id);
      localStorage.setItem('sharedFileName', data.fileName);
      localStorage.setItem('sharedFileCode', data.file);
      comp.fileName = data.fileName;
      comp.fileCode = data.file;
      comp.snackBar.open("File loaded", '' ,{duration: 1000});
    },
    function(error){
      comp.router.navigateByUrl('/404');
    });
  }

  signUpClicked(){
  	this.router.navigateByUrl('/');
  }

  logoClicked(){
  	this.router.navigateByUrl('/');
  }

  saveClicked(){
  	this.snackBar.open("You must create your own file to save", 'Okay' ,{duration: 5000});
  }

}