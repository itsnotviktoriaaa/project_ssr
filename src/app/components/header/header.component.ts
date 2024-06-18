import { environment } from '../../../environments/environment.development';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  imagesPath = environment.imagesPath;
}
