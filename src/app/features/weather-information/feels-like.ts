import { Component, computed, inject, input } from '@angular/core';
import { TempIcon } from '../../assets/icons/temp-icon';
import { SettingsService } from '../../core/services/settings.service';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
  selector: 'feels-like',
  template: `
    <div class="dark:bg-gray-900 bg-white px-3 py-2 rounded-xl h-full">
      <h4 class="dark:text-gray-400 text-slate-700 text-sm font-medium flex items-center gap-x-1">
        <svg temp-icon class="w-4 h-4 "></svg>
        FEELS LIKE
      </h4>
      <p class="mt-2 dark:text-gray-100 text-slate-800 font-medium text-3xl">
        {{ temperature() | temperature: temperatureUnit() }}°
      </p>
    </div>
  `,
  imports: [TempIcon, TemperaturePipe],
})
export class FeelsLike {
  private settingsService = inject(SettingsService);
  temperature = input.required<number>();
  temperatureUnit = computed(() =>
    this.settingsService.userPrefersCelsius ? 'celsius' : 'fahrenheit',
  );
}
