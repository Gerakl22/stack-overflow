import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../_shared/_services/auth.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

  private id: string | undefined;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authService.user$.subscribe((user) => {
        if (user) {
          this.id = user.uid;
        }
      });

      if (this.id) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }
}
