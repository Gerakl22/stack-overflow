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
import {AuthService} from '../../_shared/_services/auth.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss']
})
export class EveryQuestionsComponent implements OnInit {

  tagsData!: Tags[];
  themeData!: Theme[];
  questionsArray: Question[] = [];
  electedTags: Tags[] = [];
  questionObject!: Question;
  formTags!: FormGroup;
  formPerPeriodOfTime!: FormGroup;
  formOnQuestions!: FormGroup;
  perPeriodOfTime = 365;
  electedQuestions = 'allQuestions';
  author: string | null | undefined;
  isSortQuestions = false;
  isLineDisplay = false;
  isAdmin: boolean | undefined;


  get tagsFormArray(): FormArray {
    return this.formTags.controls.tags as FormArray;
  }

  constructor(private fb: FormBuilder, private questionsService: QuestionsService, private router: Router, private themeService: ThemeService, private authService: AuthService) {}

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

    this.authService.checkUserIsLogged().pipe(
      switchMap(() => this.questionsService.getQuestions())
    )
    .subscribe(
      (questions) => {
        this.getQuestionsArray(questions);
        this.author = this.authService.user?.email;
        this.isAdmin = this.authService.user?.isAdmin;
        console.log(this.questionsArray);
      },
      error => error.message,
    );

    this.addCheckBoxes();

  }

  private addCheckBoxes(): void {
    this.tagsData.forEach(() => this.tagsFormArray.push(new FormControl(false)));
  }

  getQuestionsArray(questions: any): void {
    if (questions === undefined || questions === null) {
      return;
    } else {
      this.questionsArray = Object.keys(questions).map((key) => ({...questions[key], key}));
    }
  }

  onApproveQuestion(id: string): void {
    this.questionsArray.find(question => {
      if (question.key === id) {
        question.isApproval = true;
        this.questionObject = question;
      }
    });

    this.questionsService.updateQuestionById(id, this.questionObject).subscribe(
      question => this.questionObject = question,
      error => error.message,
    );
  }

  onChangeTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  onDisplayQuestions(display: string): void {
    this.isLineDisplay = display === 'line';
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
