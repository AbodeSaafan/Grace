import { Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// import {AuthorizeService} from './../../services/authorize.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


// ngOnInit?
export class RegistrationComponent  {
  user: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.user = this.fb.group({
      first: ['', [Validators.required, Validators.minLength(2)]],
      last: ['', [Validators.required, Validators.minLength(2)]],

      account: this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    });
  }
  onSubmit() {
    //bad input
  if( this.user.status == 'INVALID') {
        console.log(this.user.status);

  } else {
    // if else to check if account already exists (PUT), else POST
        console.log('check');

    }

  }
}