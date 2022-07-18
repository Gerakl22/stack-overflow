import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_shared/_services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardLogin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    console.log(this.authService.isLogUser$.value);
    return this.authService.isLogUser$.pipe(
      map((isLogUser: boolean) => {
        console.log(isLogUser);
        if (isLogUser) {
          console.log(isLogUser, 'gg');
          return true;
        }
        this.router.navigate(['auth/login']);
        return false;
      })
    );
  }
}
