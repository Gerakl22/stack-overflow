import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from '../_models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public email: string | null | undefined;
  public isLogUser: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {
    // authService.checkUserIsLogged().subscribe((user: User | null) => {
    //   if (user) {
    //     this.email = user.email;
    //     this.isLogUser = true;
    //   }
    // });
  }

  ngOnInit(): void {}

  addQuestion(): void {
    this.router.navigate(['/newQuestion']);
  }

  signOut(): void {
    this.router.navigate(['/login']);
    this.isLogUser = false;
    // this.authService.signOut().then(() => {
    //   this.router.navigate(['/login']);
    //   this.isLogUser = false;
    // });
  }
}
