import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageConstants, ThemeConstants } from '@shared/constants';
import { Theme } from '@shared/models';
import { ThemeService } from '@shared/services';

@Component({
  selector: 'app-filter-by-theme',
  templateUrl: 'filter-by-theme.component.html',
  styleUrls: ['filter-by-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterByThemeComponent implements OnInit {
  constructor(private themeService: ThemeService) {
    this.themeName = JSON.parse(localStorage.getItem(LocalStorageConstants.THEME));
  }

  private readonly themeName: string;
  public themeData: Theme[] = [];

  ngOnInit(): void {
    this.themeData = ThemeConstants;
    this.checkTheme();
  }

  private checkTheme(): void {
    if (this.themeName) {
      this.changeTheme(this.themeName);
    }
  }

  public changeTheme(themeName: string): void {
    this.themeData.forEach((theme: Theme) => {
      if (theme.name === themeName) {
        this.themeService.setTheme(themeName);
        theme.checked = true;
      } else {
        theme.checked = false;
      }
    });
  }
}
