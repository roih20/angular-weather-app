import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  get preferrerdDistanceUnit(): string {
    return this.userPrefersKilometers ? 'km' : 'mi';
  }

  get preferredTemperatureUnit(): string {
    return this.userPrefersCelsius ? 'celsius' : 'fahrenheit';
  }

  get userPrefersCelsius(): boolean {
    return localStorage.getItem('temperature') === 'celsius';
  }

  get userPrefersKilometers(): boolean {
    return localStorage.getItem('distance') === 'km';
  }

  shortWeekDay(weekDay: string): string {
    return new Date(weekDay + 'T00:00:00').toLocaleDateString([], {
      weekday: 'short',
    });
  }

  hourlyTime(time: string): string {
    return new Date(time).toLocaleTimeString([], {
      hour12: true,
      hour: 'numeric',
    });
  }

  ceilTemp(temp: number): number {
    return Math.ceil(temp);
  }
}
