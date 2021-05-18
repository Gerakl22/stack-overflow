import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthService {

  public user$: Observable<firebase.default.User | null>;
  public email: string | null | undefined;

  constructor(public fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.authState.pipe(
      map( user => {
        this.email = user?.email;
        return user;
      })
    );
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
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

  signUp(email: string, password: string): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
   return this.fireAuth.signOut();
  }

  private onAuthLogin(provider: any): Promise<any> {
    return this.fireAuth.signInWithPopup(provider);
  }
}
