import { Pipe, PipeTransform } from '@angular/core';
import {Question} from '../_models/Question';
import {Tags} from '../_models/Tags';

@Pipe({
  name: 'filterByTags',
  pure: false,
})
export class FilterByTagsPipe implements PipeTransform {

  transform(questionArray: Question[], electedTags: Tags[]): Question[] {

    if (!electedTags.length) {
      return questionArray;
    }

    return questionArray.filter((question: Question) => question.tags.find((tag: Tags) => electedTags.includes(tag)));
  }

}
