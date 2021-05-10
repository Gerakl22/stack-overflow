import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  myForm!: FormGroup;
  isHide = true;

  constructor(public auth: AuthService)  {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ])
      });
  }

  get email(): any {
    return this.myForm.controls.email;
  }

  get password(): any {
    return this.myForm.controls.password;
  }

  getErrorEmail(): any {
    if (this.email.errors?.required) {
      return 'You must enter a value';
    }

    return this.email.errors?.email ? 'Not a valid email' :  '';
  }

  getErrorPassword(): any {
    if (this.password.errors?.required) {
      return 'You must enter value';
    }

    return this.password.errors?.minlength ? 'Min length 6 letters' : '';
  }

  logOnGoogle(e: any): any {
    e.preventDefault();
    return this.auth.googleLogin();
  }

  logOnGitHub(e: any): any {
    e.preventDefault();
    return this.auth.gitHubLogin();
  }

  onSubmit(e: any): any {
    e.preventDefault();
    return this.auth.login(this.myForm.value.email, this.myForm.value.password);
  }

  toggleIconPassword(e: any): boolean {
    e.preventDefault();
    return this.isHide = !this.isHide;
  }

}
