import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: 'sort.component.html',
  styleUrls: ['sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  @Input() isSort: boolean;
  @Output() sortAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  public sort(): void {
    this.isSort = !this.isSort;

    this.sortAction.emit(this.isSort);
  }
}
