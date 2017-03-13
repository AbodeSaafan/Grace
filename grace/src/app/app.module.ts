import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GuestCoderComponent } from './components/guest-coder/guest-coder.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import {routing} from './app.routing';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { CompileService } from './services/compile.service'

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
  providers: [CompileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
