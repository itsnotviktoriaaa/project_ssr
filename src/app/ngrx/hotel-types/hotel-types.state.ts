import { IHotelType } from 'app/models';

export interface HotelTypesState {
  hotelTypes: IHotelType[] | null;
  isLoading: boolean;
}
