import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_shared/_services/auth.service';
import { User } from '../_shared/_models/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardHome implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<true>();
    // return this.authService.user$.pipe(
    //   map((user: User | null) => {
    //     if (user) {
    //       this.router.navigate(['/']);
    //       return false;
    //     }
    //     return true;
    //   })
    // );
  }
}
