import { Pipe, PipeTransform } from '@angular/core';
import { Comment, Question } from '@shared/models';
import { StatusQuestionsEnum } from '@shared/enum';

@Pipe({
  name: 'filterByStatusQuestions',
  pure: false,
})
export class FilterByStatusQuestionsPipe implements PipeTransform {
  transform(questionArray: Question[], statusQuestions: string): Question[] {
    if (statusQuestions === StatusQuestionsEnum.ALL) {
      return questionArray;
    }

    return questionArray.filter((question: Question) => {
      if (statusQuestions === StatusQuestionsEnum.ANSWERED) {
        return question.comments !== null;
      }
      if (statusQuestions === StatusQuestionsEnum.UNANSWERED) {
        return question.comments === null;
      }

      if (
        statusQuestions.replace(' ', '').toUpperCase().trim() === StatusQuestionsEnum.BEST_COMMENT.trim().toUpperCase() &&
        question.comments !== null
      ) {
        return question.comments.find((comment: Comment) => comment.isBestComment);
      }

      return false;
    });
  }
}
