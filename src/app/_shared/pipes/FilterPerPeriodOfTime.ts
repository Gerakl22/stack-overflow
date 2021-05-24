import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FilterPerPeriodOfTime',
  pure: false,
})
export class FilterPerPeriodOfTime implements PipeTransform {

  transform(questionsArray: any[], periodOfTime: number): any {

    if (periodOfTime === 365) {
      return questionsArray;
    }

    return questionsArray.filter(question => {
        return new Date(question.date).getTime() > (new Date().getTime() - (periodOfTime * 24 * 60 * 60 * 1000));
    });
  }
}

