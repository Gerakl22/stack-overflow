import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  public user: Observable<firebase.default.User | null>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.user = this.fireAuth.authState; // change authGuard to do
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
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

  signOut(): any {
    this.fireAuth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      });
  }

  private onAuthLogin(provider: any): Promise<any> {
    return this.fireAuth.signInWithPopup(provider);
  }
}
