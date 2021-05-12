import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_shared/_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public email: string | undefined;

  constructor(private authService: AuthService, private router: Router) {
    authService.user$.subscribe((user: any)  => {
      if (user) {
        this.email = user.email;
      }
    });
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authService.signOut()
      .then(() => {
      this.router.navigate(['login']);
    });
  }

}
