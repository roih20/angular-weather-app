import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  get savedCities(): string[] {
    return JSON.parse(localStorage.getItem('cities') ?? '[]');
  }

  saveCity(cityId: string): void {
    const savedCities = this.savedCities;
    const isCityAlreadySaved = savedCities.includes(cityId);
    if (!isCityAlreadySaved) {
      const updatedSavedCities = [...savedCities, cityId];
      localStorage.setItem('cities', JSON.stringify(updatedSavedCities));
    }
  }
}
