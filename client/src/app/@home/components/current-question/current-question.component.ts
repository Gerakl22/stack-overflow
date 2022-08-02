import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ErrorConstants, LocalStorageConstants, RoutesConstants } from '@shared/constants';
import { Comment, Question, User } from '@shared/models';
import { AuthService, QuestionsService } from '@shared/services';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.component.html',
  styleUrls: ['./current-question.component.scss'],
})
export class CurrentQuestionComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private questionsService: QuestionsService
  ) {}

  get comment(): AbstractControl {
    return this.commentQuestionForm.controls.comment;
  }

  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 0;
  private urlIdQuestion!: string;
  public authUser!: User;
  public commentsArray: Comment[] = [];
  public commentQuestionForm!: FormGroup;
  public question$: Observable<Question>;

  private getQuestionById(): void {
    this.activatedRoute.params
      .pipe(
        tap((url: Params) => {
          this.urlIdQuestion = url.id;
        }),
        switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (question: Question) => {
          if (question.comments) {
            this.commentsArray = question.comments;
          }

          this.question$ = of(question);
          this.authUser = JSON.parse(localStorage.getItem(LocalStorageConstants.AUTH_USER) || 'null');
        },
        (error) => error.message
      );
  }

  private initCommentForm(): void {
    this.commentQuestionForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getQuestionById();
    this.initCommentForm();
  }

  public getErrorComment(): string {
    return this.comment.errors?.required ? ErrorConstants.COMMENT.MUST_VALUE : ErrorConstants.EMPTY_STRING;
  }

  public onAddComment(): void {
    const comment: Comment = {
      author: this.authUser.email,
      textarea: this.comment.value,
      date: new Date().getTime(),
      isBestComment: false,
    };

    this.questionsService
      .createComment(this.urlIdQuestion, comment)
      .pipe(switchMap(() => this.questionsService.getQuestionsById(this.urlIdQuestion)))
      .subscribe((question: Question) => {
        if (question.comments) {
          this.commentsArray = question.comments;
        }

        this.question$ = of(question);
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
        (question: Question) => (this.question$ = of(question)),
        (error) => error.message
      );
  }

  public onBackAllQuestions(): void {
    this.router.navigateByUrl(RoutesConstants.QUESTIONS.ALL);
  }

  public onEditQuestionById(): void {
    this.router.navigateByUrl(`${RoutesConstants.QUESTIONS.EDIT}${this.urlIdQuestion}`);
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

  public selectIsBestComment($event: { checked: boolean }, commentId: string): void {
    const currentComment = this.commentsArray.find((comment: Comment) => comment.id === commentId);

    if (currentComment) {
      let comment: Comment = {
        ...currentComment,
        isBestComment: $event.checked,
      };

      this.questionsService
        .updateCommentById(commentId, comment)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (currentComment: Comment) => {
            const findIndex = this.commentsArray.findIndex((comment: Comment) => comment.id === currentComment.id);
            this.commentsArray[findIndex] = currentComment;
          },
          (error) => error.message
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
