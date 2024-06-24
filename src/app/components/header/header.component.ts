import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { environment } from '../../../environments/environment.development';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService, DestroyDirective, ThemeService } from 'app/core';
import { MatIconButton } from '@angular/material/button';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatIcon } from '@angular/material/icon';
import { ActionForSignEnum } from 'app/models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslateModule,
    SvgIconComponent,
    RouterLink,
    AsyncPipe,
    MatIconButton,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    MatMenu,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  hostDirectives: [DestroyDirective],
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  theme = 'light';
  imagesPath = environment.imagesPath;
  imagesIconsPath = environment.imagesIconsPath;

  showInputForSearching = new BehaviorSubject(false);
  showResultsFromSearching = signal(false);

  actionForSign = signal(ActionForSignEnum.SIGNIN);

  hideSingleSelectionIndicator = signal(false);
  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }

  private readonly destroy$ = inject(DestroyDirective).destroy$;

  headerMenuItems = [
    { path: '/', title: 'About us' },
    { path: '/hotel-types', title: 'Hotels' },
    { path: '/rooms', title: 'Rooms' },
    { path: '/catalog', title: 'Catalog' },
    { path: '/payment', title: 'Payment' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {
    afterNextRender((): void => {
      const user = this.authService.isAuthenticated();
      user
        .pipe(
          tap((param: boolean) => {
            if (!param) {
              this.actionForSign.set(ActionForSignEnum.SIGNIN);
            } else {
              this.actionForSign.set(ActionForSignEnum.SIGNOUT);
            }
          })
        )
        .subscribe();
    });
  }

  moveToPage(path: string): void {
    this.router.navigate([path]).then((): void => {});
  }

  openInputForSearching(): void {
    this.showInputForSearching.next(!this.showInputForSearching.value);
  }

  logAction(log: string): void {
    if (log === ActionForSignEnum.SIGNOUT) {
      this.authService
        .logout()
        .pipe(
          tap(() => {
            this.actionForSign.set(ActionForSignEnum.SIGNIN);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      this.router.navigate(['/login']).then(() => {});
    }
  }

  changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
    if (this.theme) {
      this.themeService.setThemeSubject('dark');
    } else {
      this.themeService.setThemeSubject('light');
    }
  }

  public selectLanguage(lang: string): void {
    if (lang === 'language.en') {
      this.translateService.use('en');
    }

    if (lang === 'language.ru') {
      this.translateService.use('ru');
    }
  }
}
