import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../_shared/_models/Question';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {switchMap, tap} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_shared/_services/auth.service';

@Component({
  selector: 'app-screen-question',
  templateUrl: './screen-question.component.html',
  styleUrls: ['./screen-question.component.scss']
})
export class ScreenQuestionComponent implements OnInit {

  urlIdQuestion!: string;
  urlIdComment!: string;
  questionObject!: Question;
  commentQuestionForm!: FormGroup;
  commentsArray!: any[];

  get comment(): AbstractControl {
    return this.commentQuestionForm.controls.comment;
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private questionsService: QuestionsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(url => {
        this.urlIdQuestion = url.id;
      }),
      switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion)),
    ).subscribe(
      questionObject => {
        this.questionObject = questionObject;
        this.getCommentsArray(this.questionObject.comments);
        console.log(this.commentsArray);
      },
    );

    this.commentQuestionForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
  }

  getErrorComment(): string {
    if (this.comment.errors?.required) {
      return 'You must enter value';
    }

    return this.comment.errors?.minlength ? 'Min length 6 letters' : '';
  }

  onAddComment(): void {
    const commentObject = {
      author: this.authService.email,
      textarea: this.comment.value,
      date: new Date().getTime(),
    };

    console.log(this.comment.value);
    this.questionsService.createComment(this.urlIdQuestion, commentObject).pipe(
      tap((url) => {
        this.urlIdComment = url.name;
        console.log(this.urlIdComment);
      }),
      switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion))
    ).subscribe(
      (questionObject: Question) => {
        this.getCommentsArray(questionObject.comments);
        this.commentQuestionForm.reset();
      }
    );
  }

  getCommentsArray(commentsObj: object): void {
    const commentsKeys = Object.keys(commentsObj);
    this.commentsArray = Object.values(commentsObj).map((question: any, i: number) => ({key: commentsKeys[i], ...question}));
  }


  onBackEveryQuestions(): void {
    this.router.navigate(['everyQuestions']);
  }

  onEditQuestionById(): void {
    this.router.navigate([`editQuestion/${this.urlIdQuestion}`]);
  }

  onRemoveQuestionById(): void {
    this.questionsService.removeQuestionById(this.urlIdQuestion).subscribe(
      question => question,
      error => error.message,
      () => this.onBackEveryQuestions(),
    );
  }

}
