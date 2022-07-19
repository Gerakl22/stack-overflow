import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_shared/_services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardHome implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoginUser().pipe(
      map((isLoginUser: boolean) => {
        if (isLoginUser) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
