import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-filter-button',
  templateUrl: 'filter-button.component.html',
  styleUrls: ['filter-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterButtonComponent {
  @Input() icon: string;
  @Input() name: string;
  @Input() trigger: string | MatMenuPanel;

  @Output() selectTrigger: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public select(): void {
    this.selectTrigger.emit(this.name.toLowerCase());
  }
}
