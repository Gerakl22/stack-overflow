import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionsService} from '../../_shared/_services/questions.service';
import {AuthService} from '../../_shared/_services/auth.service';
import {Question} from '../../_shared/_models/Question';
import {Comment} from '../../_shared/_models/Comment';
import {switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-screen-question',
  templateUrl: './screen-question.component.html',
  styleUrls: ['./screen-question.component.scss']
})
export class ScreenQuestionComponent implements OnInit {

  urlIdQuestion!: string;
  questionObject!: any;
  commentQuestionForm!: FormGroup;
  commentsArray: { key: string; }[] | undefined;
  author: string | null | undefined;

  get comment(): AbstractControl {
    return this.commentQuestionForm.controls.comment;
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private questionsService: QuestionsService, public authService: AuthService) {
    this.author = authService.email;
  }

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

      error => error.message,
    );

    this.commentQuestionForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required
      ])
    });
  }

  getErrorComment(): string {
    return this.comment.errors?.required ? 'You must enter value' : '';
  }

  onAddComment(): void {
    const commentObject: Comment = {
      author: this.author,
      textarea: this.comment.value,
      date: new Date().getTime(),
      isBestComment: false,
    };

    this.questionsService.createComment(this.urlIdQuestion, commentObject).pipe(
      switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion))
    ).subscribe(
      (questionObject: Question) => {
        this.getCommentsArray(questionObject.comments);
        this.questionObject = questionObject;
        this.commentQuestionForm.reset();
      }
    );
  }

  getCommentsArray(comments: object[]): { key: string }[] | undefined {
    if (comments === undefined || comments === null) {
      return;
    } else {
      const commentsKeys = Object.keys(comments);
      return this.commentsArray = Object.values(comments).map((commentObj: object, i: number) => ({key: commentsKeys[i], ...commentObj}));
    }
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

  toggleIsBestComment($event: { checked: boolean; }, commentId: string | number): void {
        this.questionObject.comments[commentId as any].isBestComment = $event.checked;
        this.questionsService.updateCommentById(this.urlIdQuestion, commentId, this.questionObject.comments[commentId as any])
          .subscribe(
          commentObj => commentObj,
          error => error.message,
        );
  }
}
