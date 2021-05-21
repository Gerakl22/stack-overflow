import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Question} from '../_models/Question';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class QuestionsService {

  private url = environment.apiUrl;
  private urlQuestions = 'everyQuestions.json';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}`).pipe(
      map(questions => {
        const questionsKeys = Object.keys(questions);
        return Object.values(questions).map((questionObject: Question[], i: number) => ({key: questionsKeys[i], ...questionObject}));
      })
    );
  }

  getQuestionsById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.url}everyQuestions/${id}.json`);
  }

  createComment(id: string, comment: object): Observable<any> {
    return this.http.post<any>(`${this.url}everyQuestions/${id}/comments.json`, comment);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.url}${this.urlQuestions}`, question);
  }

  updateQuestionByIdAndQuestion(id: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.url}everyQuestions/${id}.json`, question);
  }

  removeQuestionById(id: string): Observable<Question> {
    return this.http.delete<Question>(`${this.url}everyQuestions/${id}.json`);
  }

}
