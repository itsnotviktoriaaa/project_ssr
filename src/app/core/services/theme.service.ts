import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThemeI } from 'app/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _themes: ThemeI = {
    light: {
      '--primary-blue-color': '#003b95',
      '--primary-blue-hover-color': '#0246a5',
      '--primary-blue-active-color': '#00347c',
      '--primary-gray-color': '#b1bebd',
      '--secondary-blue-color': '#006ce4',
      '--secondary-gray-color': '#c8c8c8',
      '--secondary-yellow-color': '#ffb700',
      '--secondary-yellow-hover-color': '#ffbb07',
      '--secondary-yellow-active-color': '#d69800',
      '--secondary-light-color': '#e6edec',
      '--text-darker-color': '#032128',
      '--text-darker-input-color': '#294248',
      '--text-dark-color': '#495c61',
      '--text-light-color': '#d3dadc',
      '--text-white-color': '#fff',
      '--mistake-color': '#d40000',
      '--disabled-color': '#c8c8c8',
    },
    dark: {
      '--primary-blue-color': '#001637',
      '--primary-blue-hover-color': '#003177',
      '--primary-blue-active-color': '#002e70',
      '--primary-gray-color': '#b1bebd',
      '--secondary-blue-color': '#164075',
      '--secondary-gray-color': '#c8c8c8',
      '--secondary-yellow-color': '#b17d00',
      '--secondary-yellow-hover-color': '#b68400',
      '--secondary-yellow-active-color': '#bd8700',
      '--secondary-light-color': '#e6edec',
      '--text-darker-color': '#032128',
      '--text-darker-input-color': '#294248',
      '--text-dark-color': '#495c61',
      '--text-light-color': '#d3dadc',
      '--text-white-color': '#fff',
      '--mistake-color': '#d40000',
      '--disabled-color': '#c8c8c8',
    },
  };

  _changeTheme$ = new Subject<string>();

  changeTheme$(): Observable<string> {
    return this._changeTheme$.asObservable();
  }

  setThemeSubject(theme: string): void {
    this._changeTheme$.next(theme);
  }

  setTheme(themeName: string): void {
    const theme = this._themes[themeName];

    if (theme) {
      Object.keys(theme).forEach((key: string): void => {
        document.documentElement.style.setProperty(key, theme[key]);
      });
    }

    this._changeTheme$.next(themeName);
  }
}
