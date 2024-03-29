import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { GuestCoderComponent } from './components/guest-coder/guest-coder.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import {routing} from './app.routing';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { CompileService } from './services/compile.service';
import { AuthorizeService } from './services/authorize.service';
import { FileStorageService } from './services/file-storage.service';
import { LoginComponent } from './components/login/login.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import 'hammerjs';
import { SettingsComponent } from './components/settings/settings.component';
import { UserCoderComponent } from './components/user-coder/user-coder.component';
import { SharedViewComponent } from './components/shared-view/shared-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestCoderComponent,
    CompilerComponent,
    LandingComponent,
    RegistrationComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    UserCoderComponent,
    SharedViewComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AceEditorModule,
    MaterialModule
  ],
  providers: [CompileService, AuthorizeService, FileStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
