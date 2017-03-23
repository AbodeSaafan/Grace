import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MaterialModule } from '@angular/material';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit() {
  	// start off at 10
  	var setStart = 9;
  	var countdown = setInterval(() => {

  		var countDisplay = document.getElementById("countdown");
  		countDisplay.innerHTML = setStart.toString();
  		
  		setStart --; 
  		
  		if (setStart < 0){
  			this.router.navigateByUrl("/");
  			clearInterval(countdown);
  		}

  	}, 1000);

  }

  onClick(){
  	this.router.navigateByUrl("/");
  }

  countDown(){
  }

}
