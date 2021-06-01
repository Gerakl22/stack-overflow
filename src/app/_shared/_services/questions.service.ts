import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Question} from '../_models/Question';
import {Comment} from '../_models/Comment';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class QuestionsService {

  private url = environment.apiUrl;
  private urlQuestions = 'everyQuestions';
  private urlComments = 'comments';

  constructor(private http: HttpClient) {}

  private httpError(error: { error: { message: string; }; status: any; message: any; }): Observable<never> {
    let message = '';
    error.error instanceof ErrorEvent ? message = error.error.message : message = `Error Code: ${error.status}\nMessage: ${error.message}`;

    console.log(message);
    return throwError(message);
  }

  getQuestions(): Observable<Question> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}.json`).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  getQuestionsById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}/${id}.json`).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  createComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}${this.urlQuestions}/${id}/${this.urlComments}.json`, comment).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.url}${this.urlQuestions}.json`, question).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updateCommentById(questionsId: string, commentId: string | number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.url}${this.urlQuestions}/${questionsId}/${this.urlComments}/${commentId}.json`, comment).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  updateQuestionById(id: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.url}${this.urlQuestions}/${id}.json`, question).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  removeQuestionById(id: string): Observable<Question> {
    return this.http.delete<Question>(`${this.url}${this.urlQuestions}/${id}.json`).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

}
