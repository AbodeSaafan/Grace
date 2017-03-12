import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GuestCoderComponent } from './guest-coder/guest-coder.component';
import { CompilerComponent } from './compiler/compiler.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestCoderComponent,
    CompilerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
