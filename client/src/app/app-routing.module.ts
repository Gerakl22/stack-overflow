import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homeModule/home-page/home-page.component';
import { AuthGuardLogin } from './_helpers/authGuardLogin';
import { AuthGuardHome } from './_helpers/authGuardHome';
import { NewQuestionComponent } from './homeModule/new-question/new-question.component';
import { EveryQuestionsComponent } from './homeModule/every-questions/every-questions.component';
import { ScreenQuestionComponent } from './homeModule/screen-question/screen-question.component';
import { EditQuestionComponent } from './homeModule/edit-question/edit-question.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    // canActivate: [AuthGuardLogin],
    children: [
      { path: '', redirectTo: '/everyQuestions', pathMatch: 'full' },
      { path: 'everyQuestions', component: EveryQuestionsComponent },
      { path: 'newQuestion', component: NewQuestionComponent },
      { path: 'screenQuestion/:id', component: ScreenQuestionComponent },
      { path: 'editQuestion/:id', component: EditQuestionComponent },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./authModule/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'login',
  //   component: LoginPageComponent,
  //   // canActivate: [AuthGuardHome],
  // },
  // {
  //   path: 'sign-up',
  //   component: SignUpPageComponent,
  //   // canActivate: [AuthGuardHome],
  // },
];

const config: ExtraOptions = {
  useHash: false,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
