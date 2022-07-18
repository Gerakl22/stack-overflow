import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './_shared/_material/angular-material.module';
import { MatIconRegistry } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { HomePageComponent } from './homeModule/home-page/home-page.component';
import { NewQuestionComponent } from './homeModule/new-question/new-question.component';
import { EveryQuestionsComponent } from './homeModule/every-questions/every-questions.component';
import { ScreenQuestionComponent } from './homeModule/screen-question/screen-question.component';
import { EditQuestionComponent } from './homeModule/edit-question/edit-question.component';

import { QuestionsService } from './_shared/_services/questions.service';
import { ThemeService } from './_shared/_services/theme.service';

import { FilterByStatusQuestionsPipe } from './_shared/pipes/filter-by-status-questions.pipe';
import { FilterByTagsPipe } from './_shared/pipes/filter-by-tags.pipe';
import { FilterPerPeriodOfTimePipe } from './_shared/pipes/filter-per-period-of-time.pipe';
import { FilterBySortPipe } from './_shared/pipes/filter-by-sort.pipe';
import { AuthModule } from './authModule/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    EveryQuestionsComponent,
    NewQuestionComponent,
    ScreenQuestionComponent,
    EditQuestionComponent,
    FilterPerPeriodOfTimePipe,
    FilterByStatusQuestionsPipe,
    FilterByTagsPipe,
    FilterBySortPipe,
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [QuestionsService, ThemeService],
  bootstrap: [AppComponent],
  exports: [HeaderComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
