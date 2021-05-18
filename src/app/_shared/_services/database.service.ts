import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {IQuestion} from '../_models/IQuestion';

@Injectable({providedIn: 'root'})
export class DatabaseService {

  private dbPath = '/everyQuestions';

  everyQuestionsRef: AngularFireList<IQuestion>;

  constructor(private db: AngularFireDatabase) {
    this.everyQuestionsRef = this.db.list(this.dbPath);
  }

  create(question: IQuestion): firebase.default.database.ThenableReference {
    return this.everyQuestionsRef.push(question);
  }

  remove(key: string): Promise<void> {
    return this.everyQuestionsRef.remove(key);
  }

  update(key: string, value: any): Promise<void> {
    return this.everyQuestionsRef.update(key, value);
  }
}
