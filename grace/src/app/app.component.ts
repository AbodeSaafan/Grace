import { Component } from '@angular/core';
import {
    Router, Event as RouterEvent,
    NavigationStart, NavigationEnd,
    NavigationCancel, NavigationError
} from '@angular/router'

import { MaterialModule } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(){}
  
}
