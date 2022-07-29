import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../@material/angular-material.module';

import { FilterBySortPipe, FilterByStatusQuestionsPipe, FilterByTagsPipe, FilterPerPeriodOfTimePipe } from './pipes';

import { HeaderComponent } from './components';

import { AuthGuardHome, AuthGuardLogin } from './guards';

@NgModule({
  declarations: [HeaderComponent, FilterPerPeriodOfTimePipe, FilterByStatusQuestionsPipe, FilterByTagsPipe, FilterBySortPipe],
  imports: [AngularMaterialModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, FilterPerPeriodOfTimePipe, FilterByStatusQuestionsPipe, FilterByTagsPipe, FilterBySortPipe],
  providers: [AuthGuardHome, AuthGuardLogin],
})
export class SharedModule {}
