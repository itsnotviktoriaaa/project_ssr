import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  afterNextRender,
} from '@angular/core';
import { Map, MapStyle, config, Marker } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() {
    afterNextRender((): void => {
      this.initMap();
    });
  }

  ngOnInit(): void {
    config.apiKey = '1GrbicgvxvPxOFjXt09e';
  }

  initMap(): void {
    const initialState = { lng: 27.5615, lat: 53.9045, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS.DARK,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
    new Marker({ color: '#ffb700' }).setLngLat([27.5615, 53.9045]).addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
