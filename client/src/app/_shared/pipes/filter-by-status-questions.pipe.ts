import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../_models/Question';
import { Comment } from '../_models/Comment';

@Pipe({
  name: 'filterByStatusQuestions',
  pure: false,
})
export class FilterByStatusQuestionsPipe implements PipeTransform {
  transform(questionArray: Question[], statusQuestions: string): Question[] {
    if (statusQuestions === 'All') {
      return questionArray;
    }

    return questionArray.filter((question: Question) => {
      if (statusQuestions === 'Answered') {
        return question.comments !== undefined;
      }
      if (statusQuestions === 'Unanswered') {
        return question.comments === undefined;
      }
      if (statusQuestions === 'Resolve' && question.comments !== undefined) {
        return Object.values(question.comments).find((comment: Comment) => comment.isBestComment);
      }

      return false;
    });
  }
}
