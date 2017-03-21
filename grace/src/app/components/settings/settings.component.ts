import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule} from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('settingsPanel') settingsPanel;

	constructor(){}

  	ngOnInit() {
      $('#navContainer').height($(window).height() - 52);
      $('#navContainer').css({'z-index': -5});
    }

  	changePassword(){
  		alert("change password");
  	}
 	changeEmail(){
  		alert("change email");
  	}

  	changeTheme(){
  		
  	}
    ngAfterViewInit(){
      console.log(this.settingsPanel);
      //this.settingsPanel.open();
    }

    toggleSettings(e){
      if(e){
        e.preventDefault();
      } else {
        this.settingsPanel.toggle();
      }

      var navContainer = $('#navContainer');
      var zVal = parseInt(navContainer.css('z-index'));
      var newZ = zVal*-1;

      var timeoutVal = newZ > 0? 0: 400;

      setTimeout(function(){
        navContainer.css({'z-index': newZ });
      }, timeoutVal);
      
    }
    
}





