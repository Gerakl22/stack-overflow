import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUser } from '../_models/AuthUser';
import { ILogin } from '../interface/ILogin';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  private isLogUser = false;
  public user$!: Observable<User>;
  public isLogUser$ = new BehaviorSubject<boolean>(this.isLogUser);
  private url = environment.apiUrl;

  private getUser(data: ILogin): Observable<User> {
    return of(data).pipe(
      map((data: ILogin) => {
        return new User(data.user.id, data.user.email, data.user.role, data.token.accessToken, data.token.refreshToken);
      })
    );
  }

  private errorHandler(error: { error: { message: any }; status: any; message: any }): Observable<never> {
    return throwError(error.error.message);
  }

  private setLogged(value: boolean): void {
    this.isLogUser = value;
    this.isLogUser$.next(value);
  }

  login(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + 'auth/login', user).pipe(
      map((data: ILogin) => {
        if (data) {
          this.user$ = this.getUser(data);
          this.setLogged(true);
          return data;
        }
        return data;
      }),
      catchError(this.errorHandler)
    );
  }

  // signOut(): Promise<any> {
  // }

  signUp(user: AuthUser): Observable<ILogin> {
    return this.http.post<ILogin>(this.url + 'auth/sign-up', user).pipe(
      map((data: ILogin) => {
        if (data) {
          this.user$ = this.getUser(data);
          this.setLogged(true);
          return data;
        }
        return data;
      }),
      catchError(this.errorHandler)
    );
  }
}
