import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideRouterStore, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomRouterStateSerializer } from 'ngr/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      StoreRouterConnectingModule.forRoot({ serializer: CustomRouterStateSerializer }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
    ]),
    provideStore(),
    provideEffects(),
    provideRouterStore(),
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
