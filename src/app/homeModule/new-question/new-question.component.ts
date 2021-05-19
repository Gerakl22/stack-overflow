import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../_shared/_services/auth.service';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {Tags} from '../../_shared/_models/Tags';
import {Question} from '../../_shared/_models/Question';
import {atLeastOneCheckboxCheckedValidator} from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';
import {TagsConstants} from '../../_shared/constants/TagsConstants';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  newQuestionForm!: FormGroup;
  tagsData!: Tags[];
  error!: string;

  get tagsFormArray(): FormArray {
    return this.newQuestionForm.controls.tags as FormArray;
  }

  get textarea(): AbstractControl {
    return  this.newQuestionForm.controls.textarea;
  }

  get title(): AbstractControl {
    return this.newQuestionForm.controls.title;
  }

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.createFormsInput();
  }

  private addCheckBoxes(): void {
    this.tagsData?.map(() => this.tagsFormArray.push(new FormControl(false)));
  }

  addQuestion(question: Question): void {
    this.questionsService.post(question).subscribe(
      (resolve) => resolve,
      error => this.error = error,
      () => this.router.navigate(['everyQuestions'])
    );
  }

  createFormsInput(): void {
    this.newQuestionForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      textarea: this.fb.control('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1))
    });

    this.tagsData = TagsConstants;
    this.addCheckBoxes();
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
      author: this.authService.email,
      title: this.title.value,
      textarea: this.textarea.value,
      tags: this.selectedCTagsItem(),
    };

    this.addQuestion(question);
  }

  selectedCTagsItem(): Tags[] {
    return this.newQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => checkedItem ? this.tagsData[i].item : null)
      .filter((item: string) => item !== null);
  }

}
