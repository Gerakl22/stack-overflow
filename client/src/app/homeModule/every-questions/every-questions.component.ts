import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { ThemeService } from '../../_shared/_services/theme.service';
import { Tags } from '../../_shared/_models/Tags';
import { Question } from '../../_shared/_models/Question';
import { QuestionsStatus } from '../../_shared/_models/QuestionsStatus';
import { QuestionsTime } from '../../_shared/_models/QuestionsTime';
import { QuestionsDisplay } from '../../_shared/_models/QuestionsDisplay';
import { Theme } from '../../_shared/_models/Theme';
import { TagsConstants } from '../../_shared/constants/TagsConstants';
import { ThemeConstants } from '../../_shared/constants/ThemeConstants';
import { QuestionsStatusConstants } from '../../_shared/constants/QuestionsStatusConstants';
import { QuestionsTimeConstants } from '../../_shared/constants/QuestionsTimeConstants';
import { QuestionsDisplayConstants } from '../../_shared/constants/QuestionsDisplayConstants';
import { LocalStorageConstants } from '../../_shared/constants/LocalStorageConstants';
import { User } from '../../_shared/_models/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss'],
})
export class EveryQuestionsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  tagsData!: Tags[];
  themeData!: Theme[];
  questionsStatusData!: QuestionsStatus[];
  questionsTimeData!: QuestionsTime[];
  questionsDisplayData!: QuestionsDisplay[];
  questionsArray!: Question[];
  electedTags: Tags[] = [];
  filterQuestionsForm!: FormGroup;
  timeQuestions = null;
  statusQuestions = 'All';
  authUser!: User;
  isSortQuestions = false;
  isLineDisplay = false;

  get tagsFormArray(): FormArray {
    return this.filterQuestionsForm.controls.tags as FormArray;
  }

  get timeFormArray(): FormArray {
    return this.filterQuestionsForm.controls.time as FormArray;
  }

  get statusFormArray(): FormArray {
    return this.filterQuestionsForm.controls.status as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.tagsData = TagsConstants;
    this.themeData = ThemeConstants;
    this.questionsStatusData = QuestionsStatusConstants;
    this.questionsTimeData = QuestionsTimeConstants;
    this.questionsDisplayData = QuestionsDisplayConstants;

    this.filterQuestionsForm = this.fb.group({
      status: this.fb.array([]),
      tags: this.fb.array([]),
      time: this.fb.array([]),
    });

    console.log(this.filterQuestionsForm);

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

    this.addCheckBoxes();
  }

  private addCheckBoxes(): void {
    this.tagsData.forEach(() => this.tagsFormArray.push(new FormControl(false)));
    this.questionsStatusData.filter((status: QuestionsStatus) =>
      status.item === this.statusQuestions
        ? this.statusFormArray.push(new FormControl(true))
        : this.statusFormArray.push(new FormControl(false))
    );
    this.questionsTimeData.filter((time: QuestionsTime) =>
      time.value === this.timeQuestions ? this.timeFormArray.push(new FormControl(true)) : this.timeFormArray.push(new FormControl(false))
    );
  }

  public onApproveQuestion(id: string): void {
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
    this.isLineDisplay = display === 'Line';
  }

  public onFilterByTags(event: { source: { name: any }; checked: boolean }): void {
    const tagName = event.source.name;
    if (event.checked) {
      this.electedTags.push(tagName);
    } else {
      this.electedTags = this.electedTags.filter((tag: Tags) => tag !== tagName);
    }
  }

  public onFilterByStatusQuestions(event: { source: { name: any; id: string }; checked: boolean }): void {
    const statusName = event.source.name;
    const id = event.source.id;

    if (event.checked) {
      this.statusQuestions = statusName;
      this.statusFormArray.controls.filter((status: any, i: number) => (Number(id) === i ? (status.value = true) : (status.value = false)));
    } else {
      this.statusQuestions = 'All';
      this.questionsStatusData.find((statusQuestions: QuestionsStatus) => {
        if (this.statusQuestions === statusQuestions.item) {
          this.statusFormArray.controls.filter((status: any, i: number) =>
            Number(statusQuestions.id) === i ? (status.value = true) : (status.value = false)
          );
        }
      });
    }
  }

  public onFilterPerPeriodOfTime(event: { source: { name: any; id: string }; checked: boolean }): void {
    const timeName = event.source.name;
    const id = event.source.id;

    if (event.checked) {
      this.timeQuestions = timeName;
      this.timeFormArray.controls.filter((status: any, i: number) =>
        Number(id) - 10 === i ? (status.value = true) : (status.value = false)
      );
    } else {
      this.timeQuestions = null;
      this.questionsTimeData.find((timeQuestions: QuestionsTime) => {
        if (this.timeQuestions === timeQuestions.value) {
          this.timeFormArray.controls.filter((time: any, i: number) =>
            Number(timeQuestions.id) - 10 === i ? (time.value = true) : (time.value = false)
          );
        }
      });
    }
  }

  public onOpenScreenQuestionById(id: string): void {
    this.router.navigateByUrl(`questions/open/${id}`);
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
