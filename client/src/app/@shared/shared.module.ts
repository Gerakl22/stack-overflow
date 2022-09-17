import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../@material/angular-material.module';
import { FilterButtonComponent, HeaderComponent, SortComponent } from '@shared/components';
import { AuthGuardHome, AuthGuardLogin } from './guards';
import { FilterBySortPipe, FilterByStatusQuestionsPipe, FilterByTagsPipe, FilterPerPeriodOfTimePipe } from '@shared/pipes';

@NgModule({
  declarations: [
    HeaderComponent,
    FilterButtonComponent,
    FilterPerPeriodOfTimePipe,
    FilterByStatusQuestionsPipe,
    FilterByTagsPipe,
    FilterBySortPipe,
    SortComponent
  ],
  imports: [AngularMaterialModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FilterButtonComponent,
    FilterPerPeriodOfTimePipe,
    FilterByStatusQuestionsPipe,
    FilterByTagsPipe,
    FilterBySortPipe,
    SortComponent
  ],
  providers: [AuthGuardHome, AuthGuardLogin]
})
export class SharedModule {
}
