import { Component, input } from '@angular/core';
import { HourlyForecastWeather } from '../../features/forecast/hourly-forecast-weather';
import { HourlyForecast } from '../types/types';
import { ClockIcon } from '../../assets/icons/clock-icon';

@Component({
  selector: 'hourly-forecast-container',
  template: `
    <div class="dark:bg-gray-900 bg-white mx-4 mt-12 rounded-xl p-3 sm:mx-6 lg:mx-0">
      <h3
        class="dark:text-gray-400 text-slate-800 font-medium mb-2 text-sm flex items-center gap-x-1"
      >
        <svg clock-icon class="w-4 h-4"></svg>
        HOURLY FORECAST
      </h3>
      <div class="flex flex-row flex-nowrap items-center gap-x-2  w-full overflow-x-auto">
        @for (forecast of currentHourlyForecast(); track forecast.time) {
          <hourly-forecast-weather
            [time]="forecast.time"
            [temperature]="forecast.temp_f"
            [condition]="forecast.condition.text.trim()"
            [isDay]="forecast.is_day"
          ></hourly-forecast-weather>
        }
      </div>
    </div>
  `,
  imports: [HourlyForecastWeather, ClockIcon],
})
export class HourlyForecastContainer {
  currentHourlyForecast = input.required<HourlyForecast[]>();
}
