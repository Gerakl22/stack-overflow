import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@shared/services';
import { LocalStorageConstants } from '@shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {
    this.themeName = JSON.parse(localStorage.getItem(LocalStorageConstants.THEME));
  }

  private readonly themeName: string;

  ngOnInit(): void {
    if (this.themeName) {
      this.themeService.setTheme(this.themeName);
    }
  }
}
