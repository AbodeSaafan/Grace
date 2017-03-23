import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MaterialModule } from '@angular/material';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  progress : number = 120; // because we want to count all to zero

  constructor(private router: Router) {
  }

  ngOnInit() {

  	// start off at 5
  	var setStart = 5;
  	var countdown = setInterval(() => {

      this.progress = (this.progress - 20);

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
