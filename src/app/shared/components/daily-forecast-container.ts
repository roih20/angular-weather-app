import { Component, input } from '@angular/core';
import { DailyForecast } from '../types/types';
import { DailyForecastWeather } from '../../features/forecast/daily-forecast-weather';
import { CalendarIcon } from '../../assets/icons/calendar-icon';

@Component({
  selector: 'daily-forecast-container',
  template: `
    <div class="dark:bg-gray-900 bg-white rounded-xl p-3">
      <h3
        class="text-sm dark:text-gray-400 text-slate-800 font-medium mb-2 flex items-center gap-x-1"
      >
        <svg calendar-icon class="w-4 h-4"></svg>
        10-DAY FORECAST
      </h3>
      @for (dailyForecast of dailyForecast(); track dailyForecast.date) {
        <daily-forecast-weather
          [date]="dailyForecast.date"
          [condition]="dailyForecast.day.condition.text.trim()"
          [minTemp]="dailyForecast.day.mintemp_f"
          [maxTemp]="dailyForecast.day.maxtemp_f"
        ></daily-forecast-weather>
      }
    </div>
  `,
  imports: [DailyForecastWeather, CalendarIcon],
})
export class DailyForecastContainer {
  dailyForecast = input.required<DailyForecast[]>();
}
