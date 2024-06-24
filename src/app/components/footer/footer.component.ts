import { environment } from '../../../environments/environment.development';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule, SvgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  imagesPath = environment.imagesPath;
  imagesSocialSitesPath = environment.imagesSocialSitesPath;

  footerMenuItems = [
    { path: '/', title: 'About us' },
    { path: '/hotels', title: 'Hotels' },
    { path: '/rooms', title: 'Rooms' },
    { path: '/catalog', title: 'Catalog' },
    { path: '/payment', title: 'Payment' },
  ];

  footerSectionItems = [
    { path: '/', title: 'About us' },
    { path: '/hotels', title: 'Hotels' },
    { path: '/rooms', title: 'Rooms' },
    { path: '/catalog', title: 'Catalog' },
    { path: '/payment', title: 'Payment' },
  ];

  socialSiteItems = [
    { href: 'https://google.com', path: 'facebook-icon.svg' },
    { href: 'https://google.com', path: 'im-icon.svg' },
    { href: 'https://google.com', path: 'telegram-icon.svg' },
    { href: 'https://google.com', path: 'twitter-icon.svg' },
  ];

  footerPayments = ['visa.png', 'master-card.png', 'google-pay.png', 'apple-pay.png'];
}
