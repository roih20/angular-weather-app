import { Component, computed, effect, inject, signal } from '@angular/core';
import { SearchBar } from '../shared/components/search-bar';
import { CityWeatherCard } from '../features/city/city-weather-card';
import { CityResultOverlay } from '../features/city/city-result-overlay';
import { City } from '../shared/types/types';
import { WeatherService } from '../core/services/weather.service';
import { debounceTime, filter, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CityService } from '../core/services/city.service';

@Component({
  selector: 'app-explore',
  template: `
    <search-bar (query)="getCity($event)"></search-bar>
    @if (showOverlay()) {
      <city-result-overlay
        [cities]="cities()"
        class="absolute z-10 dark:bg-dark-blue bg-primary-light w-full h-full"
      ></city-result-overlay>
    }
    <div class="overflow-y-auto mt-3 city-weather-max-h">
      @for (savedCity of savedCities; track savedCity) {
        <city-weather-card [cityId]="savedCity"></city-weather-card>
      } @empty {
        <div class="flex flex-col items-center">You haven't saved a city.</div>
      }
    </div>
  `,
  host: {
    class: 'relative lg:min-h-screen lg:w-full',
  },
  imports: [SearchBar, CityWeatherCard, CityResultOverlay],
})
export class ExplorePage {
  private weatherService = inject(WeatherService);
  private cityService = inject(CityService);
  city = signal<string>('');
  cities = signal<City[]>([]);
  showOverlay = computed(() => (this.city() ? true : false));

  constructor() {
    toObservable(this.city)
      .pipe(
        filter(Boolean),
        debounceTime(200),
        switchMap((city) => this.weatherService.getCities(city)),
      )
      .subscribe({
        next: (cities) => {
          this.cities.set(cities);
          console.log(cities);
        },
        error: (error) => console.log(error),
      });
  }

  getCity(query: string): void {
    this.city.set(query);
  }

  get savedCities(): string[] {
    return this.cityService.savedCities;
  }
}
