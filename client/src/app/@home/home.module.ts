import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../@material/angular-material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../@shared/shared.module';
import {
  AllQuestionsComponent,
  CurrentQuestionComponent,
  EditQuestionComponent,
  FilterByDisplayComponent,
  FilterByStatusComponent,
  FilterByTagComponent,
  FilterByThemeComponent,
  FilterByTimeComponent,
  FilterQuestionsComponent,
  NewQuestionComponent,
  PageQuestionsComponent,
  QuestionCardComponent,
  QuestionsToolbarComponent,
} from '@home/components';

@NgModule({
  declarations: [
    AllQuestionsComponent,
    CurrentQuestionComponent,
    EditQuestionComponent,
    FilterByDisplayComponent,
    FilterByStatusComponent,
    FilterByTagComponent,
    FilterByThemeComponent,
    FilterByTimeComponent,
    FilterQuestionsComponent,
    NewQuestionComponent,
    PageQuestionsComponent,
    QuestionCardComponent,
    QuestionsToolbarComponent,
  ],
  imports: [
    AngularMaterialModule,
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [PageQuestionsComponent, EditQuestionComponent, AllQuestionsComponent, NewQuestionComponent, CurrentQuestionComponent]
})
export class HomeModule {
}
