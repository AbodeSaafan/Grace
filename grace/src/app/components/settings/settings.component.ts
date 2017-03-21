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
  container: any;

	constructor(){}

  	ngOnInit() {
      var container = $("#navContainer");
      container.css({'z-index': -5});

      container.height($(window).height() - 52);

      $(window).resize(function(){
        container.height($(window).height() - 52);
      })

      this.container = container;
      
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

    sendToBack() {
      this.container.css({'z-index': -5 });
    }

    sendToFront(){
      this.container.css({'z-index': 5 });
    }

    toggleSettings(){
      this.settingsPanel.toggle();
    }
    
}





