import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../@material/angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../@shared/shared.module';
import { AuthTemplateComponent, LoginPageComponent, SignUpPageComponent } from './components';


@NgModule({
  declarations: [AuthTemplateComponent, LoginPageComponent, SignUpPageComponent],
  imports: [
    AngularMaterialModule,
    AuthRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [AuthTemplateComponent, LoginPageComponent, SignUpPageComponent],
})
export class AuthModule {}
