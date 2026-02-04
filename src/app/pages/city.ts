import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../core/services/weather.service';
import { RealTimeWeather } from '../features/forecast/real-time-weather';
import { HourlyForecastContainer } from '../shared/components/hourly-forecast-container';
import { DailyForecast, HourlyForecast, Wind } from '../shared/types/types';
import { DailyForecastContainer } from '../shared/components/daily-forecast-container';
import { AdditionalWeatherInformation } from '../shared/components/additional-weather-information';
import { CityService } from '../core/services/city.service';
import { AddIcon } from '../assets/icons/add-icon';

@Component({
  selector: 'app-city',
  template: `
    @if (showAddButton()) {
      <div class="flex items-center mx-4 mt-6 flex-row-reverse lg:m-0">
        <button
          type="button"
          class="dark:bg-gray-800 p-3 bg-white rounded-full cursor-pointer hover:bg-gray-900"
          (click)="saveCity()"
        >
          <svg add-icon class="h-6 w-6 dark:text-slate-200"></svg>
        </button>
      </div>
    }
    <real-time-weather [location]="location()" [temperature]="temperature()"> </real-time-weather>
    <hourly-forecast-container [currentHourlyForecast]="filteredHourlyForecast()">
    </hourly-forecast-container>
    <div class="mx-4 mt-4 grid grid-cols-1 sm:mx-6 sm:grid-cols-2 sm:gap-x-3 lg:mx-0">
      <daily-forecast-container [dailyForecast]="dailyForecast()"> </daily-forecast-container>
      <additional-weather-information
        [temperature]="feelsLikeTemperature()"
        [uvIndex]="uvIndex()"
        [viewDistance]="viewDistance()"
        [humidityLevel]="humidityLevel()"
        [dewpointDegree]="dewpointDegree()"
        [wind]="wind()"
      >
      </additional-weather-information>
    </div>
  `,
  host: {
    class: 'overflow-y-auto h-140  lg:min-h-screen lg:p-4 lg:w-full',
  },
  imports: [
    RealTimeWeather,
    HourlyForecastContainer,
    DailyForecastContainer,
    AdditionalWeatherInformation,
    AddIcon,
  ],
})
export class CityWeather implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);
  private cityService = inject(CityService);
  private router = inject(Router);
  cityId = signal<string>('');
  location = signal<string>('');
  temperature = signal<number>(0);
  hourlyForecast = signal<HourlyForecast[]>([]);
  dailyForecast = signal<DailyForecast[]>([]);
  feelsLikeTemperature = signal<number>(0);
  uvIndex = signal<number>(0);
  viewDistance = signal<number>(0);
  humidityLevel = signal<number>(0);
  dewpointDegree = signal<number>(0);
  wind = signal<Wind>({
    wind_degree: 0,
    wind_dir: '',
    wind_mph: 0,
    gust_mph: 0,
  });
  filteredHourlyForecast = computed(() => {
    const currentDate = new Date();
    return this.hourlyForecast().filter((hour) => {
      const targetDate = new Date(hour.time);
      return targetDate.getHours() >= currentDate.getHours();
    });
  });
  showAddButton = computed(() => !this.cityService.savedCities.includes(this.cityId()));

  constructor() {
    this.activatedRoute.params.subscribe((param) => this.cityId.set(param['id']));
  }

  ngOnInit(): void {
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    this.weatherService.getCurrentWeatherByCityId(this.cityId()).subscribe({
      next: (data) => {
        console.log(data);
        this.location.set(data.location.name);
        this.temperature.set(Math.ceil(data.current.temp_f));
        this.hourlyForecast.set(data.forecast.forecastday[0].hour);
        this.dailyForecast.set(data.forecast.forecastday);
        this.feelsLikeTemperature.set(Math.ceil(data.current.feelslike_f));
        this.uvIndex.set(Math.ceil(data.current.uv));
        this.viewDistance.set(Math.ceil(data.current.vis_miles));
        this.humidityLevel.set(Math.ceil(data.current.humidity));
        this.dewpointDegree.set(Math.ceil(data.current.dewpoint_f));
        this.wind.set({
          wind_degree: Math.ceil(data.current.wind_degree),
          wind_dir: data.current.wind_dir,
          wind_mph: Math.ceil(data.current.wind_mph),
          gust_mph: Math.ceil(data.current.gust_mph),
        });
      },
      error: (error) => console.error(error),
    });
  }

  saveCity(): void {
    this.cityService.saveCity(this.cityId());
    this.router.navigate(['/explore']);
  }
}
