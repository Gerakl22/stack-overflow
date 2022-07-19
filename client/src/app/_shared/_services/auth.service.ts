import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUser } from '../_models/AuthUser';
import { ILogin } from '../interface/ILogin';
import { IRefreshToken } from '../interface/IRefreshToken';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = environment.apiUrl;

  private errorHandler(error: { error: { message: any }; status: any; message: any }): Observable<never> {
    return throwError(error.error.message);
  }

  public getUser(): Observable<User> {
    const authUser = JSON.parse(localStorage.getItem('authUser') || 'null');

    if (authUser) {
      return of(authUser).pipe(
        map((authUser: User) => {
          return new User(authUser.id, authUser.email, authUser.role, authUser.accessToken, authUser.refreshToken);
        })
      );
    }
    return EMPTY;
  }

  public isLoginUser(): Observable<boolean> {
    const authUser = JSON.parse(localStorage.getItem('authUser') || 'null');

    if (authUser !== null) {
      return of(true);
    }

    return of(false);
  }

  public login(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + 'auth/login', user).pipe(catchError(this.errorHandler));
  }

  public signOut(refreshToken: IRefreshToken): Observable<IRefreshToken> {
    return this.http.post<IRefreshToken>(this.url + 'auth/logout', refreshToken).pipe(catchError(this.errorHandler));
  }

  public signUp(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + 'auth/sign-up', user).pipe(catchError(this.errorHandler));
  }
}
