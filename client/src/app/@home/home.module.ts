import { NgModule } from '@angular/core';
import {
  AllQuestionsComponent,
  CurrentQuestionComponent,
  EditQuestionComponent,
  NewQuestionComponent,
  PageQuestionsComponent,
} from './components';
import { AngularMaterialModule } from '../@material/angular-material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../@shared/shared.module';
import { QuestionCardComponent } from '@home/components';
import { SortQuestionsComponent } from '@home/components';

@NgModule({
  declarations: [
    PageQuestionsComponent,
    EditQuestionComponent,
    AllQuestionsComponent,
    SortQuestionsComponent,
    QuestionCardComponent,
    NewQuestionComponent,
    CurrentQuestionComponent,
  ],
  imports: [
    AngularMaterialModule,
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [PageQuestionsComponent, EditQuestionComponent, AllQuestionsComponent, NewQuestionComponent, CurrentQuestionComponent],
})
export class HomeModule {}
