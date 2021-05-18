import { Component, OnInit } from '@angular/core';
import * as tags from '../../../assets/data/tags.json';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../_shared/_services/auth.service';
import {DatabaseService} from '../../_shared/_services/database.service';
import {ITags} from '../../_shared/_models/ITags';
import {IQuestion} from '../../_shared/_models/IQuestion';
import {atLeastOneCheckboxCheckedValidator} from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  newQuestionForm!: FormGroup;
  tagsData!: ITags[];

  get tagsFormArray(): FormArray {
    return this.newQuestionForm.controls.tags as FormArray;
  }

  get textarea(): AbstractControl {
    return  this.newQuestionForm.controls.textarea;
  }

  get title(): AbstractControl {
    return this.newQuestionForm.controls.title;
  }

  constructor(private router: Router, private fb: FormBuilder, private fireAuth: AuthService, private db: DatabaseService) {}

  ngOnInit(): void {
    this.createFormsInput();
  }

  private addCheckBoxes(): void {
    this.tagsData?.map(() => this.tagsFormArray.push(new FormControl(false)));
  }

  addQuestion(question: IQuestion): void {
    this.db.create(question)
      .then(() => this.router.navigate(['everyQuestions']))
      .catch((e) => throwError(e.message));
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

    this.tagsData = tags.tags;
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
    const question: IQuestion = {
      date: new Date().getTime(),
      author: this.fireAuth.email,
      title: this.title.value,
      textarea: this.textarea.value,
      tags: this.selectedCTagsId(),
    };

    this.addQuestion(question);
  }

  selectedCTagsId(): ITags[] {
    return this.newQuestionForm.value.tags
      .map((checkedId: any, i: number) => checkedId ? this.tagsData[i].id : null)
      .filter((id: string) => id !== null);
  }

}
