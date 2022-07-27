import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { RoutesConstants } from '../constants/RoutesConstants';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludeUrls = [RoutesConstants.AUTH.LOGIN, RoutesConstants.AUTH.LOGOUT, RoutesConstants.AUTH.SIGN_UP];

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('authUser') || 'null');

    const getUrl = req.url.split('/')[4] + '/' + req.url.split('/')[5];

    if (!user || this.excludeUrls.includes(getUrl)) {
      return next.handle(req);
    }

    let reqClone: HttpRequest<any>;
    reqClone = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });

    return next.handle(reqClone);

    // return next.handle(reqClone).pipe(
    //   catchError((error) => {
    //     console.log(error);
    //     this.router.navigateByUrl(RoutesConstants.AUTH.LOGIN, {
    //       state: { message: 'Token was expired', messageType: 'access_token_expired' },
    //     });
    //     localStorage.removeItem('authUser');
    //      ####### add reload page
    //
    //     return EMPTY;
    //   })
    // );
  }
}
