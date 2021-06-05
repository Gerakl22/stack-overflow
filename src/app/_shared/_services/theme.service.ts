import { Injectable } from '@angular/core';
import { ThemeConstants } from '../constants/ThemeConstants';
import { Theme } from '../_models/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setTheme(themeName: string | null): void {
    const themeObject = ThemeConstants.find((item: Theme) => item.name === themeName);

    if (themeObject !== undefined) {
      Object.keys(themeObject.properties).forEach((property) => {
        document.documentElement.style.setProperty(property, themeObject?.properties[property]);
      });
    }
  }
}
