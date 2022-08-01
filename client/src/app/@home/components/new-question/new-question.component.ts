import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorConstants, RoutesConstants, TagsConstants } from '@shared/constants';
import { Question, Tags, User } from '@shared/models';
import { AuthService, QuestionsService } from '@shared/services';
import { atLeastOneCheckboxCheckedValidator } from '@shared/validation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  get tagsFormArray(): FormArray {
    return this.newQuestionForm.controls.tags as FormArray;
  }

  get textarea(): AbstractControl {
    return this.newQuestionForm.controls.textarea;
  }

  get title(): AbstractControl {
    return this.newQuestionForm.controls.title;
  }

  private author!: string;
  private destroy$: Subject<void> = new Subject<void>();
  public error!: string;
  private redirectDelay = 0;
  public newQuestionForm!: FormGroup;
  public tagsData: Tags[] = [];

  private addCheckBoxes(): void {
    this.tagsData = TagsConstants;
    this.tagsData.forEach(() => this.tagsFormArray.push(new FormControl(false)));
  }

  private getCurrentUser(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.author = user.email;
      });
  }

  private initNewQuestionForm(): void {
    this.newQuestionForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      textarea: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1))
    });

    this.getCurrentUser();
  }

  private onCreateQuestion(question: Question): void {
    this.questionsService
      .createQuestion(question)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => setTimeout(() => this.onCancel(), this.redirectDelay),
        (error) => (this.error = error)
      );
  }

  private selectedTagsItem(): Tags[] {
    return this.newQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => (checkedItem ? this.tagsData[i].item : null))
      .filter((item: string) => item !== null);
  }

  ngOnInit(): void {
    this.initNewQuestionForm();
    this.addCheckBoxes();
  }

  public getErrorTitle(): string {
    return this.title.errors?.required ? ErrorConstants.TITLE.MUST_VALUE : ErrorConstants.EMPTY_STRING;
  }

  public getErrorTextarea(): string {
    if (this.textarea.errors?.required) {
      return ErrorConstants.TEXTAREA.MUST_VALUE;
    }

    return this.textarea.errors?.minlength ? ErrorConstants.TEXTAREA.LENGTH : ErrorConstants.EMPTY_STRING;
  }

  public onCancel(): void {
    this.router.navigateByUrl(RoutesConstants.QUESTIONS.ALL);
  }

  public onSubmit(): void {
    const question: Question = {
      date: new Date().getTime(),
      author: this.author,
      title: this.title.value,
      textarea: this.textarea.value,
      tags: this.selectedTagsItem(),
      isApproval: false
    };

    this.onCreateQuestion(question);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
