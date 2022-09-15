import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  QuestionsDisplayConstants,
  QuestionsStatusConstants,
  QuestionsTimeConstants,
  TagsConstants,
  ThemeConstants,
} from '@shared/constants';
import { DisplayQuestionsEnum, StatusQuestionsEnum } from '@shared/enum';
import { Question, QuestionsDisplay, QuestionsStatus, QuestionsTime, Tags, Theme } from '@shared/models';
import { QuestionsService, ThemeService } from '@shared/services';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { atLeastOneCheckboxCheckedValidator } from '@shared/validation';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllQuestionsComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  get tagsFormArray(): FormArray {
    return this.filterQuestionsForm.controls.tags as FormArray;
  }

  get timeFormArray(): FormArray {
    return this.filterQuestionsForm.controls.time as FormArray;
  }

  get statusFormArray(): FormArray {
    return this.filterQuestionsForm.controls.status as FormArray;
  }

  public electedTags: Tags[] = [];
  public filterQuestionsForm!: FormGroup;
  public isLineDisplay = false;
  public isSortQuestions = false;
  public questions$: Observable<Question[]>;
  public questionsDisplayData: QuestionsDisplay[] = [];
  public questionsStatusData: QuestionsStatus[] = [];
  public questionsTimeData: QuestionsTime[] = [];
  public statusQuestions: string = StatusQuestionsEnum.ALL;
  public tagsData: Tags[] = [];
  public timeQuestions = null;
  public themeData: Theme[] = [];

  private addCheckBoxes(): void {
    this.tagsData.forEach((item: Tags) => {
      this.tagsFormArray.push(new FormControl(true));
      this.electedTags.push(item.value);
    });

    this.setDataForFormArray(this.questionsStatusData, this.statusFormArray, this.statusQuestions);
    this.setDataForFormArray(this.questionsTimeData, this.timeFormArray, this.timeQuestions);
  }

  private initFilterDataAndForm(): void {
    this.questionsDisplayData = QuestionsDisplayConstants;
    this.questionsStatusData = QuestionsStatusConstants;
    this.questionsTimeData = QuestionsTimeConstants;
    this.tagsData = TagsConstants;
    this.themeData = ThemeConstants;

    this.filterQuestionsForm = this.fb.group({
      status: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
      tags: this.fb.array([]),
      time: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });

    this.addCheckBoxes();
  }

  private loadQuestions(): void {
    this.questions$ = this.questionsService.getQuestions().pipe(
      tap(() => this.cdr.detectChanges()),
      catchError((error) => error.message)
    ) as Observable<Question[]>;
  }

  private setDataForFormArray(array: Array<any>, formArray: FormArray, value: string): void {
    array.map((item) => {
      if (item.value === value) {
        formArray.push(new FormControl(true));
      } else {
        formArray.push(new FormControl(false));
      }
    });
  }

  private updateCheckBoxesForFormArray(array: Array<any>, formArray: FormArray, value: string): void {
    let newArray = [];

    array.map((item) => {
      if (item.value === value) {
        newArray.push(true);
      } else {
        newArray.push(false);
      }
    });

    formArray.setValue(newArray);
  }

  ngOnInit(): void {
    this.initFilterDataAndForm();
    this.loadQuestions();
  }

  public onChangeTheme(themeName: string): void {
    this.themeData.find((theme: Theme) => {
      if (theme.name === themeName) {
        this.themeService.setTheme(themeName);
        theme.checked = true;
      } else {
        theme.checked = false;
      }
    });
  }

  public onDisplayQuestions(display: string): void {
    this.isLineDisplay = display === DisplayQuestionsEnum.LINE;
  }

  public onFilterByStatusQuestions(event: { source: { name: string }; checked: boolean }): void {
    let statusName = event.source.name;

    if (event.checked) {
      this.statusQuestions = statusName;
      this.updateCheckBoxesForFormArray(this.questionsStatusData, this.statusFormArray, this.statusQuestions);
    } else {
      this.statusQuestions = StatusQuestionsEnum.ALL;
      this.updateCheckBoxesForFormArray(this.questionsStatusData, this.statusFormArray, this.statusQuestions);
    }
  }

  public onFilterByTags(event: { source: { name: any }; checked: boolean }): void {
    const tagName = event.source.name;

    if (event.checked) {
      this.electedTags.push(tagName);
    } else {
      if (this.electedTags.length > 1) {
        this.electedTags = this.electedTags.filter((tag: Tags) => tag !== tagName);
      } else {
        this.updateCheckBoxesForFormArray(this.tagsData, this.tagsFormArray, tagName);
      }
    }
  }

  public onFilterPerPeriodOfTime(event: { source: { name: string }; checked: boolean }): void {
    const timeName = event.source.name;

    if (event.checked) {
      this.timeQuestions = timeName;
      this.updateCheckBoxesForFormArray(this.questionsTimeData, this.timeFormArray, this.timeQuestions);
    } else {
      this.timeQuestions = null;
      this.updateCheckBoxesForFormArray(this.questionsTimeData, this.timeFormArray, this.timeQuestions);
    }
  }

  public onRemoveQuestionById(id: string): void {
    if (id) {
      this.questions$ = this.questionsService.removeQuestionById(id).pipe(
        tap(() => this.cdr.detectChanges()),
        catchError((error) => error.message)
      ) as Observable<Question[]>;
    }
  }

  public onSortQuestions(isSort: boolean): boolean {
    return (this.isSortQuestions = isSort);
  }
}
