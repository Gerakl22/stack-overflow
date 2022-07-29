import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthTemplateComponent, LoginPageComponent, SignUpPageComponent } from './components';

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
