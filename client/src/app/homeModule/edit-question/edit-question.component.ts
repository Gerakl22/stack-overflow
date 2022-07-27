import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { Tags } from '../../_shared/_models/Tags';
import { Question } from '../../_shared/_models/Question';
import { TagsConstants } from '../../_shared/constants/TagsConstants';
import { atLeastOneCheckboxCheckedValidator } from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
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
    this.activatedRoute.params
      .pipe(
        tap((url: Params) => {
          this.urlId = url.id;
        }),
        switchMap(() => this.questionsService.getQuestionsById(this.urlId))
      )
      .subscribe((question: Question) => {
        this.editQuestion = question;
        this.editFormsInput(this.editQuestion);
      });
  }

  private addCheckBoxes(editQuestion: Question): void {
    this.tagsData.filter((tag: Tags) => {
      editQuestion.tags.indexOf(tag.item) !== -1
        ? this.tagsFormArray.push(new FormControl(true))
        : this.tagsFormArray.push(new FormControl(false));
    });
  }

  editFormsInput(editQuestion: Question): void {
    this.tagsData = TagsConstants;

    this.editQuestionForm = this.fb.group({
      title: this.fb.control(editQuestion.title, Validators.required),
      textarea: this.fb.control(editQuestion.textarea, [Validators.required, Validators.minLength(6)]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });
    console.log(this.editQuestionForm);

    this.addCheckBoxes(editQuestion);
  }

  getErrorTitle(): string {
    return this.title.errors?.required ? 'You must enter a value' : '';
  }

  getErrorTextArea(): string {
    if (this.textarea.errors?.required) {
      return 'You must enter value';
    }

    return this.textarea.errors?.minlength ? 'Min length 6 letters' : '';
  }

  onCancel(): void {
    this.router.navigate([`questions/open/${this.urlId}`]);
  }

  onSave(): void {
    const questionObject: Question = {
      ...this.editQuestion,
      title: this.editQuestionForm.value.title,
      textarea: this.editQuestionForm.value.textarea,
      tags: this.selectedTagsItem(),
    };

    this.onUpdateQuestionByIdAndQuestion(this.urlId);
  }

  onUpdateQuestionByIdAndQuestion(id: string): void {
    this.questionsService.approveQuestionById(id).subscribe(
      (question: Question[]) => question,
      (error) => (this.error = error),
      () => this.onCancel()
    );
  }

  selectedTagsItem(): Tags[] {
    return this.editQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => (checkedItem ? this.tagsData[i].item : null))
      .filter((item: string) => item != null);
  }
}
