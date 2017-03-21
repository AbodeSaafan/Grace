import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HeaderConfig } from '../header/header.component';
import { MaterialModule} from '@angular/material';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  @ViewChild('sidenav') el:ElementRef;

	constructor(private rd: Renderer){}

  	ngOnInit() {}

  	changePassword(){
  		alert("change password");
  	}
 	changeEmail(){
  		alert("change email");
  	}

  	changeTheme(){
  		
  	}
    ngAfterViewInit(){
      // alert("works");
      //this.rd.invokeElementMethod(this.el.nativeElement,'open');
      // this.el.open();
      //sidenav.open();
    }

    openSide(sidenav: any){
      sidenav.open();
    }
    
}
