import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Tags } from '@shared/models';

@Component({
  selector: 'app-questions-toolbar',
  templateUrl: 'questions-toolbar.component.html',
  styleUrls: ['questions-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsToolbarComponent {
  @Input() electedTags: Tags[];
  @Input() isLineDisplay: boolean;
  @Input() isSortQuestions: boolean;
  @Input() statusQuestions: string;
  @Input() timeQuestions: string | null;

  @Output() filterByDisplay: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filterByStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterByTags: EventEmitter<Tags[]> = new EventEmitter<Tags[]>();
  @Output() filterByTime: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() sortByQuestions: EventEmitter<boolean> = new EventEmitter<boolean>();

  public filterDisplay(isLineDisplay: boolean): void {
    this.filterByDisplay.emit(isLineDisplay);
  }

  public filterStatus(status: string): void {
    this.filterByStatus.emit(status);
  }

  public filterTags(tags: Tags[]): void {
    this.filterByTags.emit(tags);
  }

  public filterTime(time: string | null): void {
    this.filterByTime.emit(time);
  }

  public sortQuestions(isSort: boolean): void {
    this.sortByQuestions.emit(isSort);
  }
}
