import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {HomePageComponent} from './homeModule/home-page/home-page.component';
import {LoginPageComponent} from './authModule/login-page/login-page.component';
import {SignUpPageComponent} from './authModule/sign-up-page/sign-up-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('login');
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {path: '', component: HomePageComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'login', component: LoginPageComponent, ...canActivate(redirectLoggedInToHome)},
  {path: 'sign-up', component: SignUpPageComponent, ...canActivate(redirectLoggedInToHome)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
