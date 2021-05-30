import { Pipe, PipeTransform } from '@angular/core';
import {Question} from '../_models/Question';

@Pipe({
  name: 'filterOnQuestions',
  pure: false,
})
export class FilterOnQuestionsPipe implements PipeTransform {

  transform(questionArray: Question[], electedQuestions: string): Question[] {
    if (electedQuestions === 'allQuestions') {
      return questionArray;
    }

    return questionArray.filter(question => {
      if (electedQuestions === 'responded') {
        return question.comments !== undefined;
      }
      if (electedQuestions === 'noReply') {
        return question.comments === undefined;
      }
      if (electedQuestions === 'resolve' && question.comments !== undefined) {
        return Object.values(question.comments).find(q => q.isBestComment === true ? questionArray : undefined);
      }
      else {
        return;
      }
    });
  }

}
