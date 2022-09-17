import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuestionsTimeConstants } from '@shared/constants';
import { FilterHelper } from '../../../../../../@shared/helpers';
import { QuestionsTime } from '@shared/models';
import { atLeastOneCheckboxCheckedValidator } from '@shared/validation';

@Component({
  selector: 'app-filter-by-time',
  templateUrl: 'filter-by-time.component.html',
  styleUrls: ['filter-by-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByTimeComponent implements OnInit {
  @Input() timeQuestions: string | null;
  @Output() filterByTime: EventEmitter<string | null> = new EventEmitter<string | null>();

  constructor(private fb: FormBuilder) {}

  get timeFormArray(): FormArray {
    return this.formTime.controls.time as FormArray;
  }

  public formTime: FormGroup;
  public formArrayNameTime = 'time';
  public questionsTimeData: QuestionsTime[] = [];

  ngOnInit(): void {
    this.questionsTimeData = QuestionsTimeConstants;

    this.formTime = this.fb.group({
      [this.formArrayNameTime]: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });

    FilterHelper.setDataForFormArray(this.questionsTimeData, this.timeFormArray, this.timeQuestions);
  }

  public filter(event: { source: { name: string }; checked: boolean }): void {
    const timeName = event.source.name;

    if (event.checked) {
      this.timeQuestions = timeName;
      FilterHelper.updateCheckBoxesForFormArray(this.questionsTimeData, this.timeFormArray, this.timeQuestions);
    } else {
      this.timeQuestions = null;
      FilterHelper.updateCheckBoxesForFormArray(this.questionsTimeData, this.timeFormArray, this.timeQuestions);
    }

    this.filterByTime.emit(this.timeQuestions);
  }
}
