import {
  loadHotelTypes,
  loadHotelTypesFailure,
  loadHotelTypesSuccess,
} from 'ngr/hotel-types/hotel-types.actions';
import { HotelTypesState } from 'ngr/hotel-types/hotel-types.state';
import { Action, createReducer, on } from '@ngrx/store';

const initialStateHotelTypes: HotelTypesState = {
  hotelTypes: null,
  isLoading: false,
};

const _hotelTypesReducer = createReducer(
  initialStateHotelTypes,
  on(loadHotelTypes, state => ({
    ...state,
    isLoading: true,
  })),
  on(loadHotelTypesSuccess, (state, { data }) => ({
    ...state,
    hotelTypes: data,
    isLoading: false,
  })),
  on(loadHotelTypesFailure, state => ({
    ...state,
    hotelTypes: null,
    isLoading: false,
  }))
);

export function hotelTypesReducer(state: HotelTypesState | undefined, action: Action) {
  return _hotelTypesReducer(state, action);
}
