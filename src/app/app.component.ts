import { Component } from '@angular/core';
import {ThemeService} from './_shared/_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  constructor(private themeService: ThemeService) {
    if (localStorage.getItem('theme')) {
      this.themeService.setTheme(localStorage.getItem('theme'));
    }
  }
}
