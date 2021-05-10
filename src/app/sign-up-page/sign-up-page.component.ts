import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

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
    return this.auth.signUp(this.myForm.value.email, this.myForm.value.password);
  }

  toggleIconPassword(e: any): boolean {
    e.preventDefault();
    return this.isHide = !this.isHide;
  }

}
