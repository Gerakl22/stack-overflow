import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_shared/_services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthUser } from '../../_shared/_models/AuthUser';
import { ILogin } from '../../_shared/interface/ILogin';
import { User } from '../../_shared/_models/User';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 1000;
  error!: string;
  isHidePassword = true;
  myForm!: FormGroup;

  constructor(public authService: AuthService, public router: Router, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get email(): AbstractControl {
    return this.myForm.controls.email;
  }

  get password(): AbstractControl {
    return this.myForm.controls.password;
  }

  getErrorEmail(): string {
    if (this.email.errors?.required) {
      return 'You must enter a value';
    }

    return this.email.errors?.pattern ? 'Not a valid email' : '';
  }

  getErrorPassword(): string {
    if (this.password.errors?.required) {
      return 'You must enter value';
    }

    return this.password.errors?.minlength ? 'Min length 6 letters' : '';
  }

  private parseDataForAuthUser(data: ILogin): User {
    return {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken
    };
  }

  private setAuthUserAndReloadPage(authUser: User): void {
    localStorage.setItem('authUser', JSON.stringify(authUser));
    window.location.reload();
  }

  onSubmit(): void {
    const user: AuthUser = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    };

    this.authService
      .signUp(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: ILogin) => {
          this.setAuthUserAndReloadPage(this.parseDataForAuthUser(data));

          setTimeout(() => this.router.navigateByUrl(''), this.redirectDelay);
        },
        (error: string) => {
          this.error = error;
          this.cd.detectChanges();
        }
      );
  }

  toggleIconPassword(): void {
    this.isHidePassword = !this.isHidePassword;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
