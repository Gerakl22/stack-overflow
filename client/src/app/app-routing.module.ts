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
    path: 'questions',
    component: HomePageComponent,
    canActivate: [AuthGuardLogin],
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: EveryQuestionsComponent },
      { path: 'add', component: NewQuestionComponent },
      { path: 'open/:id', component: ScreenQuestionComponent },
      { path: 'edit/:id', component: EditQuestionComponent },
    ],
  },
  {
    path: 'auth',
    canActivate: [AuthGuardHome],
    loadChildren: () => import('./authModule/auth.module').then((m) => m.AuthModule),
  },
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
