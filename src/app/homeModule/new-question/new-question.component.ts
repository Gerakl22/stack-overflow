import { Component, OnInit } from '@angular/core';
import * as tags from '../../../assets/data/tags.json';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ITags} from '../../_shared/_models/ITags';
import {atLeastOneCheckboxCheckedValidator} from '../../_shared/validators/atLeastOneCheckboxCheckedValidator';
import {of} from 'rxjs';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  myForm!: FormGroup;
  tagsData!: ITags[];

  get tagsFormArray(): FormArray {
    return this.myForm.controls.tags as FormArray;
  }

  get title(): AbstractControl {
    return this.myForm.controls.title;
  }

  get textarea(): AbstractControl {
    return  this.myForm.controls.textarea;
  }

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormsInput();
  }

  private addCheckBoxes(): void {
    this.tagsData?.forEach(() => this.tagsFormArray.push(new FormControl(false)));
  }

  createFormsInput(): void {
    this.myForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      textarea: this.fb.control('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      tags: this.fb.array([], atLeastOneCheckboxCheckedValidator(1))
    });

    of(tags.tags).subscribe((next) => {
      this.tagsData = next;
      this.addCheckBoxes();
    });
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
    const selectedCTagsId = this.myForm.value.tags
      .map((checkedId: any, i: number) => checkedId ? this.tagsData[i].id : null)
      .filter((id: string) => id !== null);

    console.log(selectedCTagsId);
  }
}
