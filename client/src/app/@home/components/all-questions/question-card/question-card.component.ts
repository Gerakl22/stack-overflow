import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageConstants, RoutesConstants } from '@shared/constants';
import { Question, User } from '@shared/models';
import { QuestionsService } from '@shared/services';
import { Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-question-card',
  templateUrl: 'question-card.component.html',
  styleUrls: ['question-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCardComponent implements OnDestroy {
  @Input() question: Question;
  @Output() removeQuestionById: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef, private questionsService: QuestionsService, private router: Router) {
    this.authUser = JSON.parse(localStorage.getItem(LocalStorageConstants.AUTH_USER) || 'null');
  }

  private destroy$: Subject<void> = new Subject<void>();
  public authUser!: User;

  public onOpenCurrentQuestionById(id: string): void {
    this.router.navigateByUrl(`${RoutesConstants.QUESTIONS.CURRENT}${id}`);
  }

  public onApproveQuestionById(id: string): void {
    this.questionsService
      .approveQuestionById(id)
      .pipe(
        tap((questions: Question[]) => {
          questions.map((question: Question) => {
            if (question.id === id) {
              this.question = question;
            }
          });

          this.cdr.detectChanges();
        }),
        catchError((error) => error.message),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public onRemoveQuestionById(id: string): void {
    this.removeQuestionById.emit(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
