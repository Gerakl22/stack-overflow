import { Pipe, PipeTransform } from '@angular/core';
import { Question, Tags } from '../models';

@Pipe({
  name: 'filterByTags',
  pure: false,
})
export class FilterByTagsPipe implements PipeTransform {
  transform(questionArray: Question[], electedTags: Tags[]): Question[] {
    if (electedTags.length === questionArray.length) {
      return questionArray;
    }

    return questionArray.filter((question: Question) => question.tags.find((tag: Tags) => electedTags.includes(tag)));
  }
}
