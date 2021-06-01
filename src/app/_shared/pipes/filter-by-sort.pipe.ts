import { Pipe, PipeTransform } from '@angular/core';
import {Question} from '../_models/Question';

@Pipe({
  name: 'filterBySort',
  pure: false
})
export class FilterBySortPipe implements PipeTransform {

  transform(questionsArray: Question[], isSortQuestions: boolean): Question[] {
    if (isSortQuestions) {
      return questionsArray?.sort((prev, next) => {
        return new Date(prev.date).getTime() - new Date(next.date).getTime();
      });
    } else {
      return questionsArray?.sort((prev, next) => {
        return new Date(next.date).getTime() - new Date(prev.date).getTime();
      });
    }

  }

}
