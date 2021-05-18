import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IQuestion} from '../_models/IQuestion';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class DatabaseService {

  private headers = new HttpHeaders({'Content-type': 'application/json'});
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${this.url}`, {headers: this.headers});
  }

  post(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${this.url}`, question);
  }

  put(question: IQuestion): Observable<IQuestion> {
    return this.http.put<IQuestion>(`${this.url}`, question, {headers: this.headers});
  }

  remove(): Observable<IQuestion> {
    return this.http.delete<IQuestion>(`${this.url}`);
  }

}
