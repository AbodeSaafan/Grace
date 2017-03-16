import { Component, OnInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	constructor(){}

  	ngOnInit() {}

  	changePassword(){
  		alert("change password");
  	}
 	changeEmail(){
  		alert("change email");
  	}

  	changeTheme(){
  		alert("toggle dark theme");
  	}
}
