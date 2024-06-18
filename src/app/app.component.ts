import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    const browserLang: string | undefined = this.translateService.getBrowserLang();
    if (browserLang === 'en' || browserLang === 'ru') {
      this.translateService.use(browserLang);
    } else {
      this.translateService.use('en');
    }
  }
}
