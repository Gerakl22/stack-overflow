import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './homeModule/home-page/home-page.component';
import {LoginPageComponent} from './authModule/login-page/login-page.component';
import {SignUpPageComponent} from './authModule/sign-up-page/sign-up-page.component';
import {AuthGuardLogin} from './_helpers/authGuardLogin';
import {AuthGuardHome} from './_helpers/authGuardHome';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuardLogin]},
  {path: 'login', component: LoginPageComponent, canActivate: [AuthGuardHome]},
  {path: 'sign-up', component: SignUpPageComponent, canActivate: [AuthGuardHome]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
