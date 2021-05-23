import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Question} from '../_models/Question';
import {Comment} from '../_models/Comment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class QuestionsService {

  private url = environment.apiUrl;
  private urlQuestions = 'everyQuestions';
  private urlComments = 'comments';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}.json`).pipe(
      map(questions => {
        if (questions === undefined || questions === null) {
          return;
        } else {
          const questionsKeys = Object.keys(questions);
          return Object.values(questions).map((questionObject: Question[], i: number) => ({key: questionsKeys[i], ...questionObject}));
        }
      })
    );
  }

  getQuestionsById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}/${id}.json`);
  }

  createComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}${this.urlQuestions}/${id}/${this.urlComments}.json`, comment);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.url}${this.urlQuestions}.json`, question);
  }

  updateCommentByIdAndComment(questionsId: string, commentId: string, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.url}${this.urlQuestions}/${questionsId}/${this.urlComments}/${commentId}.json`, comment);
  }

  updateQuestionByIdAndQuestion(id: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.url}${this.urlQuestions}/${id}.json`, question);
  }

  removeQuestionById(id: string): Observable<Question> {
    return this.http.delete<Question>(`${this.url}${this.urlQuestions}/${id}.json`);
  }

}
