import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { City, WeatherData } from '../../shared/types/types';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getCurrentWeatherByCity(city: String): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${environment.apiUrl}/forecast.json?q=${city}&days=10&aqi=no&alerts=no`,
    );
  }

  getCurrentWeatherByCoordinates(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${environment.apiUrl}/forecast.json?q=${lat},${lon}&days=10&aqi=no&alerts=no`,
    );
  }

  getCurrentWeatherByCityId(id: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${environment.apiUrl}/forecast.json?q=id:${id}&days=10&aqi=no&alerts=no`,
    );
  }

  getCities(query: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiUrl}/search.json?q=${query}`);
  }
}
