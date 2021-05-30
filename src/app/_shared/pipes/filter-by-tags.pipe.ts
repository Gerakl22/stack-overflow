import { Pipe, PipeTransform } from '@angular/core';
import {Question} from '../_models/Question';
import {Tags} from '../_models/Tags';

@Pipe({
  name: 'filterByTags',
  pure: false,
})
export class FilterByTagsPipe implements PipeTransform {

  transform(questionArray: Question[], electedTags: Tags[]): Question[] {

    if (electedTags.length === 0) {
      return questionArray;
    }

    return questionArray.filter((question) => {
      return  question.tags.find((tag  ) => electedTags.includes(tag) ? questionArray : undefined);
    });
  }

}
