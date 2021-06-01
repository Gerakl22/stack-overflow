import { Injectable } from '@angular/core';
import {ThemeConstants} from '../constants/ThemeConstants';
import {Theme} from '../_models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private light = 'Light';
  private dark = 'Dark';
  private lightTheme: Theme | undefined = ThemeConstants.find(theme => theme.name === this.light);
  private darkTheme: Theme | undefined = ThemeConstants.find(theme => theme.name === this.dark);

  private activeTheme: Theme | undefined = this.lightTheme;

  setTheme(themeName: string | null): void {
    if (themeName === this.light) {
      this.setActiveTheme(this.lightTheme);
    }
    if (themeName === this.dark) {
      this.setActiveTheme(this.darkTheme);
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
