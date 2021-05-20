import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../_shared/_models/Question';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-screen-question',
  templateUrl: './screen-question.component.html',
  styleUrls: ['./screen-question.component.scss']
})
export class ScreenQuestionComponent implements OnInit {

  urlId!: string;
  questionObject!: Question;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(url => {
        this.urlId = url.id;
      }),
      switchMap(() => this.questionsService.getQuestionsById(this.urlId)),
    ).subscribe(
      questionObject => {
        this.questionObject = questionObject;
        console.log(this.questionObject);
      },
    );
  }

  onBackEveryQuestions(): void {
    this.router.navigate(['everyQuestions']);
  }

  onEditQuestionById(): void {
    this.router.navigate([`editQuestion/${this.urlId}`]);
  }

  onRemoveQuestionById(): void {
    this.questionsService.removeQuestionById(this.urlId).subscribe(
      question => question,
      error => error.message,
      () => this.router.navigate(['everyQuestions']),
    );
  }

}
