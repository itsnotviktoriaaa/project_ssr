import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HotelTypesFacade } from 'ngr/hotel-types/hotel-types.facade';
import { AsyncPipe } from '@angular/common';
import { IHotelType } from 'app/models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hotel-types',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './hotel-types.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './hotel-types.component.scss',
})
export class HotelTypesComponent implements OnInit {
  hotelTypes: Observable<IHotelType[] | null> = of(null);
  constructor(private hotelTypesFacade: HotelTypesFacade) {}

  ngOnInit(): void {
    this.hotelTypesFacade.loadHotelTypes();
    this.hotelTypes = this.hotelTypesFacade.getHotelTypes();
  }
}
