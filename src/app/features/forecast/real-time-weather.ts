import { Component, inject, input, computed } from '@angular/core';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'real-time-weather',
  template: `
    <div class="dark:text-white font-medium flex flex-col space-y-2 items-center mt-8">
      <p class="text-3xl">{{ location() }}</p>
      <p class="text-4xl">{{ temperature() | temperature: temperatureUnit() }}°</p>
    </div>
  `,
  imports: [TemperaturePipe],
})
export class RealTimeWeather {
  private settingsService = inject(SettingsService);
  location = input.required<string>();
  temperature = input.required<number>();
  temperatureUnit = computed(() => this.settingsService.preferredTemperatureUnit);
}
