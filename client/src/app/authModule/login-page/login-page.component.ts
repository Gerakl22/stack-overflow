import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../_shared/_services/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthUser } from '../../_shared/_models/AuthUser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private redirectDelay = 0;
  error!: string;
  isHidePassword = true;
  myForm!: FormGroup;

  constructor(public authService: AuthService, public router: Router) {
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

  // logOnFacebook(): void {
  //   this.authService
  //     .facebookLogin()
  //     .then(() => {
  //       this.router.navigate(['/']);
  //     })
  //     .catch((err: Error) => {
  //       this.error = err.message;
  //     });
  // }
  //
  // logOnGoogle(): void {
  //   this.authService
  //     .googleLogin()
  //     .then(() => {
  //       this.router.navigate(['/']);
  //     })
  //     .catch((err: Error) => {
  //       this.error = err.message;
  //     });
  // }
  //
  // logOnGitHub(): void {
  //   this.authService
  //     .gitHubLogin()
  //     .then(() => {
  //       this.router.navigate(['/']);
  //     })
  //     .catch((err: Error) => {
  //       this.error = err.message;
  //     });
  // }

  onSubmit(): void {
    const user: AuthUser = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    };

    this.authService
      .login(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          setTimeout(() => this.router.navigateByUrl(''), this.redirectDelay);
        },
        (error: string) => {
          this.error = error;
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
