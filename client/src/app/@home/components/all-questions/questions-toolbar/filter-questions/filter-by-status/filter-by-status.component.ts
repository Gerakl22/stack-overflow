import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuestionsStatusConstants } from '@shared/constants';
import { StatusQuestionsEnum } from '@shared/enum';
import { FilterHelper } from '../../../../../../@shared/helpers';
import { QuestionsStatus } from '@shared/models';
import { atLeastOneCheckboxCheckedValidator } from '@shared/validation';

@Component({
  selector: 'app-filter-by-status',
  templateUrl: 'filter-by-status.component.html',
  styleUrls: ['filter-by-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterByStatusComponent implements OnInit {
  @Input() statusQuestions: string;
  @Output() filterByStatus: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  get statusFormArray(): FormArray {
    return this.formStatus.controls.status as FormArray;
  }

  public formStatus: FormGroup;
  public formArrayNameStatus = 'status';
  public questionsStatusData: QuestionsStatus[] = [];

  ngOnInit(): void {
    this.questionsStatusData = QuestionsStatusConstants;

    this.formStatus = this.fb.group({
      [this.formArrayNameStatus]: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });

    FilterHelper.setDataForFormArray(this.questionsStatusData, this.statusFormArray, this.statusQuestions);
  }

  public filter(event: { source: { name: string }; checked: boolean }): void {
    let statusName = event.source.name;

    if (event.checked) {
      this.statusQuestions = statusName;
      FilterHelper.updateCheckBoxesForFormArray(this.questionsStatusData, this.statusFormArray, this.statusQuestions);
    } else {
      this.statusQuestions = StatusQuestionsEnum.ALL;
      FilterHelper.updateCheckBoxesForFormArray(this.questionsStatusData, this.statusFormArray, this.statusQuestions);
    }

    this.filterByStatus.emit(this.statusQuestions);
  }
}
