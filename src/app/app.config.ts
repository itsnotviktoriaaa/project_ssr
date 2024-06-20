import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { provideRouterStore, StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { CustomRouterStateSerializer } from 'ngr/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideEffects(),
    importProvidersFrom([
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      StoreRouterConnectingModule.forRoot({ serializer: CustomRouterStateSerializer }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      BrowserModule,
      BrowserAnimationsModule,
    ]),
    provideAngularSvgIcon(),
    provideRouterStore(),
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
