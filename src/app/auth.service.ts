import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  public user: Observable<firebase.default.User | null>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.user = this.fireAuth.authState;
  }

  login(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('It worked');
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log('Something wrong: ', error.message);
      });
  }

  signUp(email: string, password: string): any {
   return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log(`Success ${value}`);
        this.router.navigate(['/']);
      })
      .catch(error => {
      console.log(`Something wrong: ${error}`);
    });
  }

  async gitHubLogin(): Promise<any> {
    const provider = new firebase.default.auth.GithubAuthProvider();
    return await this.onAuthLogin(provider)
      .then((value: any) => {
        console.log(`Success ${value}`);
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        console.log(`Something wrong: ${error}`);
      });
  }

  async googleLogin(): Promise<any> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return await this.onAuthLogin(provider)
      .then((value: any) => {
        console.log(`Success ${value}`);
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        console.log(`Something wrong: ${error}`);
      });
  }

  signOut(): any {
    this.fireAuth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      });
  }

  private onAuthLogin(provider: any): any {
    return this.fireAuth.signInWithPopup(provider);
  }
}
