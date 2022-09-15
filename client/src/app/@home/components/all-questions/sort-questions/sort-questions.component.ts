import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-questions',
  templateUrl: 'sort-questions.component.html',
  styleUrls: ['sort-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortQuestionsComponent {
  @Input() isSort: boolean;
  @Output() sortItems: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  public sort(): void {
    this.isSort = !this.isSort;

    this.sortItems.emit(this.isSort);
  }
}
