import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { routerTransition } from '../../router.animations';
import * as $ from 'jquery';
import {AuthorizeService} from '../../services/authorize.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [routerTransition()],
  //host: {'[@routerTransition]': '/'}
})
export class LandingComponent {

  constructor(private router: Router, private authService: AuthorizeService) {
   }

  ngOnInit() {
    var formDivs = $(".formDiv");
    var leftSpace = $(window).width()/2 - formDivs.width()/1.6;
    var topSpace = $(window).height()/2 - formDivs.height()/1.1;

    formDivs.hide();
    formDivs.css({opacity: 0.0, top: topSpace, left: leftSpace});

    var backdrop = $("#backdrop");
    backdrop.css({opacity: 0.0});
    backdrop.hide();


    $(window).resize(function() {
      var leftSpace = $(window).width()/2 - $(".formDiv").width()/1.7;
      formDivs.css({left: leftSpace});
    });

    // Auto-login
    this.authService.isAuthenticated().subscribe(data => {
      this.router.navigateByUrl('/dash');
    },
    function(error){

    });

   }

  guestClicked() {
		console.log("guest clicked!!");
		this.router.navigateByUrl('/guest');
	}

  backdropIn(){
    $("#backdrop").show();
    $("#backdrop").animate({opacity: 0.7}, 200, function() {

    });
  }

	loginClicked() {
    $("#registerButton").removeClass("selectedButton");
    $("#loginButton").addClass("selectedButton");

    $("#registerForm").hide();
    this.backdropIn();

    $("#loginForm").show();
    $("#loginForm").animate({opacity: 1.0}, 200, function() {

    });
	}

	registerClicked() {
    $("#registerButton").addClass("selectedButton");
    $("#loginButton").removeClass("selectedButton");

    $("#loginForm").hide();
    this.backdropIn();

    $("#registerForm").show();
    $("#registerForm").animate({opacity: 1.0}, 200, function() {

    });
	}

  bgClicked(obj1, obj2) {
    obj1.emptyForm();
    obj2.emptyForm();
    
    $(".formDiv").animate({opacity: 0.0}, 200,function(){
      $(this).hide();
    })
    $("#backdrop").animate({opacity: 0.0}, 200,function(){
      $(this).hide();
    })
  }
}






