import { createAction, props } from '@ngrx/store';
import { IHotelType } from 'app/models';

export const loadHotelTypes = createAction('[HotelTypes] Load Hotel Types');
export const loadHotelTypesSuccess = createAction(
  '[HotelTypes] Load Hotel Types Success',
  props<{ data: IHotelType[] }>()
);
export const loadHotelTypesFailure = createAction(
  '[HotelTypes] Load Hotel Types Failure',
  props<{ error: null }>()
);
