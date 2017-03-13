import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent  {
	
	form: FormGroup;
	constructor(public fb: FormBuilder){
		this.form = this.fb.group({
			first: '',
			last: '',
			email: '',
			password: ''
		});
	}
}
