import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {Router} from '@angular/router';
import {Tags} from '../../_shared/_models/Tags';
import {Question} from '../../_shared/_models/Question';
import {Theme} from '../../_shared/_models/Theme';
import {TagsConstants} from '../../_shared/constants/TagsConstants';
import {ThemeConstants} from '../../_shared/constants/ThemeConstants';


@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss']
})
export class EveryQuestionsComponent implements OnInit {

  tagsForm!: FormGroup;
  tagsData!: Tags[];
  themeData!: Theme[];
  questionsArray: Question[] = [];

  get tagsFormArray(): FormArray {
    return this.tagsForm.controls.tags as FormArray;
  }

  constructor(private fb: FormBuilder, private questionsService: QuestionsService, private router: Router) { }

  ngOnInit(): void {
    this.tagsData = TagsConstants;
    this.themeData = ThemeConstants;

    this.tagsForm = this.fb.group({
      tags: this.fb.array([]),
    });

    this.questionsService.get().subscribe(
      (question) => {
        this.questionsArray = Object.values(question);
        console.log(this.questionsArray);
      });

    this.addCheckBoxes();

  }

  private addCheckBoxes(): void {
    this.tagsData.map(() => this.tagsFormArray.push(new FormControl(false)));
  }

  openScreenQuestion(question: Question): void {
    this.router.navigate(['screenQuestion', question.id]);
  }

}
