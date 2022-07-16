import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { Tags } from '../../_shared/_models/Tags';
import { Question } from '../../_shared/_models/Question';
import { TagsConstants } from '../../_shared/constants/TagsConstants';
import { atLeastOneCheckboxCheckedValidator } from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {
  newQuestionForm!: FormGroup;
  tagsData!: Tags[];
  error!: string;
  author!: string | null | undefined;

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
  ) {
    // this.author = authService.user?.email;
  }

  ngOnInit(): void {
    this.newQuestionForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      textarea: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1)),
    });

    this.tagsData = TagsConstants;
    this.addCheckBoxes();
  }

  private addCheckBoxes(): void {
    this.tagsData?.forEach(() => this.tagsFormArray.push(new FormControl(false)));
  }

  getErrorTitle(): string {
    return this.title.errors?.required ? 'You must enter a value' : '';
  }

  getErrorTextarea(): string {
    if (this.textarea.errors?.required) {
      return 'You must enter value';
    }

    return this.textarea.errors?.minlength ? 'Min length 6 letters' : '';
  }

  onCancel(): void {
    this.router.navigate(['everyQuestions']);
  }

  onSubmit(): void {
    const question: Question = {
      date: new Date().getTime(),
      author: this.author,
      title: this.title.value,
      textarea: this.textarea.value,
      tags: this.selectedTagsItem(),
      comments: [],
      isApproval: false,
    };

    this.questionsService.createQuestion(question).subscribe(
      (q: Question) => q,
      (error) => (this.error = error),
      () => this.onCancel()
    );
  }

  selectedTagsItem(): Tags[] {
    return this.newQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => (checkedItem ? this.tagsData[i].item : null))
      .filter((item: string) => item !== null);
  }
}
