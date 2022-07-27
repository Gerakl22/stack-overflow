import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { IRefreshToken } from '../interface/IRefreshToken';
import { RoutesConstants } from '../constants/RoutesConstants';
import { User } from '../_models/User';
import { LocalStorageConstants } from '../constants/LocalStorageConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {}

  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 0;
  private refreshToken!: string;
  public email!: string;
  public isLoginUser = false;

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

  private removeAuthUserAndReloadPage(): void {
    this.isLoginUser = false;
    localStorage.removeItem(LocalStorageConstants.AUTH_USER);
  }

  ngOnInit(): void {
    this.getAuthUser();
  }

  public addQuestion(): void {
    this.router.navigateByUrl('questions/add');
  }

  public onLogin(): void {
    this.router.navigateByUrl(RoutesConstants.AUTH.LOGIN);
  }

  public onSignUp(): void {
    this.router.navigateByUrl(RoutesConstants.AUTH.SIGN_UP);
  }

  public logout(): void {
    const refreshToken: IRefreshToken = {
      refreshToken: this.refreshToken,
    };

    this.authService
      .logout(refreshToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.removeAuthUserAndReloadPage();

          setTimeout(() => this.router.navigateByUrl(RoutesConstants.AUTH.LOGIN), this.redirectDelay);
          this.cd.detectChanges();
        },
        (error) => {
          console.log(error);
          this.cd.detectChanges();
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
