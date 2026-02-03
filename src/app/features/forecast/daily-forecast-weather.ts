import { Component, inject, input, signal, computed } from '@angular/core';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';
import { TemperatureScaleColor } from '../temperature/temperature-scale-color';
import { SettingsService } from '../../core/services/settings.service';
import { WeatherCondition } from './weather-condition';

@Component({
  selector: 'daily-forecast-weather',
  template: `
    <div
      class="dark:text-slate-300 text-slate-700 font-medium flex items-center py-2 border-t dark:border-gray-700 border-gray-300"
    >
      <p class="w-1/2">{{ shortWeekDay() }}</p>
      <div class="w-1/2">
        <weather-condition [condition]="condition()"></weather-condition>
      </div>
      <div class="flex items-center w-full gap-x-3">
        <p class="">{{ temperature(minTemp()) | temperature: temperatureUnit() }}°</p>
        <temperature-scale-color
          class="w-full h-1"
          [minTemp]="temperature(minTemp())"
          [maxTemp]="temperature(maxTemp())"
        ></temperature-scale-color>
        <p>{{ temperature(maxTemp()) | temperature: temperatureUnit() }}°</p>
      </div>
    </div>
  `,
  imports: [TemperaturePipe, TemperatureScaleColor, WeatherCondition],
})
export class DailyForecastWeather {
  private settingsService = inject(SettingsService);
  date = input.required<string>();
  minTemp = input.required<number>();
  maxTemp = input.required<number>();
  condition = input.required<string>();
  temperatureUnit = computed(() => this.settingsService.preferredTemperatureUnit);
  shortWeekDay = computed(() => this.settingsService.shortWeekDay(this.date()));

  temperature(temp: number): number {
    return this.settingsService.ceilTemp(temp);
  }
}
