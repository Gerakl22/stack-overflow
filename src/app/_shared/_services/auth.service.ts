import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/User';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';


@Injectable()
export class AuthService {

  private url = environment.apiUrl;
  private urlAdmins = '/admins';
  public user$: Observable<User | null>;
  public user!: User | null;


  constructor(public fireAuth: AngularFireAuth, private http: HttpClient) {
    this.user$ = this.fireAuth.authState.pipe(
      map( userFromFirebase => {
        this.user = userFromFirebase ? new User({email: userFromFirebase.email, isAdmin: false}) : null;
        return this.user;
      }),
      switchMap(() => this.getAdmins()),
      map((admins) => {
        if (this.user) {
          this.checkUserIsAdmin(admins);
        }
        return this.user;
      })
    );
  }

  checkUserIsLogged(): Observable<User | null> {
    if (this.user) {
      return of(this.user);
    } else {
      return this.user$;
    }
  }

  checkUserIsAdmin(admins: User[]): void {
    admins.find(admin => {
      if (admin.email === this.user?.email) {
        this.user.isAdmin = true;
      }
    });
  }

  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}${this.urlAdmins}.json`);
  }

  private onAuthLogin(provider: any): Promise<any> {
    return this.fireAuth.signInWithPopup(provider);
  }

  facebookLogin(): Promise<any> {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    return this.onAuthLogin(provider);
  }

  gitHubLogin(): Promise<any> {
    const provider = new firebase.default.auth.GithubAuthProvider();
    return this.onAuthLogin(provider);
  }

  googleLogin(): Promise<any> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return this.onAuthLogin(provider);
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.fireAuth.signOut();
  }

  signUp(email: string, password: string): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

}
