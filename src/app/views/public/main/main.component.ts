import { environment } from '../../../../environments/environment.development';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CarouselModule, SvgIconComponent, TranslateModule],
  templateUrl: './main.component.html',
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
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 1,
      },
    },
    nav: false,
  };
}
