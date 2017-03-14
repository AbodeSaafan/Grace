import { Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizeService} from './../../services/authorize.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


// ngOnInit?
export class RegistrationComponent  {
   	form: FormGroup;

  	constructor(@Inject(FormBuilder) fb: FormBuilder, 
      private router: Router, private authorize: AuthorizeService ) {
    this.form = fb.group({
      name: fb.group({
        first: '',
        last: ''
      }),
      account: fb.group({
      	email: '',
      	password: ['', Validators.required]
      })
    });
    // use salt and hashedPass
    this.form.onclick(){
      this.authorize.signingUp("", "", "", "", "").subscribe(output => {
        console.log("hey");
      });
      // need to discuss with vince
    }
  }
}
