import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import Database = firebase.database.Database;
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/_services/auth.service';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { ThemeService } from '../../_shared/_services/theme.service';
import { Tags } from '../../_shared/_models/Tags';
import { Question } from '../../_shared/_models/Question';
import { QuestionsStatus } from '../../_shared/_models/QuestionsStatus';
import { QuestionsTime } from '../../_shared/_models/QuestionsTime';
import { Theme } from '../../_shared/_models/Theme';
import { TagsConstants } from '../../_shared/constants/TagsConstants';
import { ThemeConstants } from '../../_shared/constants/ThemeConstants';
import { QuestionsStatusConstants } from '../../_shared/constants/QuestionsStatusConstants';
import { QuestionsTimeConstants } from '../../_shared/constants/QuestionsTimeConstants';

@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss'],
})
export class EveryQuestionsComponent implements OnInit {
  tagsData!: Tags[];
  themeData!: Theme[];
  questionsStatusData!: QuestionsStatus[];
  questionsTimeData!: QuestionsTime[];
  questionsArray: Question[] = [];
  electedTags: Tags[] = [];
  questionObject!: Question;
  filterQuestionsForm!: FormGroup;
  timeQuestions = 365;
  statusQuestions = 'All';
  author: string | null | undefined;
  isSortQuestions = false;
  isLineDisplay = false;
  isAdmin: boolean | undefined;

  get tagsFormArray(): FormArray {
    return this.filterQuestionsForm.controls.tags as FormArray;
  }

  get timeFormArray(): FormArray {
    return this.filterQuestionsForm.controls.time as FormArray;
  }

  get statusFormArray(): FormArray {
    return this.filterQuestionsForm.controls.status as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tagsData = TagsConstants;
    this.themeData = ThemeConstants;
    this.questionsStatusData = QuestionsStatusConstants;
    this.questionsTimeData = QuestionsTimeConstants;

    this.filterQuestionsForm = this.fb.group({
      status: this.fb.array([]),
      tags: this.fb.array([]),
      time: this.fb.array([]),
    });

    console.log(this.filterQuestionsForm);

    this.questionsService.getQuestions().subscribe(
      (questions: Database) => {
        this.getQuestionsArray(questions);
        this.author = this.authService.user?.email;
        this.isAdmin = this.authService.user?.isAdmin;
        console.log(this.questionsArray);
      },
      (error) => error.message
    );

    this.addCheckBoxes();
  }

  private addCheckBoxes(): void {
    this.tagsData.forEach(() => this.tagsFormArray.push(new FormControl(false)));
    this.questionsStatusData.filter((status: QuestionsStatus) =>
      status.item === this.statusQuestions
        ? this.statusFormArray.push(new FormControl(true))
        : this.statusFormArray.push(new FormControl(false))
    );
    this.questionsTimeData.filter((time: QuestionsTime) =>
      Number(time.value) === this.timeQuestions
        ? this.timeFormArray.push(new FormControl(true))
        : this.timeFormArray.push(new FormControl(false))
    );
  }

  getQuestionsArray(questions: firebase.database.Database | null | undefined): void {
    if (questions === undefined || questions === null) {
      return;
    } else {
      this.questionsArray = Object.keys(questions).map((key: string) => ({
        ...questions[key],
        key,
      }));
    }
  }

  onApproveQuestion(id: string): void {
    this.questionsArray.find((question: Question) => {
      if (question.key === id) {
        question.isApproval = true;
        this.questionObject = question;
      }
    });

    this.questionsService.updateQuestionById(id, this.questionObject).subscribe(
      (question: Question) => (this.questionObject = question),
      (error) => error.message
    );
  }

  onChangeTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  onDisplayQuestions(display: string): void {
    this.isLineDisplay = display === 'line';
  }

  onFilterByTags(event: { source: { name: any }; checked: boolean }): void {
    const tagName = event.source.name;
    if (event.checked) {
      this.electedTags.push(tagName);
    } else {
      this.electedTags = this.electedTags.filter((tag: Tags) => tag !== tagName);
    }
  }

  onFilterByStatusQuestions(event: { source: { name: any; id: string }; checked: boolean }): void {
    const statusName = event.source.name;
    const id = event.source.id;

    if (event.checked) {
      this.statusQuestions = statusName;
      this.statusFormArray.controls.filter((status: any, i: number) => (Number(id) === i ? (status.value = true) : (status.value = false)));
    } else {
      this.statusQuestions = 'All';
      this.questionsStatusData.find((statusQuestions: QuestionsStatus) => {
        if (this.statusQuestions === statusQuestions.item) {
          this.statusFormArray.controls.filter((status: any, i: number) =>
            Number(statusQuestions.id) === i ? (status.value = true) : (status.value = false)
          );
        }
      });
    }
  }

  onFilterPerPeriodOfTime(event: { source: { name: any; id: string }; checked: boolean }): void {
    const timeName = event.source.name;
    const id = event.source.id;

    if (event.checked) {
      this.timeQuestions = timeName;
      this.timeFormArray.controls.filter((status: any, i: number) =>
        Number(id) - 10 === i ? (status.value = true) : (status.value = false)
      );
    } else {
      this.timeQuestions = 365;
      this.questionsTimeData.find((timeQuestions: QuestionsTime) => {
        if (this.timeQuestions === Number(timeQuestions.value)) {
          this.timeFormArray.controls.filter((time: any, i: number) =>
            Number(timeQuestions.id) - 10 === i ? (time.value = true) : (time.value = false)
          );
        }
      });
    }
  }

  onOpenScreenQuestionById(id: string): void {
    this.router.navigate([`screenQuestion/${id}`]);
  }

  onRemoveQuestionById(id: string): void {
    this.questionsArray = this.questionsArray.filter((element: Question) => element.key !== id);
    this.questionsService.removeQuestionById(id).subscribe(
      (question: Question) => question,
      (error) => error.message
    );
  }

  onSortQuestions(): void {
    this.isSortQuestions = !this.isSortQuestions;
  }
}
