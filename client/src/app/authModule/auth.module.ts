import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../_shared/_material/angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

import { AuthService } from '../_shared/_services/auth.service';
import { RouterModule } from '@angular/router';

import { AuthGuardHome } from '../_helpers/authGuardHome';
import { AuthGuardLogin } from '../_helpers/authGuardLogin';

@NgModule({
  declarations: [AuthTemplateComponent, LoginPageComponent, SignUpPageComponent],
  imports: [AngularMaterialModule, AuthRoutingModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [AuthTemplateComponent, LoginPageComponent, SignUpPageComponent],
  providers: [AuthGuardHome, AuthGuardLogin, AuthService],
})
export class AuthModule {}
