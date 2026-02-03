import { Component, computed, inject, input } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
  selector: 'humidity',
  template: ` <div class="dark:bg-gray-900 bg-white px-3 py-2 rounded-xl h-full flex flex-col">
    <h4 class="dark:text-gray-400 text-slate-700 text-sm font-medium flex items-center gap-x-1">
      HUMIDITY
    </h4>
    <p class="mt-2 dark:text-gray-100 text-slate-800 font-medium text-3xl flex-1">
      {{ humidityLevel() }}%
    </p>
    <p class="mt-4 dark:text-gray-200 text-slate-700 font-medium text-sm">
      The dew point is
      {{ dewpointDegree() | temperature: temperatureUnit() }}° right now.
    </p>
  </div>`,
  imports: [TemperaturePipe],
})
export class Humidity {
  private settingsService = inject(SettingsService);
  humidityLevel = input.required<number>();
  dewpointDegree = input.required<number>();
  temperatureUnit = computed(() => this.settingsService.preferredTemperatureUnit);
}
