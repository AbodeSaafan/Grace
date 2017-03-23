import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MaterialModule } from '@angular/material';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  progress : number = 100; // because we want to count all to zero

  constructor(private router: Router) {
  }

  ngOnInit() {

  	// starts off at 5, want to count to 0
  	var setStart = 4;
  	var countdown = setInterval(() => {

      this.progress = (this.progress - 20);
      var countDisplay = document.getElementById("countdown");

      if (setStart > 0){
        countDisplay.innerHTML = setStart.toString();
      }

      // don't want to display "0 seconds remaining"
      // it sounds pretentious
      else if (setStart === 0){
        countDisplay.innerHTML = "";
      }
  		
      // navigate upon timeout
  		else {
  			this.router.navigateByUrl("/");
  			clearInterval(countdown);
  		}

      setStart --; 

  	}, 1000);

  }

  onClick(){
  	this.router.navigateByUrl("/");
  }

  countDown(){
  }

}
