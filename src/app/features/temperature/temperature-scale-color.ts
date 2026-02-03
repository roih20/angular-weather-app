import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'temperature-scale-color',
  template: ` <div [class]="colorScale()" class="h-1 bg-linear-to-r rounded-xl"></div> `,
})
export class TemperatureScaleColor {
  minTemp = input.required<number>();
  maxTemp = input.required<number>();
  colorScale = computed(() => {
    const averageTemp = Math.ceil((this.minTemp() + this.maxTemp()) / 2);

    if (averageTemp <= 20) {
      return 'from-blue-700 from-10% via-blue-600 via-50% to-blue-500 to-80%';
    } else if (averageTemp <= 40) {
      return 'from-blue-500 from-10% via-blue-400 via-50% to-sky-500 to-80%';
    } else if (averageTemp <= 50) {
      return 'from-sky-500 from-10% via-cyan-400 via-50% to-sky-400 to-80%';
    } else if (averageTemp <= 60) {
      return 'from-cyan-400 from-10% via-teal-400 via-50% to-emerald-400 to-80%';
    } else if (averageTemp <= 70) {
      return 'from-emerald-500 from-10% via-emerald-400 via-50% to-green-400 to-80%';
    } else if (averageTemp <= 80) {
      return 'from-green-400 from-10% via-lime-500 via-50% to-yellow-400 to-80%';
    } else if (averageTemp <= 90) {
      return 'from-yellow-400 from-10% via-amber-400 via-50% to-amber-500 to-80%';
    } else if (averageTemp <= 100) {
      return 'from-amber-500 from-10% via-orange-500 via-50% to-orange-600 to-80%';
    } else if (averageTemp <= 110) {
      return 'from-orange-600 from-10% via-red-500 via-50% to-red-600 to-80%';
    } else if (averageTemp <= 120) {
      return 'from-red-600 from-10% via-red-700 via-50% to-red-800 to-80%';
    }

    return '';
  });
}
