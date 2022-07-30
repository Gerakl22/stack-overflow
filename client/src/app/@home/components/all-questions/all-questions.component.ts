import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LocalStorageConstants,
  QuestionsDisplayConstants,
  QuestionsStatusConstants,
  QuestionsTimeConstants,
  RoutesConstants,
  TagsConstants,
  ThemeConstants,
} from '@shared/constants';
import { DisplayQuestionsEnum, StatusQuestionsEnum } from '@shared/enum';
import { Question, QuestionsDisplay, QuestionsStatus, QuestionsTime, Tags, Theme, User } from '@shared/models';
import { QuestionsService, ThemeService } from '@shared/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { atLeastOneCheckboxCheckedValidator } from '@shared/validation';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
})
export class AllQuestionsComponent implements OnInit, OnDestroy {
  constructor(
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

  private destroy$: Subject<void> = new Subject<void>();
  public authUser!: User;
  public electedTags: Tags[] = [];
  public filterQuestionsForm!: FormGroup;
  public isLineDisplay = false;
  public isSortQuestions = false;
  public questionsArray: Question[] = [];
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
    this.questionsService
      .getQuestions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (questions: Question[]) => {
          if (questions) {
            this.questionsArray = questions;
            this.authUser = JSON.parse(localStorage.getItem(LocalStorageConstants.AUTH_USER) || 'null');
          }
        },
        (error) => error.message
      );
  }

  private setDataForFormArray(array: Array<any>, formArray: FormArray, value: string): void {
    array.filter((item) => {
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

  public onApproveQuestionById(id: string): void {
    this.questionsService
      .approveQuestionById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (question: Question[]) => (this.questionsArray = question),
        (error) => error.message
      );
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

  public onOpenCurrentQuestionById(id: string): void {
    this.router.navigateByUrl(`${RoutesConstants.QUESTIONS.CURRENT}${id}`);
  }

  public onRemoveQuestionById(id: string): void {
    this.questionsService
      .removeQuestionById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (question: Question[]) => (this.questionsArray = question),
        (error) => error.message
      );
  }

  public onSortQuestions(): void {
    this.isSortQuestions = !this.isSortQuestions;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
