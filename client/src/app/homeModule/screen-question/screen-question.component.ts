import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { AuthService } from '../../_shared/_services/auth.service';
import { Question } from '../../_shared/_models/Question';
import { Comment } from '../../_shared/_models/Comment';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { LocalStorageConstants } from '../../_shared/constants/LocalStorageConstants';
import { User } from '../../_shared/_models/User';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-screen-question',
  templateUrl: './screen-question.component.html',
  styleUrls: ['./screen-question.component.scss'],
})
export class ScreenQuestionComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 0;
  urlIdQuestion!: string;
  questionObject!: Question;
  commentQuestionForm!: FormGroup;
  commentsArray!: Comment[];
  authUser!: User;

  get comment(): AbstractControl {
    return this.commentQuestionForm.controls.comment;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((url: Params) => {
          this.urlIdQuestion = url.id;
        }),
        switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (questionObject: Question) => {
          console.log(questionObject);
          this.questionObject = questionObject;
          this.authUser = JSON.parse(localStorage.getItem(LocalStorageConstants.AUTH_USER) || 'null');

          if (questionObject.comments) {
            this.commentsArray = questionObject.comments;
          }
        },
        (error) => error.message
      );

    this.commentQuestionForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  public getErrorComment(): string {
    return this.comment.errors?.required ? 'You must enter value' : '';
  }

  public onAddComment(): void {
    const commentObject: Comment = {
      author: this.authUser.email,
      textarea: this.comment.value,
      date: new Date().getTime(),
      isBestComment: false,
    };

    this.questionsService
      .createComment(this.urlIdQuestion, commentObject)
      .pipe(switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion)))
      .subscribe((questionObject: Question) => {
        if (questionObject.comments) {
          this.commentsArray = questionObject.comments;
        }

        this.questionObject = questionObject;
        this.commentQuestionForm.reset();
      });
  }

  public onApproveQuestions(id: string): void {
    this.questionsService
      .approveQuestionById(id)
      .pipe(
        switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (question: Question) => (this.questionObject = question),
        (error) => error.message
      );
  }

  public onBackAllQuestions(): void {
    this.router.navigateByUrl('questions/all');
  }

  public onEditQuestionById(): void {
    this.router.navigateByUrl(`questions/edit/${this.urlIdQuestion}`);
  }

  public onRemoveQuestionById(): void {
    this.questionsService
      .removeQuestionById(this.urlIdQuestion)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          setTimeout(() => this.onBackAllQuestions(), this.redirectDelay);
        },
        (error) => error.message
      );
  }

  public toggleIsBestComment($event: { checked: boolean }, commentId: string | number): void {
    if (this.questionObject.comments) {
      this.questionObject.comments[commentId as any].isBestComment = $event.checked;
      this.questionsService.updateCommentById(this.urlIdQuestion, commentId, this.questionObject.comments[commentId as any]).subscribe(
        (commentObj: Comment) => commentObj,
        (error) => error.message
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
