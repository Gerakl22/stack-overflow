import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AngularMaterialModule} from './_shared/_material/angular-material.module';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { LoginPageComponent } from './authModule/login-page/login-page.component';
import { SignUpPageComponent } from './authModule/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './homeModule/home-page/home-page.component';
import { NewQuestionComponent } from './homeModule/new-question/new-question.component';
import { EveryQuestionsComponent } from './homeModule/every-questions/every-questions.component';

import {AuthService} from './_shared/_services/auth.service';
import {DatabaseService} from './_shared/_services/database.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    SignUpPageComponent,
    HomePageComponent,
    EveryQuestionsComponent,
    NewQuestionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [AuthService, DatabaseService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
