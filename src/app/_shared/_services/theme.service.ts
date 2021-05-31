import { Injectable } from '@angular/core';
import {ThemeConstants} from '../constants/ThemeConstants';
import {Theme} from '../_models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private lightTheme: Theme | undefined = ThemeConstants.find(theme => theme.name === 'Light');
  private darkTheme: Theme | undefined = ThemeConstants.find(theme => theme.name === 'Dark');

  private activeTheme: Theme | undefined = this.lightTheme;

  getActiveTheme(): Theme {
    return this.activeTheme as Theme;
  }

  setTheme(themeName: string | null): void {
    if (themeName === 'Dark') {
      this.setActiveTheme(this.darkTheme);
    }
    if (themeName === 'Light') {
      this.setActiveTheme(this.lightTheme);
    }
  }

  setActiveTheme(theme: Theme | undefined): void {
    this.activeTheme = theme;

    if (this.activeTheme !== undefined) {
        Object.keys(this.activeTheme.properties).forEach((property) => {
          document.documentElement.style.setProperty(
            property,
            this.activeTheme?.properties[property],
          );
        });
    }
  }
}
