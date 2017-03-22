import { Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizeService} from './../../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


// ngOnInit?
export class LoginComponent  {
  user: FormGroup;
  constructor(private fb: FormBuilder, private AuthorizeService: AuthorizeService) {}
  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  onSubmit() {
      // here you go Julius
    
  if( this.user.status == 'INVALID') {
        console.log(this.user.status);

  } else {
    // check account exists
        console.log('check for account');
        this.AuthorizeService.signIn(this.user.value.email, this.user.value.password);
        
    }

  }

  emptyForm(){
    alert("emptying");
  }
  
}

