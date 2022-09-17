import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services';
import { RoutesConstants } from '@shared/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardHome implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoginUser().pipe(
      map((isLoginUser: boolean) => {
        if (isLoginUser) {
          this.router.navigateByUrl(RoutesConstants.QUESTIONS.ALL);
          return false;
        }
        return true;
      })
    );
  }
}
