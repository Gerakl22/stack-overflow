import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './homeModule/home-page/home-page.component';
import {LoginPageComponent} from './authModule/login-page/login-page.component';
import {SignUpPageComponent} from './authModule/sign-up-page/sign-up-page.component';
import {AuthGuard} from './_helpers/authGuard';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'sign-up', component: SignUpPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
