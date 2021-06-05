import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../_models/Question';

@Pipe({
  name: 'filterPerPeriodOfTime',
  pure: false,
})
export class FilterPerPeriodOfTimePipe implements PipeTransform {
  transform(questionsArray: Question[], periodOfTime: number): Question[] {
    if (periodOfTime === 365) {
      return questionsArray;
    }

    return questionsArray.filter((question: Question) => {
      return question.date > new Date().getTime() - periodOfTime * 24 * 60 * 60 * 1000;
    });
  }
}
