import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagsConstants } from '@shared/constants';
import { StatusQuestionsEnum } from '@shared/enum';
import { Question, Tags } from '@shared/models';
import { QuestionsService } from '@shared/services';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllQuestionsComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private questionsService: QuestionsService) {}

  public electedTags: Tags[] = [];
  public isLineDisplay = false;
  public isSortQuestions = false;
  public questions$: Observable<Question[]>;
  public statusQuestions: string = StatusQuestionsEnum.ALL;
  public timeQuestions: string | null = null;

  ngOnInit(): void {
    this.initElectedTags();
    this.loadQuestions();
  }

  private initElectedTags(): void {
    TagsConstants.forEach((item: Tags) => this.electedTags.push(item.value));
  }

  private loadQuestions(): void {
    this.questions$ = this.questionsService.getQuestions().pipe(
      tap(() => this.cdr.detectChanges()),
      catchError((error) => error.message)
    ) as Observable<Question[]>;
  }

  public onDisplayQuestions(isLineDisplay: boolean): boolean {
    return (this.isLineDisplay = isLineDisplay);
  }

  public onFilterByStatusQuestions(status: string): string {
    return (this.statusQuestions = status);
  }

  public onFilterByTagsQuestions(tags: Tags[]): Tags[] {
    return (this.electedTags = tags);
  }

  public onFilterByTimeQuestions(time: string | null): string | null {
    return (this.timeQuestions = time);
  }

  public onRemoveQuestionById(id: string): void {
    if (id) {
      this.questions$ = this.questionsService.removeQuestionById(id).pipe(
        tap(() => this.cdr.detectChanges()),
        catchError((error) => error.message)
      ) as Observable<Question[]>;
    }
  }

  public onSortQuestions(isSort: boolean): boolean {
    return (this.isSortQuestions = isSort);
  }
}
