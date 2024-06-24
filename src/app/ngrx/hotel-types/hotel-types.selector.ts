import { HotelTypesState } from 'ngr/hotel-types/hotel-types.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectHotelTypesState = createFeatureSelector<HotelTypesState>('hotelTypes');

export const selectHotelTypes = createSelector(
  selectHotelTypesState,
  (state: HotelTypesState) => state.hotelTypes
);

export const selectHotelTypesIsLoading = createSelector(
  selectHotelTypesState,
  (state: HotelTypesState) => state.isLoading
);
