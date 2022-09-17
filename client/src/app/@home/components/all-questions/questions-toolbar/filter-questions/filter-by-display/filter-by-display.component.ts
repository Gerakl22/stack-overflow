import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionsDisplayConstants } from '@shared/constants';
import { DisplayQuestionsEnum } from '@shared/enum';
import { QuestionsDisplay } from '@shared/models';

@Component({
  selector: 'app-filter-by-display',
  templateUrl: 'filter-by-display.component.html',
  styleUrls: ['filter-by-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByDisplayComponent implements OnInit {
  @Input() isLineDisplay: boolean;
  @Output() filterByDisplay: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  public questionsDisplayData: QuestionsDisplay[] = [];

  ngOnInit(): void {
    this.questionsDisplayData = QuestionsDisplayConstants;
  }

  displayName(name: string): void {
    this.isLineDisplay = name === DisplayQuestionsEnum.LINE;

    this.filterByDisplay.emit(this.isLineDisplay);
  }
}
