import { Component, inject, input, computed } from '@angular/core';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';
import { SettingsService } from '../../core/services/settings.service';
import { WeatherCondition } from './weather-condition';

@Component({
  selector: 'hourly-forecast-weather',
  template: `
    <div class="dark:text-slate-300 flex flex-col items-center gap-y-4.5 w-12">
      <p>{{ formattedTime() }}</p>
      <weather-condition [condition]="condition()" [isDay]="isDay()"></weather-condition>
      <p>{{ ceilTemperature() | temperature: temperatureUnit() }}°</p>
    </div>
  `,
  imports: [TemperaturePipe, WeatherCondition],
})
export class HourlyForecastWeather {
  private settingsService = inject(SettingsService);
  time = input.required<string>();
  temperature = input.required<number>();
  condition = input.required<string>();
  isDay = input.required<boolean>();
  temperatureUnit = computed(() => this.settingsService.preferredTemperatureUnit);
  ceilTemperature = computed(() => Math.ceil(this.temperature()));
  formattedTime = computed(() => this.settingsService.hourlyTime(this.time()));
}
