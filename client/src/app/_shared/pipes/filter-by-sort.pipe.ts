import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../_models/Question';

@Pipe({
  name: 'filterBySort',
  pure: false,
})
export class FilterBySortPipe implements PipeTransform {
  transform(questionsArray: Question[], isSortQuestions: boolean): Question[] {
    if (isSortQuestions) {
      return questionsArray?.sort((prev: Question, next: Question) => prev.date - next.date);
    } else {
      return questionsArray?.sort((prev: Question, next: Question) => next.date - prev.date);
    }
  }
}
