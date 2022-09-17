import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TagsConstants } from '@shared/constants';
import { FilterHelper } from '../../../../../../@shared/helpers';
import { Tags } from '@shared/models';

@Component({
  selector: 'app-filter-by-tag',
  templateUrl: 'filter-by-tag.component.html',
  styleUrls: ['filter-by-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByTagComponent implements OnInit {
  @Input() electedTags: Tags[];
  @Output() filterByTags: EventEmitter<Tags[]> = new EventEmitter<Tags[]>();

  constructor(private fb: FormBuilder) {}

  get tagsFormArray(): FormArray {
    return this.formTags.controls.tags as FormArray;
  }

  public formTags: FormGroup;
  public formArrayNameTags = 'tags';
  public tagsData: Tags[] = [];

  ngOnInit(): void {
    this.tagsData = TagsConstants;

    this.formTags = this.fb.group({
      [this.formArrayNameTags]: this.fb.array([]),
    });

    this.tagsData.forEach(() => this.tagsFormArray.push(new FormControl(true)));
  }

  public filter(event: { source: { name: any }; checked: boolean }): void {
    const tagName = event.source.name;

    if (event.checked) {
      this.electedTags.push(tagName);
    } else {
      if (this.electedTags.length > 1) {
        this.electedTags = this.electedTags.filter((tag: Tags) => tag !== tagName);
      } else {
        FilterHelper.updateCheckBoxesForFormArray(this.tagsData, this.tagsFormArray, tagName);
      }
    }

    this.filterByTags.emit(this.electedTags);
  }
}
