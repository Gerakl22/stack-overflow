import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private url = environment.apiUrl;
  private urlAdmins = 'admins';
  public user$: Observable<User | null> | undefined;
  public user!: User | null;

  constructor(private http: HttpClient) {
    // this.user$ = this.fireAuth.authState.pipe(
    //   map((userFromFirebase: firebase.default.User | null) => {
    //     this.user = userFromFirebase ? new User({ email: userFromFirebase.email, isAdmin: false }) : null;
    //     return this.user;
    //   }),
    //   switchMap((user) => (user === null ? of(user) : this.getAdmins())),
    //   map((admins) => {
    //     if (this.user && admins !== null) {
    //       this.checkUserIsAdmin(admins);
    //     }
    //     return this.user;
    //   })
    // );
  }

  // checkUserIsLogged(): Observable<User | null> {
  //   if (this.user) {
  //     return of(this.user);
  //   } else {
  //     return this.user$;
  //   }
  // }

  checkUserIsAdmin(admins: User[]): void {
    admins.find((admin: User) => {
      if (admin.email === this.user?.email) {
        this.user.isAdmin = true;
      }
    });
  }

  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}${this.urlAdmins}.json`);
  }

  // private onAuthLogin(provider: any): Promise<any> {
  //   return this.fireAuth.signInWithPopup(provider);
  // }
  //
  // facebookLogin(): Promise<any> {
  //   const provider = new firebase.default.auth.FacebookAuthProvider();
  //   return this.onAuthLogin(provider);
  // }
  //
  // gitHubLogin(): Promise<any> {
  //   const provider = new firebase.default.auth.GithubAuthProvider();
  //   return this.onAuthLogin(provider);
  // }
  //
  // googleLogin(): Promise<any> {
  //   const provider = new firebase.default.auth.GoogleAuthProvider();
  //   return this.onAuthLogin(provider);
  // }
  //
  // login(email: string, password: string): Promise<any> {
  //   return this.fireAuth.signInWithEmailAndPassword(email, password);
  // }
  //
  // signOut(): Promise<any> {
  //   return this.fireAuth.signOut();
  // }
  //
  signUp(user: { email: string; password: string }): Observable<{ email: string; password: string }[]> {
    return this.http.post<any>(this.url + 'auth/sign-up', user).pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error: { error: { message: any }; status: any; message: any }): Observable<never> {
    let errorMessage;

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
