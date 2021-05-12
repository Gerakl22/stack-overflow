import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from './_shared/_material/angular-material.module';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule} from '@angular/fire/auth-guard';

import { AppComponent } from './app.component';
import { HomePageComponent } from './homeModule/home-page/home-page.component';
import { LoginPageComponent } from './authModule/login-page/login-page.component';
import { SignUpPageComponent } from './authModule/sign-up-page/sign-up-page.component';

import {AuthService} from './_shared/_services/auth.service';
import { HeaderComponent } from './_shared/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatIconModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
