import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../_shared/_services/auth.service';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {Tags} from '../../_shared/_models/Tags';
import {Question} from '../../_shared/_models/Question';
import {TagsConstants} from '../../_shared/constants/TagsConstants';
import {atLeastOneCheckboxCheckedValidator} from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';


@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  editQuestionForm!: FormGroup;
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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.createFormsInput();
  }

  private addCheckBoxes(): void {
    this.tagsData.map(() => this.tagsFormArray.push(new FormControl(false)));
  }

  createFormsInput(): void {
    this.editQuestionForm = this.fb.group({
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

  getErrorTextArea(): string {
    if (this.textarea.errors?.required) {
      return 'You must enter value';
    }

    return this.textarea.errors?.minlength ? 'Min length 6 letters' : '';
  }

  onCancel(): void {
    this.router.navigate(['everyQuestions']);
  }

  onSave(): void {
    const question: Question = {
      date: new Date().getTime(),
      author: this.authService.email,
      title: this.editQuestionForm.value.title,
      textarea: this.editQuestionForm.value.text,
      tags: this.selectedCTagsItem(),
    };

    this.updateQuestion(question);
  }

  selectedCTagsItem(): Tags[] {
    return this.editQuestionForm.value.tags
      .map((checkedItem: Tags, i: number) => checkedItem ? this.tagsData[i].item : null)
      .filter((item: string) => item != null);
  }

  updateQuestion(question: Question): void {
      this.questionsService.put(question).subscribe(
        (res) => console.log(res),
    (error) => this.error = error,
        () => this.onCancel(),
      );
  }

}
