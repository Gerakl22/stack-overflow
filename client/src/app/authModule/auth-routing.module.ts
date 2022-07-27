import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';

const routes: Routes = [
  {
    path: '',
    component: AuthTemplateComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'sign-up',
        component: SignUpPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
