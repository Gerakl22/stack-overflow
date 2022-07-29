import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthUser, User } from '../models';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ILogin, IRefreshToken } from '../interface';
import { LocalStorageConstants, RoutesConstants } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = environment.apiUrl;

  private errorHandler(error: { error: { message: any }; status: any; message: any }): Observable<never> {
    return throwError(error.error);
  }

  public getUser(): Observable<User> {
    const authUser = JSON.parse(localStorage.getItem(LocalStorageConstants.AUTH_USER) || 'null');

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
    const authUser = JSON.parse(localStorage.getItem(LocalStorageConstants.AUTH_USER) || 'null');

    if (authUser !== null) {
      return of(true);
    }

    return of(false);
  }

  public login(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + RoutesConstants.AUTH.LOGIN, user).pipe(catchError(this.errorHandler));
  }

  public logout(refreshToken: IRefreshToken): Observable<any> {
    return this.http.post<any>(this.url + RoutesConstants.AUTH.LOGOUT, refreshToken).pipe(
      map((data) => {
        console.log(data);
        return EMPTY;
      }),
      catchError(this.errorHandler)
    );
  }

  public signUp(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + RoutesConstants.AUTH.SIGN_UP, user).pipe(catchError(this.errorHandler));
  }
}
