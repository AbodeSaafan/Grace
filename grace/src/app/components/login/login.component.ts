import { Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// import {AuthorizeService} from './../../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


// ngOnInit?
export class LoginComponent  {
  user: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  onSubmit() {
    // console.log(value, valid);
    console.log(this.user.status);
    console.log('how');
    // here you go Julius
  }
}