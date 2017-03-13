import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GuestCoderComponent } from './guest-coder/guest-coder.component';
import { CompilerComponent } from './compiler/compiler.component';
import {routing} from './app.routing';
import { LandingComponent } from './landing/landing.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestCoderComponent,
    CompilerComponent,
    LandingComponent,
    RegistrationComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
