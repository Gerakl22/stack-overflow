import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@shared/services';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ErrorConstants, LocalStorageConstants } from '@shared/constants';
import { ILogin } from '@shared/interface';

import { AuthUser, User } from '@shared/models';
import { Validations } from '@shared/validation';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {
    const currentNavigation = this.router.getCurrentNavigation() || ({} as Navigation);

    if (currentNavigation?.extras?.state?.messageType === ErrorConstants.ACCESS_TOKEN_EXPIRED) {
      this.error = currentNavigation?.extras?.state?.message;
    }
  }

  get email(): AbstractControl {
    return this.myForm.controls.email;
  }

  get password(): AbstractControl {
    return this.myForm.controls.password;
  }

  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 0;
  public error!: string;
  public isHidePassword = true;
  public myForm!: FormGroup;

  private static parseDataForAuthUser(data: ILogin): User {
    return {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken,
    };
  }

  private static setAuthUserAndReloadPage(authUser: User): void {
    localStorage.setItem(LocalStorageConstants.AUTH_USER, JSON.stringify(authUser));
    window.location.reload();
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Validations.email)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(Validations.password.minLength),
        Validators.maxLength(Validations.password.maxLength),
      ]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  public getErrorEmail(): string {
    if (this.email.errors?.required) {
      return ErrorConstants.EMAIL.MUST_VALUE;
    }

    return this.email.errors?.pattern ? ErrorConstants.EMAIL.NOT_VALID : ErrorConstants.EMPTY_STRING;
  }

  public getErrorPassword(): string {
    if (this.password.errors?.required) {
      return ErrorConstants.PASSWORD.MUST_VALUE;
    }

    return this.password.errors ? ErrorConstants.PASSWORD.LENGTH : ErrorConstants.EMPTY_STRING;
  }

  public onSubmit(): void {
    const user: AuthUser = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };

    this.authService
      .login(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: ILogin) => {
          LoginPageComponent.setAuthUserAndReloadPage(LoginPageComponent.parseDataForAuthUser(data));

          setTimeout(() => this.router.navigateByUrl('questions/all'), this.redirectDelay);
        },
        (error) => {
          this.error = error.message;
          this.cd.detectChanges();
        }
      );
  }

  public toggleIconPassword(): void {
    this.isHidePassword = !this.isHidePassword;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
