import { environment } from '../../../../environments/environment.development';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { MapComponent } from 'ui/map/map.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CarouselModule, SvgIconComponent, TranslateModule, MapComponent],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './main.component.scss',
})
export class MainComponent {
  imagesPath = environment.imagesPath;
  imagesIconsPath = environment.imagesIconsPath;

  images = [
    { id: '1', src: 'main-slider-1.webp', alt: 'main-page.tokio' },
    { id: '2', src: 'main-slider-2.webp', alt: 'main-page.paris' },
    { id: '3', src: 'main-slider-3.webp', alt: 'main-page.new-york' },
  ];

  advantages = [
    {
      id: 1,
      src: 'choice-icon.png',
      title: 'main-page.advantage-item-choosing',
      description: 'main-page.advantage-description-choosing',
    },
    {
      id: '2',
      src: 'price-icon.png',
      title: 'main-page.advantage-item-price',
      description: 'main-page.advantage-description-price',
    },
    {
      id: 3,
      src: 'warning-icon.png',
      title: 'main-page.advantage-item-security',
      description: 'main-page.advantage-description-security',
    },
    {
      id: 4,
      src: 'support-icon.png',
      title: 'main-page.advantage-item-support',
      description: 'main-page.advantage-description-support',
    },
    {
      id: 5,
      src: 'reviews-icon.png',
      title: 'main-page.advantage-item-reviews',
      description: 'main-page.advantage-description-reviews',
    },
  ];

  reviews = [
    {
      id: '1',
      title: 'main-page.advantage-item-choosing',
      description: 'main-page.advantage-description-choosing',
    },
    {
      id: '2',
      title: 'main-page.advantage-item-price',
      description: 'main-page.advantage-description-price',
    },
    {
      id: '3',
      title: 'main-page.advantage-item-security',
      description: 'main-page.advantage-description-security',
    },
    {
      id: '4',
      title: 'main-page.advantage-item-support',
      description: 'main-page.advantage-description-support',
    },
    {
      id: '5',
      title: 'main-page.advantage-item-reviews',
      description: 'main-page.advantage-description-reviews',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 3000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 3,
    navSpeed: 1500,
    responsive: {
      740: {
        items: 1,
      },
    },
    nav: false,
  };

  customOptionsReviews: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 3000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 3,
    navSpeed: 1500,
    responsive: {
      480: {
        items: 1,
      },
      740: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
    nav: false,
    dots: false,
  };
}
