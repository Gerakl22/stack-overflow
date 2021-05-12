import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  myForm!: FormGroup;
  isHidePassword = true;
  error!: string;

  constructor(public authService: AuthService, public router: Router)  {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ])
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

    return this.email.errors?.pattern ? 'Not a valid email' :  '';
  }

  getErrorPassword(): string {
    if (this.password.errors?.required) {
      return 'You must enter value';
    }

    return this.password.errors?.minlength ? 'Min length 6 letters' : '';
  }

  logOnFacebook(): void {
    this.authService.facebookLogin()
      .then(() => {
        this.router.navigate( ['/']);
      })
      .catch((err: Error) => {
        this.error = err.message;
      });
  }

  logOnGoogle(): void {
    this.authService.googleLogin()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: Error) => {
        this.error = err.message;
      });
  }

  logOnGitHub(): void {
    this.authService.gitHubLogin()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: Error) => {
        this.error = err.message;
      });
  }

  onSubmit(e: { preventDefault: () => void; }): void {
    e.preventDefault();
    this.authService.login(this.myForm.value.email, this.myForm.value.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: Error) => {
        this.error = err.message;
      });
  }

  toggleIconPassword(): void {
    this.isHidePassword = !this.isHidePassword;
  }

}
