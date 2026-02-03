import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RealTimeWeather } from '../features/forecast/real-time-weather';
import { WeatherService } from '../core/services/weather.service';
import { HourlyForecast, DailyForecast, Wind } from '../shared/types/types';
import { HourlyForecastContainer } from '../shared/components/hourly-forecast-container';
import { DailyForecastContainer } from '../shared/components/daily-forecast-container';
import { AdditionalWeatherInformation } from '../shared/components/additional-weather-information';

@Component({
  selector: 'app-home',
  template: `
    <real-time-weather
      [location]="currentLocation()"
      [temperature]="currentTemperature()"
    ></real-time-weather>
    <hourly-forecast-container [currentHourlyForecast]="filteredHourlyForecast()">
    </hourly-forecast-container>
    <div class="mx-4 mt-4 grid grid-cols-1 sm:mx-6 sm:grid-cols-2 sm:gap-x-3 lg:mx-0">
      <daily-forecast-container
        [dailyForecast]="dailyForecast()"
        class="sm:w-full"
      ></daily-forecast-container>
      <additional-weather-information
        class="sm:w-full"
        [temperature]="feelsLikeTemperature()"
        [uvIndex]="uvIndex()"
        [humidityLevel]="humidityLevel()"
        [wind]="wind()"
        [viewDistance]="viewDistance()"
        [dewpointDegree]="dewpointDegree()"
      >
      </additional-weather-information>
    </div>
  `,
  host: {
    class: 'overflow-y-auto home-max-height lg:min-h-screen lg:p-4 lg:w-full',
  },
  imports: [
    RealTimeWeather,
    HourlyForecastContainer,
    DailyForecastContainer,
    AdditionalWeatherInformation,
  ],
})
export class HomePage implements OnInit {
  private weatherService = inject(WeatherService);
  currentTemperature = signal<number>(0);
  currentLocation = signal<string>('');
  hourlyForecast = signal<HourlyForecast[]>([]);
  dailyForecast = signal<DailyForecast[]>([]);
  feelsLikeTemperature = signal<number>(0);
  uvIndex = signal<number>(0);
  wind = signal<Wind>({
    wind_degree: 0,
    wind_dir: '',
    wind_mph: 0,
    gust_mph: 0,
  });
  viewDistance = signal<number>(0);
  humidityLevel = signal<number>(0);
  dewpointDegree = signal<number>(0);
  filteredHourlyForecast = computed(() => {
    const currentDate = new Date();
    return this.hourlyForecast().filter((hour) => {
      const targetDate = new Date(hour.time);
      return targetDate.getHours() >= currentDate.getHours();
    });
  });

  ngOnInit(): void {
    this.loadCurrentWeather();
  }

  loadCurrentWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.weatherService.getCurrentWeatherByCoordinates(latitude, longitude).subscribe({
            next: (data) => {
              console.log('Current weather data:', data);
              this.currentLocation.set(data.location.name);
              this.currentTemperature.set(Math.ceil(data.current.temp_f));
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
            error: (error) => {
              console.error('Error fetching weather data:', error);
            },
          });
        },
        (error) => {
          console.error('Error getting location', error);
        },
      );
    }
  }
}
