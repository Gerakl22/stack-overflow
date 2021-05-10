import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public email: string | undefined;
  public isLog: boolean | undefined;

  constructor(private auth: AuthService) {
    auth.user.subscribe((user: any) => {
      if (user) {
        this.email = user.email;
        this.isLog = true;
      }
    });
  }

  ngOnInit(): void {
  }

  signOut(e: any): any {
    e.preventDefault();
    this.auth.signOut();
    this.isLog = false;
    console.log('It worked');
  }

}
