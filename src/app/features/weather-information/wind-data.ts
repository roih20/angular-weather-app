import { Component, input, computed } from '@angular/core';
import { WindIcon } from '../../assets/icons/wind-icon';

interface Wind {
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  gust_mph: number;
}

@Component({
  selector: 'wind-data',
  template: `
    <div class="dark:bg-gray-900 bg-white px-3 py-2 rounded-xl h-full">
      <h4 class="dark:text-gray-400 text-slate-800 text-sm flex items-center font-medium gap-x-1">
        <svg wind-icon class="w-6 h-6"></svg>
        WIND
      </h4>
      <p class="dark:text-gray-100 font-medium text-slate-700 mt-3 flex">
        <span class="flex-1 w-full">Wind</span>
        <span class="font-light"> {{ windInfo().wind_mph }} mph</span>
      </p>
      <hr class="my-2 dark:border-gray-700 border-gray-300" />
      <p class="dark:text-gray-100 font-medium text-slate-700 mt-3 flex">
        <span class="flex-1 w-full">Gust</span>
        <span class="font-light">{{ windInfo().gust_mph }} mph</span>
      </p>
      <hr class="my-2 dark:border-gray-700 border-gray-300" />
      <p class="dark:text-gray-100 font-medium text-slate-700 mt-3 flex">
        <span class="w-full flex-1"> Direction</span>
        <span class="font-light">{{ windDirection() }}</span>
      </p>
    </div>
  `,
  imports: [WindIcon],
})
export class WindData {
  windInfo = input.required<Wind>();
  windDirection = computed(() => `${this.windInfo().wind_degree}° ${this.windInfo().wind_dir}`);
}
