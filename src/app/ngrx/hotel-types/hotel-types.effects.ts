import {
  loadHotelTypes,
  loadHotelTypesFailure,
  loadHotelTypesSuccess,
} from 'ngr/hotel-types/hotel-types.actions';
import { BookingService } from 'core/services/booking.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IHotelType } from 'app/models';

@Injectable({ providedIn: 'root' })
export class HotelTypesEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}

  loadHotelTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadHotelTypes),
      switchMap(() => {
        return this.bookingService.getHotelTypes().pipe(
          map((data: { result: IHotelType[] }) => data.result),
          map((dataTransformed: IHotelType[]) => {
            return loadHotelTypesSuccess({ data: dataTransformed });
          }),
          catchError(() => of(loadHotelTypesFailure({ error: null })))
        );
      })
    );
  });
}
