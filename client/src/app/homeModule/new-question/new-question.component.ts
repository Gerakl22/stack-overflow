import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { Tags } from '../../_shared/_models/Tags';
import { Question } from '../../_shared/_models/Question';
import { TagsConstants } from '../../_shared/constants/TagsConstants';
import { atLeastOneCheckboxCheckedValidator } from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';
import { User } from '../../_shared/_models/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit, OnDestroy {
  private author!: string;
  private destroy$: Subject<void> = new Subject<void>();
  public error!: string;
  public newQuestionForm!: FormGroup;
  public tagsData!: Tags[];

  get tagsFormArray(): FormArray {
    return this.newQuestionForm.controls.tags as FormArray;
  }

  get textarea(): AbstractControl {
    return this.newQuestionForm.controls.textarea;
  }

  get title(): AbstractControl {
    return this.newQuestionForm.controls.title;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.initNewQuestionForm();
    this.addCheckBoxes();
  }

  private addCheckBoxes(): void {
    this.tagsData = TagsConstants;
    this.tagsData?.forEach(() => this.tagsFormArray.push(new FormControl(false)));
  }

  private initNewQuestionForm(): void {
    this.newQuestionForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      textarea: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });

    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.author = user.email;
      });
  }

  private selectedTagsItem(): Tags[] {
    return this.newQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => (checkedItem ? this.tagsData[i].item : null))
      .filter((item: string) => item !== null);
  }

  public getErrorTitle(): string {
    return this.title.errors?.required ? 'You must enter a value' : '';
  }

  public getErrorTextarea(): string {
    if (this.textarea.errors?.required) {
      return 'You must enter value';
    }

    return this.textarea.errors?.minlength ? 'Min length 6 letters' : '';
  }

  public onCancel(): void {
    this.router.navigateByUrl('questions/all');
  }

  public onSubmit(): void {
    const question: Question = {
      date: new Date().getTime(),
      author: this.author,
      title: this.title.value,
      textarea: this.textarea.value,
      tags: this.selectedTagsItem(),
      isApproval: false,
    };
    console.log(question);

    this.questionsService
      .createQuestion(question)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (q: Question) => q,
        (error) => (this.error = error),
        () => this.onCancel()
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
