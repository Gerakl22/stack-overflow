import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Question } from '../_models/Question';
import { Comment } from '../_models/Comment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private url = environment.apiUrl;
  private urlQuestions = 'questions';
  private urlComments = 'comments';

  constructor(private http: HttpClient) {}

  private static httpError(error: { error: { message: string }; status: any; message: any }): Observable<never> {
    let message = '';
    error.error instanceof ErrorEvent
      ? (message = error.error.message)
      : (message = `Error Code: ${error.status}\nMessage: ${error.message}`);

    console.log(message);
    return throwError(message);
  }

  approveQuestionById(id: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}${this.urlQuestions}/approve/${id}`).pipe(catchError(QuestionsService.httpError));
  }

  createComment(id: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}${this.urlComments}/create/${id}`, comment).pipe(catchError(QuestionsService.httpError));
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.url}${this.urlQuestions}/all`, question).pipe(catchError(QuestionsService.httpError));
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}${this.urlQuestions}/all`).pipe(catchError(QuestionsService.httpError));
  }

  getQuestionsById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}/open/${id}`).pipe(catchError(QuestionsService.httpError));
  }

  removeQuestionById(id: string): Observable<Question[]> {
    return this.http.delete<Question[]>(`${this.url}${this.urlQuestions}/remove/${id}`).pipe(catchError(QuestionsService.httpError));
  }

  updateCommentById(questionsId: string, commentId: string | number, comment: Comment): Observable<Comment> {
    return this.http
      .put<Comment>(`${this.url}${this.urlQuestions}/${questionsId}/${this.urlComments}/${commentId}.json`, comment)
      .pipe(catchError(QuestionsService.httpError));
  }
}
