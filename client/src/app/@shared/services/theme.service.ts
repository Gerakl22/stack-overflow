import { Injectable } from '@angular/core';
import { ThemeConstants } from '../constants';
import { Theme } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setTheme(themeName: string | null): void {
    const themeObject = ThemeConstants.find((item: Theme) => item.name === themeName);

    if (themeObject !== undefined) {
      Object.keys(themeObject.properties).forEach((property: string) => {
        document.documentElement.style.setProperty(property, themeObject?.properties[property]);
      });
    }
  }
}
