import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './homeModule/home-page/home-page.component';
import {LoginPageComponent} from './authModule/login-page/login-page.component';
import {SignUpPageComponent} from './authModule/sign-up-page/sign-up-page.component';
import {AuthGuardLogin} from './_helpers/authGuardLogin';
import {AuthGuardHome} from './_helpers/authGuardHome';
import {NewQuestionComponent} from './homeModule/new-question/new-question.component';
import {EveryQuestionsComponent} from './homeModule/every-questions/every-questions.component';
import {ScreenQuestionComponent} from './homeModule/screen-question/screen-question.component';
import {EditQuestionComponent} from './homeModule/edit-question/edit-question.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuardLogin], children: [
      {path: '', redirectTo: '/everyQuestions', pathMatch: 'full'},
      {path: 'everyQuestions', component: EveryQuestionsComponent},
      {path: 'newQuestion', component: NewQuestionComponent},
      {path: 'screenQuestion/:id', component: ScreenQuestionComponent},
      {path: 'editQuestion/:id', component: EditQuestionComponent}
    ]},
  {path: 'login', component: LoginPageComponent, canActivate: [AuthGuardHome]},
  {path: 'sign-up', component: SignUpPageComponent, canActivate: [AuthGuardHome]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
