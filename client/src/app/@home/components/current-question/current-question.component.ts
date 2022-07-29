import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionsService } from '../../../@shared/services/questions.service';
import { AuthService } from '../../../@shared/services/auth.service';
import { Question } from '../../../@shared/models/Question';
import { Comment } from '../../../@shared/models/Comment';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { LocalStorageConstants } from '../../../@shared/constants/LocalStorageConstants';
import { User } from '../../../@shared/models/User';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-screen-question',
  templateUrl: './current-question.component.html',
  styleUrls: ['./current-question.component.scss'],
})
export class CurrentQuestionComponent implements OnInit, OnDestroy {
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
  ) {
  }

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
      comment: new FormControl('', [Validators.required])
    });
  }

  public getErrorComment(): string {
    return this.comment.errors?.required ? 'You must enter value' : '';
  }

  public onAddComment(): void {
    const comment: Comment = {
      author: this.authUser.email,
      textarea: this.comment.value,
      date: new Date().getTime(),
      isBestComment: false
    };

    this.questionsService
      .createComment(this.urlIdQuestion, comment)
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
