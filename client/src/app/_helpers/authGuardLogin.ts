import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_shared/_services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardLogin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoginUser().pipe(
      map((isLogUser: boolean) => {
        if (isLogUser) {
          return isLogUser;
        }
        this.router.navigate(['auth/login']);

        return isLogUser;
      })
    );
  }
}
