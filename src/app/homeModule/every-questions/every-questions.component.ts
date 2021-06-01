import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {Router} from '@angular/router';
import {Tags} from '../../_shared/_models/Tags';
import {Question} from '../../_shared/_models/Question';
import {Theme} from '../../_shared/_models/Theme';
import {TagsConstants} from '../../_shared/constants/TagsConstants';
import {ThemeConstants} from '../../_shared/constants/ThemeConstants';
import {ThemeService} from '../../_shared/_services/theme.service';



@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss']
})
export class EveryQuestionsComponent implements OnInit {

  tagsData!: Tags[];
  themeData!: Theme[];
  questionsArray: any[] = [];
  formTags!: FormGroup;
  formPerPeriodOfTime!: FormGroup;
  formOnQuestions!: FormGroup;
  perPeriodOfTime = 365;
  electedQuestions = 'allQuestions';
  electedTags: Tags[] = [];
  isSortQuestions = false;
  isLineDisplay = false;


  get tagsFormArray(): FormArray {
    return this.formTags.controls.tags as FormArray;
  }

  constructor(private fb: FormBuilder, private questionsService: QuestionsService, private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    this.tagsData = TagsConstants;
    this.themeData = ThemeConstants;

    this.formTags = this.fb.group({
      tags: this.fb.array([]),
    });

    this.formPerPeriodOfTime = this.fb.group({
        periodOfTime: this.fb.control('allTime'),
    });

    this.formOnQuestions = this.fb.group({
      questions: this.fb.control('allQuestions'),
    });

    this.questionsService.getQuestions().subscribe(
      (questions) => {
        console.log(questions);
        this.getQuestionsArray(questions);
        console.log(this.questionsArray);
    },
      error => error.message,
    );

    this.addCheckBoxes();

  }

  private addCheckBoxes(): void {
    this.tagsData.map(() => this.tagsFormArray.push(new FormControl(false)));
  }

  getQuestionsArray(questions: Question): void {
    if (questions === undefined || questions === null) {
      return;
    } else {
      const questionsKeys = Object.keys(questions);
      this.questionsArray = Object.values(questions).map((questionObject: object, i: number) => ({key: questionsKeys[i], ...questionObject}));
    }
  }

  onChangeTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  onDisplayQuestions(display: string): void {
      if (display === 'tiled') {
        this.isLineDisplay = false;
      } else {
        this.isLineDisplay = true;
      }
  }

  onFilterByTags(event: { source: { name: any }; checked: boolean; }): void {
    const tagName = event.source.name;
    if (event.checked) {
        this.electedTags.push(tagName);
    } else {
      this.electedTags = this.electedTags.filter(tag => tag !== tagName);
    }
  }

  onFilterOnQuestions(value: string): void {
    this.electedQuestions = value;
  }

  onFilterPerPeriodOfTime(periodOfTime: number): void {
      this.perPeriodOfTime = periodOfTime;
  }

  onOpenScreenQuestionById(id: string): void {
    this.router.navigate([`screenQuestion/${id}`]);
  }

  onRemoveQuestionById(id: string): void {
    this.questionsArray = this.questionsArray.filter((element) => element.key !== id);
    this.questionsService.removeQuestionById(id).subscribe(
        question => question,
        error => error.message,
      );
    }

    onSortQuestions(): void {
      this.isSortQuestions = !this.isSortQuestions;
    }
}
