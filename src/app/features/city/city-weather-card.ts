import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { SettingsService } from '../../core/services/settings.service';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'city-weather-card',
  template: `
    <a
      [routerLink]="['/explore', cityId()]"
      class="dark:text-slate-200 dark:bg-gray-900 bg-white block rounded-2xl mx-4 my-4 px-4 py-2.5 sm:mx-6"
    >
      <div class="flex">
        <div class="flex-1">
          <h2 class="font-medium text-xl">{{ city() }}</h2>
          <p class="text-sm mt-0.5">{{ formattedLocalTime() }}</p>
        </div>
        <p class="text-4xl">{{ currentTemperature() | temperature: preferredTemperature() }}°</p>
      </div>
      <div class="flex items-center justify-between mt-6 text-sm">
        <p>{{ weatherCondition() }}</p>
        <p>
          H:{{ maxTemperature() | temperature: preferredTemperature() }}° L:{{
            minTemperature() | temperature: preferredTemperature()
          }}°
        </p>
      </div>
    </a>
  `,
  imports: [TemperaturePipe, RouterLink],
})
export class CityWeatherCard implements OnInit {
  private weatherService = inject(WeatherService);
  private settingService = inject(SettingsService);
  cityId = input.required<string>();
  city = signal<string>('');
  localTime = signal<string>('');
  currentTemperature = signal<number>(0);
  weatherCondition = signal<string>('');
  maxTemperature = signal<number>(0);
  minTemperature = signal<number>(0);
  formattedLocalTime = computed(() => {
    const localTime = new Date(this.localTime());
    return localTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  });
  preferredTemperature = computed(() => this.settingService.preferredTemperatureUnit);

  ngOnInit(): void {
    this.loadCityWeather();
  }

  loadCityWeather(): void {
    this.weatherService.getCurrentWeatherByCityId(this.cityId()).subscribe({
      next: (data) => {
        console.log(data);
        this.city.set(data.location.name);
        this.currentTemperature.set(Math.ceil(data.current.temp_f));
        this.weatherCondition.set(data.current.condition.text);
        this.maxTemperature.set(Math.ceil(data.forecast.forecastday[0].day.maxtemp_f));
        this.minTemperature.set(Math.ceil(data.forecast.forecastday[0].day.mintemp_f));
        this.localTime.set(data.location.localtime);
      },
      error: (error) => console.log(error),
    });
  }
}
