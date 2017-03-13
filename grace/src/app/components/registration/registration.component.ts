import { Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent  {
   	form: FormGroup;

  	constructor(@Inject(FormBuilder) fb: FormBuilder) {
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
  }
}
