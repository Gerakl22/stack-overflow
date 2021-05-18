import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {IQuestion} from '../_models/IQuestion';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';


@Injectable({providedIn: 'root'})
export class DatabaseService {

  private dbPath = 'everyQuestions';

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
  }

  create(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`https://stackoverflow-bba0e-default-rtdb.firebaseio.com/${this.dbPath}.json`, question);
  }

  // remove(key: string): Promise<void> {
  //   return this.everyQuestionsRef$.remove(key);
  // }
  //
  // update(key: string, value: any): Promise<void> {
  //   return this.everyQuestionsRef$.update(key, value);
  // }
}
