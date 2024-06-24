import { selectHotelTypes } from 'ngr/hotel-types/hotel-types.selector';
import { loadHotelTypes } from 'ngr/hotel-types/hotel-types.actions';
import { Injectable } from '@angular/core';
import { IHotelType } from 'app/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelTypesFacade {
  constructor(private store: Store) {}

  loadHotelTypes() {
    this.store.dispatch(loadHotelTypes());
  }

  getHotelTypes(): Observable<IHotelType[] | null> {
    return this.store.select(selectHotelTypes);
  }
}
