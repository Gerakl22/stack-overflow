import { Injectable } from '@angular/core';
import { LocalStorageConstants, ThemeConstants } from '../constants';
import { Theme } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setTheme(themeName: string | null): void {
    const themeObject = ThemeConstants.find((item: Theme) => item.name === themeName);
    localStorage.setItem(LocalStorageConstants.THEME, JSON.stringify(themeName));

    if (themeObject !== undefined) {
      Object.keys(themeObject.properties).forEach((property: string) => {
        document.documentElement.style.setProperty(property, themeObject?.properties[property]);
      });
    }
  }
}
