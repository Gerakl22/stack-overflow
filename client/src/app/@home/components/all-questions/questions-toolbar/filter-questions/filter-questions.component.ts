import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TriggerEnum } from '@shared/enum';
import { Tags } from '@shared/models';

@Component({
  selector: 'app-filter-questions',
  templateUrl: 'filter-questions.component.html',
  styleUrls: ['filter-questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterQuestionsComponent {
  @Input() electedTags: Tags[];
  @Input() icon: string;
  @Input() isLineDisplay: boolean;
  @Input() name: string;
  @Input() statusQuestions: string;
  @Input() timeQuestions: string | null;
  @Input() trigger: string;

  @Output() filterByDisplay: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filterByStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterByTags: EventEmitter<Tags[]> = new EventEmitter<Tags[]>();
  @Output() filterByTime: EventEmitter<string | null> = new EventEmitter<string | null>();

  public get triggerEnum(): typeof TriggerEnum {
    return TriggerEnum;
  }

  public currentTrigger: string;

  constructor() {}

  public getTrigger(trigger: string): void {
    this.currentTrigger = trigger;
  }

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
}
