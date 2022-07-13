import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_shared/_services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  isHidePassword = true;
  error!: string;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(public authService: AuthService, public router: Router) {}

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

  onSubmit(e: { preventDefault: () => void }): void {
    e.preventDefault();
    const user = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };
    this.authService
      .signUp(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  toggleIconPassword(): void {
    this.isHidePassword = !this.isHidePassword;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
