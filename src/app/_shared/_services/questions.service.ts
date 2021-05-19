import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../_models/Question';
import {Observable} from 'rxjs';



@Injectable({providedIn: 'root'})
export class QuestionsService {

  private headers = new HttpHeaders({'Content-type': 'application/json'});
  private url = environment.apiUrl;
  private urlQuestions = 'everyQuestions.json';

  constructor(private http: HttpClient) {}

  get(): Observable<Question> {
    return this.http.get<Question>(`${this.url}${this.urlQuestions}`, {headers: this.headers});
  }

  post(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.url}${this.urlQuestions}`, question);
  }

  put(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.url}${this.urlQuestions}`, question, {headers: this.headers});
  }

  remove(): Observable<Question> {
    return this.http.delete<Question>(`${this.url}${this.urlQuestions}`);
  }

}
