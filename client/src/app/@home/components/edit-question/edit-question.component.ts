import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../@shared/services/auth.service';
import { QuestionsService } from '../../../@shared/services/questions.service';
import { Tags } from '../../../@shared/models/Tags';
import { Question } from '../../../@shared/models/Question';
import { TagsConstants } from '../../../@shared/constants/TagsConstants';
import { atLeastOneCheckboxCheckedValidator } from '../../../@shared/validation/atLeastOneCheckboxCheckedValidator';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  urlId!: string;
  editQuestionForm!: FormGroup;
  editQuestion!: Question;
  tagsData!: Tags[];
  error!: string;

  get tagsFormArray(): FormArray {
    return this.editQuestionForm.controls.tags as FormArray;
  }

  get textarea(): AbstractControl {
    return this.editQuestionForm.controls.textarea;
  }

  get title(): AbstractControl {
    return this.editQuestionForm.controls.title;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initEditForm();
  }

  private addCheckBoxes(editQuestion: Question): void {
    this.tagsData.filter((tag: Tags) => {
      editQuestion.tags.indexOf(tag.item) !== -1
        ? this.tagsFormArray.push(new FormControl(true))
        : this.tagsFormArray.push(new FormControl(false));
    });
  }

  private editFormsInput(question: Question): void {
    this.editQuestion = question;
    this.tagsData = TagsConstants;

    this.editQuestionForm = this.fb.group({
      title: this.fb.control(question.title, Validators.required),
      textarea: this.fb.control(question.textarea, [Validators.required, Validators.minLength(6)]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });
    console.log(this.editQuestionForm);

    this.addCheckBoxes(question);
  }

  private initEditForm(): void {
    this.activatedRoute.params
      .pipe(
        tap((url: Params) => (this.urlId = url.id)),
        switchMap(() => this.questionsService.getQuestionsById(this.urlId)),
        takeUntil(this.destroy$)
      )
      .subscribe((question: Question) => this.editFormsInput(question));
  }

  public getErrorTitle(): string {
    return this.title.errors?.required ? 'You must enter a value' : '';
  }

  public getErrorTextArea(): string {
    if (this.textarea.errors?.required) {
      return 'You must enter value';
    }

    return this.textarea.errors?.minlength ? 'Min length 6 letters' : '';
  }

  public onCancel(): void {
    this.router.navigateByUrl(`questions/open/${this.urlId}`);
  }

  public onSave(): void {
    const question: Question = {
      ...this.editQuestion,
      title: this.editQuestionForm.value.title,
      textarea: this.editQuestionForm.value.textarea,
      tags: this.selectedTagsItem(),
    };

    this.onUpdateQuestionById(this.urlId, question);
  }

  private onUpdateQuestionById(id: string, question: Question): void {
    this.questionsService
      .updateQuestionById(id, question)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (question: Question) => question,
        (error) => (this.error = error),
        () => this.onCancel()
      );
  }

  private selectedTagsItem(): Tags[] {
    return this.editQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => (checkedItem ? this.tagsData[i].item : null))
      .filter((item: string) => item != null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
