import { afterNextRender, Component, inject } from '@angular/core';
import { FooterComponent, HeaderComponent } from 'app/components';
import { AuthService, DestroyDirective } from 'app/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  hostDirectives: [DestroyDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly destroy$ = inject(DestroyDirective).destroy$;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService
  ) {
    afterNextRender(() => {
      this.translateService.setDefaultLang('en');
      const browserLang: string | undefined = this.translateService.getBrowserLang();
      if (browserLang === 'en' || browserLang === 'ru') {
        this.translateService.use(browserLang);
      } else {
        this.translateService.use('en');
      }

      this.getCurrentUser();
    });
  }

  getCurrentUser(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }

      console.log(this.authService.currentUserSig());
    });

    //для отображения имени пользователя потом использовать вот это в html
    // {{authService.currentUserSig()?.username}}
  }
}
