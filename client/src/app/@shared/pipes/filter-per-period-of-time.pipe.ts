import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../models';

@Pipe({
  name: 'filterPerPeriodOfTime',
  pure: false,
})
export class FilterPerPeriodOfTimePipe implements PipeTransform {
  transform(questionsArray: Question[], periodOfTime: string | null): Question[] {
    if (periodOfTime === null) {
      return questionsArray;
    }

    return questionsArray.filter((question: Question) => {
      return question.date > new Date().getTime() - Number(periodOfTime) * 24 * 60 * 60 * 1000;
    });
  }
}
