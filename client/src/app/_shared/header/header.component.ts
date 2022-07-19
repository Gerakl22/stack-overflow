import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRefreshToken } from '../interface/IRefreshToken';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 0;
  private refreshToken!: string;
  public email!: string;
  public isLoginUser = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  private getAuthUser(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.email = user.email;
        this.isLoginUser = true;
        this.refreshToken = user.refreshToken;
      });
  }

  private removeAuthUser(): void {
    this.isLoginUser = false;
    localStorage.removeItem('authUser');
  }

  ngOnInit(): void {
    this.getAuthUser();
  }

  addQuestion(): void {
    this.router.navigateByUrl('newQuestion');
  }

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  onSignUp(): void {
    this.router.navigateByUrl('auth/sign-up');
  }

  signOut(): void {
    const refreshToken: IRefreshToken = {
      refreshToken: this.refreshToken
    };

    this.authService
      .signOut(refreshToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.removeAuthUser();

        setTimeout(() => this.router.navigateByUrl('auth/login'), this.redirectDelay);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
