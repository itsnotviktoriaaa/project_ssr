import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { provideRouterStore, StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HotelTypesEffects } from 'ngr/hotel-types/hotel-types.effects';
import { hotelTypesReducer } from 'ngr/hotel-types/hotel-types.reducer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { CustomRouterStateSerializer } from 'ngr/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
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
      StoreModule.forRoot({
        hotelTypes: hotelTypesReducer,
      }),
      EffectsModule.forRoot([HotelTypesEffects]),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      BrowserModule,
      BrowserAnimationsModule,
    ]),
    provideAngularSvgIcon(),
    provideRouterStore(),
    provideAnimationsAsync(),
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
