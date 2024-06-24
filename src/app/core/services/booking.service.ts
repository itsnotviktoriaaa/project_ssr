import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHotelType } from 'app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getHotelTypes(): Observable<{ result: IHotelType[] }> {
    return this.http.get<{ result: IHotelType[] }>(
      'https://booking-com.p.rapidapi.com/v1/static/hotel-types',
      {
        headers: this.authHeaders(),
      }
    );
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-key': '2452a2e43dmsh2a8d8523b9afa67p174d1djsn9597a7befb44',
      'x-rapidapi-host': 'booking-com.p.rapidapi.com',
    });
  }

  // private authParams(startIndex: number): HttpParams {
  //   return new HttpParams().set('maxResults', 40).set('startIndex', startIndex);
  // }
}
