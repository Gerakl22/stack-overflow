import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_shared/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  myForm!: FormGroup;
  isHidePassword = true;
  error!: string;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    // this.authService
    //   .signUp(this.myForm.value.email, this.myForm.value.password)
    //   .then(() => {
    //     this.router.navigate(['/']);
    //   })
    //   .catch((err: Error) => {
    //     this.error = err.message;
    //   });
  }

  toggleIconPassword(): void {
    this.isHidePassword = !this.isHidePassword;
  }
}
