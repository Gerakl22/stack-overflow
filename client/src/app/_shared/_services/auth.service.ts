import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUser } from '../_models/AuthUser';
import { ILogin } from '../interface/ILogin';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = environment.apiUrl;
  public user$!: Observable<User>;

  private static getUser(data: ILogin): Observable<User> {
    return of(data).pipe(
      map((data: ILogin) => {
        return new User(data.user.id, data.user.email, data.user.role, data.token.accessToken, data.token.refreshToken);
      })
    );
  }

  private static errorHandler(error: { error: { message: any }; status: any; message: any }): Observable<never> {
    return throwError(error.error.message);
  }

  login(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + 'auth/login', user).pipe(
      map((data: ILogin) => {
        if (data) {
          this.user$ = AuthService.getUser(data);
          return data;
        }
        return data;
      }),
      catchError(AuthService.errorHandler)
    );
  }

  // signOut(): Promise<any> {
  //   return this.fireAuth.signOut();
  // }

  signUp(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + 'auth/sign-up', user).pipe(
      map((data: ILogin) => {
        if (data) {
          this.user$ = AuthService.getUser(data);
          return data;
        }
        return data;
      }),
      catchError(AuthService.errorHandler)
    );
  }
}
