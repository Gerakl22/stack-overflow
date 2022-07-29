import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AllQuestionsComponent,
  CurrentQuestionComponent,
  EditQuestionComponent,
  NewQuestionComponent,
  PageQuestionsComponent,
} from './components';

const routes = [
  {
    path: '',
    component: PageQuestionsComponent,
    children: [
      { path: 'all', component: AllQuestionsComponent },
      { path: 'add', component: NewQuestionComponent },
      { path: 'open/:id', component: CurrentQuestionComponent },
      { path: 'edit/:id', component: EditQuestionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
