import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, of, take, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'app/core';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return authService.isAuthenticated().pipe(
      take(1),
      tap(isAuthenticated => {
        console.log('isAuthenticated:', isAuthenticated);
      }),
      map((user: boolean) => {
        if (!user) {
          return router.createUrlTree(['login']);
        }
        console.log('here');
        return true;
      })
    );
  }

  return of(true);
};
