import { Component, computed, input } from '@angular/core';
import { SunIcon } from '../../assets/icons/sun-icon';

@Component({
  selector: 'uv-index',
  template: `
    <div class="dark:bg-gray-900 bg-white px-3 py-2 flex flex-col rounded-xl h-full">
      <h4 class="dark:text-gray-400 text-slate-800 text-sm font-medium flex items-center gap-x-1">
        <svg sun-icon class="w-4 h-4"></svg>
        UV INDEX
      </h4>
      <p class="mt-2 text-3xl flex-1 font-medium dark:text-gray-100 text-slate-700">
        {{ uvIndex() }}
      </p>
      <p class="mt-1 dark:text-gray-200 font-medium text-slate-700 lg:text-lg">
        {{ indexScale() }}
      </p>
    </div>
  `,
  imports: [SunIcon],
})
export class UvIndex {
  uvIndex = input.required<number>();
  indexScale = computed(() => {
    const index = this.uvIndex();
    if (index >= 0 && index <= 2) {
      return 'Low';
    } else if (index > 2 && index <= 5) {
      return 'Moderate';
    } else if (index > 5 && index <= 7) {
      return 'High';
    } else if (index > 7 && index <= 10) {
      return 'Very High';
    } else if (index > 10) {
      return 'Extreme';
    } else {
      return '';
    }
  });
}
